import React, { useState } from 'react'
import Navigator from './Navigator';
import { Navigate, Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div>
        <h1>Elmeri</h1>
        <p>Turvallisuushavainnot</p>
        <p>Login</p>
      </div>
      <div>
        <p>Username</p>
        <input
          type="text"
          className=""
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Username"
        />
        <p>Password</p>
        <input
          type="text"
          className=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
    </div>
  )
}

export default Login