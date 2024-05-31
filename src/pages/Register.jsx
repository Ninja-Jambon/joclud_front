import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

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
        const response = await axios.post("http://localhost:3000/api/v1/auth/register", {
            username: username,
            name: name,
            lastname: lastname,
            password: password
        })

        const loginResponse = await axios.post("http://localhost:3000/api/v1/auth/login", {
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
        <div>
          <h1>Create an account</h1>
          <div>
            <div>
              Usename : <input type="text" id="username"/>
            </div>
            <div>
              Name : <input type="text" id="name"/>
            </div>
            <div>
              Last name : <input type="text" id="lastname"/>
            </div>
            <div>
              Password : <input type="password" id="password"/>
            </div>
            <div>
              <button onClick={register}>Create an account</button>
            </div>
          </div>
          <Link to="/login">Login with my account</Link>
        </div>
    )
}