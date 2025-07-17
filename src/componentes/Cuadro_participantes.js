import React, { useEffect, useState } from "react";
import { useParams,  Link } from "react-router-dom";
import img1 from "../img/logo_1.png";
import img2 from "../img/logo_2.png";
import img3 from "../img/flecha.png";
import img4 from "../img/eliminar.png";
import {useNavigate } from "react-router-dom";

const Cuadro_participantes = () => {
    const { eventId } = useParams();
    const navigate = useNavigate(); // ID del evento desde la URL
    // const navigate = useNavigate();

    const [participants, setParticipants] = useState([]);
    const [eventName, setEventName] = useState('');
    const [error, setError] = useState('');

    const backRoute = "/olympics/events/list";

    // Cargar participantes del evento
    useEffect(() => {
        fetch(`http://localhost:8000/api/olympics/participants/list/${eventId}`)
            .then(res => {
                if (!res.ok) throw new Error("No se pudo obtener participantes");
                return res.json();
            })
            .then(data => setParticipants(data))
            .catch(err => setError("Error al obtener participantes"));
    }, [eventId]);

    // Obtener nombre del evento (opcional)
    useEffect(() => {
        fetch("http://localhost:8000/api/olympics/events/list")
            .then(res => res.json())
            .then(events => {
                const event = events.find(e => e.id === parseInt(eventId));
                if (event) setEventName(event.name);
            });
    }, [eventId]);

    // Eliminar participante
    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar este participante?")) return;

        try {
            const res = await fetch(`http://localhost:8000/api/olympics/participants/delete/${id}`, {
                method: 'DELETE'
            });

            if (res.status === 204) {
                setParticipants(prev => prev.filter(p => p.id !== id));
            } else {
                alert("No se pudo eliminar");
            }
        } catch (err) {
            alert("Error al eliminar participante");
        }
    };
    

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

    return (
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
                    <p className="titulo_3_CE">Participant List - {eventName}</p>
                    <div className="subcaja_1_CE">
                        <Link to={backRoute}>
                            <div className="caja_1_2_CE">
                                <img className="img_CE" src={img3} alt="" />
                                <p className="titulo_2_CE">Back to</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Tabla */}
                <div className="lista_eventos_CE">
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <table>
                        <thead>
                            <tr>
                                <th className="campos">Id</th>
                                <th className="campos">FullName</th>
                                <th className="campos">Email</th>
                                <th className="campos">Phone</th>
                                <th className="campos">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participants.map(p => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.fullname}</td>
                                    <td>{p.email}</td>
                                    <td>{p.phone}</td>
                                    <td>
                                        <div className="centrar" onClick={() => handleDelete(p.id)}>
                                            <div className="caja_3_1_CE" style={{ cursor: 'pointer' }}>
                                                <img className="img_CE" src={img4} alt="" />
                                                <p className="titulo_2_CE">Delete</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {participants.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>No participants found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cuadro_participantes;