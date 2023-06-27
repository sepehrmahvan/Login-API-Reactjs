import React, { useState } from "react";
import "./app.scss";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState("type your username and password");
  const [noticeColor, setNoticeColor] = useState('black');

  const clickHandle = (e) => {

    e.preventDefault();
    const loginReqBody = {
      username,
      password, 
      expiresIn: 60000,
    };

    const loginReqOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginReqBody),
    };

    fetch("https://www.melivecode.com/api/login", loginReqOptions)
    .then(
      (res) => {
        if (res.status === 200) {
          setIsLogin("successful login");
          setNoticeColor("green")
        }else if(res.status === 401){
            setIsLogin("wrong username or password");
            setNoticeColor("red")
        }else{
            setIsLogin('unknown error')
            setNoticeColor("red")
        }
      }
    ).catch((error) => {
        setIsLogin('bad request')
    })
  };
  return (
    <form onSubmit={clickHandle}>
      <h1>Sign In</h1>
      <p style={{color: noticeColor}} >{isLogin}</p>
      <input
        name={"username"}
        type={"text"}
        value={username}
        placeholder={"username"}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        name={"password"}
        type={"password"}
        value={password}
        placeholder={"password"}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="sign-in" onClick={clickHandle}>
        Sign In
      </button>
      <button className="need-account">Need an Account?</button>
      <button className="forgot-pass">Forgot Password</button>
    </form>
  );
}
