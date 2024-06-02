import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

import './Login.css';

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
      const response = await axios.post("http://leizour.fr:3000/api/v1/auth/login", {
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
    <div className='login'>
      <h1>Connexion</h1>
      <input type="text" id="username" className='input' placeholder="Nom d'utilisateur"/>
      <input type="password" id="password" className='input' placeholder='Mot de passe'/>
      <button onClick={login} className='button'>Me connecter</button>
      <Link to="/register">Créer un compte</Link>
    </div>
  )
}
