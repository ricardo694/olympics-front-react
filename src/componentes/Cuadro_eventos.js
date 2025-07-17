import React ,{ useEffect, useState } from "react";
import '../componentes/css/Cuadro_eventos.css'
import img1 from "../img/logo_1.png"
import img2 from "../img/logo_2.png"
import img3 from "../img/mas.png"
import img4 from "../img/editar.png"
import img5 from "../img/pareja.png"
import {Link, useNavigate } from "react-router-dom";

const Cuadro_eventos = () => {
    const [eventos, setEventos] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      fetch("http://localhost:8000/api/olympics/events/list")
        .then(res => res.json())
        .then(data => {
          const ordenados = data.sort((a, b) => new Date(a.date) - new Date(b.date));
          setEventos(ordenados);
        })
        .catch(err => console.error("Error al cargar eventos:", err));
    }, []);
  
    const handleLogout = async () => {
      try {
        await fetch('http://localhost:8000/api/olympics/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        navigate('/olympics/login');
      } catch (err) {
        console.error('Error cerrando sesión', err);
      }
    };
    return(
        <div className="contenedor_general_CE">

            <div className="caja_CE">
                {/* Encabezado 1 */}
                <div className="encabezado_1_CE">
                    <div className="caja_1_1_CE">
                        <img className="img_1_CE" src={img1} alt="" />
                        <p className="titulo_1_CE">Admin Panel</p>
                    </div>

                    <div className="caja_1_2_CE" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                        <img className="img_CE" src={img2} alt="" />
                        <p className="titulo_2_CE">Close Session</p>
                    </div>
                </div>

                {/* Encabezado 2 */}
                <div className="encabezado_2_CE">
                    <p className="titulo_3_CE">Events List</p>

                    <div className="subcaja_1_CE">
                        <Link to="/olympics/participants/create">
                            <div className="caja_1_2_CE">
                                <img className="img_CE" src={img3} alt=""/>
                                <p className="titulo_2_CE">Participant</p>
                            </div>
                        </Link>

                        <Link to="/olympics/events/create">
                            <div className="caja_1_2_CE">
                                <img className="img_CE" src={img3} alt=""/>
                                <p className="titulo_2_CE">Event</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Eventos */}

                <div className="lista_eventos_CE">
                    <table>
                        <thead>
                            <tr>
                                <th className="campos">Id</th>
                                <th className="campos">Name</th>
                                <th className="campos">Date</th>
                                <th className="campos">Venue</th>
                                <th className="campos">Edit</th>
                                <th className="campos">Participants</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventos.map(evento =>(
                            <tr key={evento.id}>
                                <td>{evento.id}</td>
                                <td>{evento.name}</td>
                                <td>{evento.date}</td>
                                <td>{evento.venue?.name || 'N/A'}</td>
                                <td>
                                    <div className="centrar">
                                        <Link to={`/olympics/events/edit/${evento.id}`} >
                                            <div className="caja_2_1_CE">
                                                <img className="img_CE" src={img4} alt=""/>
                                                <p className="titulo_2_CE">Edit</p>
                                            </div>
                                        </Link>
                                    </div>
                                </td>
                                <th>
                                    <div className="centrar">
                                        <Link to={`/olympics/participants/list/${evento.id}`}>
                                            <div className="caja_3_1_CE">
                                                <img className="img_CE" src={img5} alt=""/>
                                                <p className="titulo_2_CE">Participants</p>
                                            </div>
                                        </Link>
                                    </div>
                                </th>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    )

}

export default Cuadro_eventos