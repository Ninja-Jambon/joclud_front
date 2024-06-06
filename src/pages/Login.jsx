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

    const response = await axios.post("https://leizour.fr/api/v1/auth/login", { username: username, password: password})
      .catch((error) => {
        if (error.response.data.error == "you need to be verified to login") {
          alert("Vous devez être vérifié pour vous connecter, veuillez attendre qu'un administrateur vérifie votre compte.");
        } else {
          alert("Nom d'utilisateur ou mot de passe incorrect.");
        }
      });

    localStorage.setItem("token", response.data.token);
    navigate("/");
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
