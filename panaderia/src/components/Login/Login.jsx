import React, { useState, useEffect } from 'react';
import './Login.css'; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import panaderoImagen from '../img/panadero.png'

function Login() {
  const MySwal = withReactContent(Swal);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('login-body');

    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);

  const handleUsernameChange = (e) => {
    setUsuario(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuario:', usuario);
    console.log('Contraseña:', password);
  };

  const inicioSesion = async (e) => {
    e.preventDefault();
    console.log("Usuario:", usuario);
    console.log("Password:", password);

    const data = {
      usuario: usuario,
      password: password,
    };

    await axios
      .post("http://89.116.25.43:3500/api/login", data)
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("token", resp.data.jwt);
        localStorage.setItem("user", resp.data.user);
        localStorage.setItem("username", resp.data.user.usuario);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 400 || err.response.status == 404) {
          Swal.fire("Información!", err.response.data.message, "error");
        } else {
          Swal.fire("Información!", "Ocurrió un error!", "error");
        }
      });
  };

  return (
    <div className="login-container">
      <div className="panadero-image">
        <img src={panaderoImagen} alt="Panadero" />
      </div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={usuario}
            onChange={handleUsernameChange}
            required
          />
          <label>Usuario</label>
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <label>Contraseña</label>
        </div>
        <button onClick={inicioSesion} type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Login;
