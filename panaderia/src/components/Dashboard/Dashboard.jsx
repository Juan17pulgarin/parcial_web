import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom'; 

function Dashboard() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      axios
        .get('http://89.116.25.43:3500/api/productos/listar', { headers })
        .then((response) => {
          console.log('Respuesta de la API:', response.data);

          if (Array.isArray(response.data.result)) {
            setProductos(response.data.result);
          } else {
            console.error('La propiedad result de la respuesta de la API no es un arreglo:', response.data.result);
          }
        })
        .catch((error) => {
          console.error('Error al obtener los productos:', error);
        });
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>Categorías</li>
          <li>Ofertas</li>
          <li>Historial</li>
          <li>Comprar</li>
          <li>
            <input type="text" placeholder="Buscar..." />
          </li>
          <li>
            <button onClick={cerrarSesion}>Cerrar sesión</button>
          </li>
        </ul>
      </nav>
      <div className="cards-container">
        {productos.map((producto, index) => (
          <div key={index} className="card">
            <img src={producto.imagen} alt={producto.descripcion} />
            <h2>{producto.descripcion}</h2>
            <p>Precio: $ {producto.valor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
