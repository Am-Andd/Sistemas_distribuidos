import {FaUser, FaLock} from 'react-icons/fa'

import { useState } from "react";

import "./Login.css"

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                throw new Error("Login bem-sucedido!");
            }

            const data = await response.json();
            console.log("Login bem sucedido:", data);

            localStorage.setItem("token", data.token);

        } catch (error) {
            console.error("Erro no login:", error);
            alert("Usuário ou senha inválidos. Tente novamente.");
        }
    }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className='input-field'>
            <input type="email" placeholder="E-mail" onChange={(e) => setUsername(e.target.value)} />
            <FaUser className='icon' />
        </div>
        <div className='input-field'>
            <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
            <FaLock className='icon' />
        </div>

        <div className='recall-forget'>
            <a href="#">Esqueceu a senha?</a>
        </div>

        <button>Entrar</button>

      </form>
    </div>
  )
}

export default Login
