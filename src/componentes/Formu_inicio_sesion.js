import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import '../componentes/css/Formu_inicio_sesion.css'
import img from "../img/usuario.png"

const Formu_inicio_sesion = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:8000/api/olympics/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Autenticación exitosa', data);
  
          // Opcional: guardar token en localStorage
          // localStorage.setItem('token', data.token);
  
          navigate('/olympics/events/list'); // Cambia esta ruta a la que tú quieras mostrar después del login
        } else {
          setError('Usuario o contraseña incorrectos');
        }
      } catch (err) {
        setError('Error al conectar con el servidor');
      }
    }


    return(
        <div className="contenedor_general_FIS">
            <div className="caja_formu_FIS">
                <div className="caja_titulo_FIS">
                    <img className="img_FIS" src={img} alt=""/>
                    <p className="titulo_FIS">Login</p>
                </div>

                <form className="formulario_FIS" onSubmit={ handleLogin}>
                    <label className="label_FIS">Username:</label>
                    <input className="input_FIS" placeholder="username" type="text" required value={username} onChange={(e)=>setUsername(e.target.value)}/>

                    <label className="label_FIS">Password:</label>
                    <input className="input_FIS" placeholder="password" type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>

                    <button className="btn_FIS" type="submit">Login</button>
                </form>
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </div>
        </div>
    )

}

export default Formu_inicio_sesion