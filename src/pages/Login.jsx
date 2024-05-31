import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {

    if (localStorage.getItem("token")) {
      navigate("/")
    }
  }, []);

  async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/auth/login", {
        username: username,
        password: password
      })

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      alert("Invalid username or password");
      return;
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <div>
        <div>
          Usename : <input type="text" id="username"/>
        </div>
        <div>
          Password : <input type="password" id="password"/>
        </div>
        <div>
          <button onClick={login}>Login</button>
        </div>
      </div>
      <Link to="/register">Create an account</Link>
    </div>
  )
}
