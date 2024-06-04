import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

import './Register.css';

export default function Register() {
    const navigate = useNavigate();

    useEffect(() => {
      if (localStorage.getItem("token")) {
        navigate("/")
      }
    }, []);
  
    async function register() {
      const username = document.getElementById("username").value;
      const name = document.getElementById("name").value;
      const lastname = document.getElementById("lastname").value;
      const password = document.getElementById("password").value;
  
      if (!username || !name || !lastname || !password) {
        return;
      }
  
      try {
        const response = await axios.post("https://leizour.fr:3000/api/v1/auth/register", {
            username: username,
            name: name,
            lastname: lastname,
            password: password
        })

        const loginResponse = await axios.post("https://leizour.fr:3000/api/v1/auth/login", {
            username: username,
            password: password
        })
  
        localStorage.setItem("token", loginResponse.data.token);
        navigate("/");
      } catch (error) {
        alert("Username already exists");
        return;
      }
    }

    return (
        <div className='register'>
          <h1>Création de compte</h1>
            <input type="text" id="username" placeholder="Nom d'utilisateur" className='input'/>
            <input type="text" id="name" placeholder='Prénom' className='input'/>
            <input type="text" id="lastname" placeholder='Nom de famille' className='input'/>
            <input type="password" id="password" placeholder='Mot de passe' className='input'/>
          <div>
            <button onClick={register} className='button'>Créer un compte</button>
          </div>
          <Link to="/login">Me connecter avec mon compte</Link>
        </div>
    )
}