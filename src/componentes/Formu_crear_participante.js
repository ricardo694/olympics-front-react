import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import img1 from "../img/logo_1.png"
import img2 from "../img/logo_2.png"
import img3 from "../img/flecha.png"

const Formu_crear_participante = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [eventId, setEventId] = useState('');
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Obtener eventos desde la API
    useEffect(() => {
        fetch('http://localhost:8000/api/olympics/events/list')
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.error('Error cargando eventos', err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { fullname, email, phone, event_id: eventId };

        try {
            const response = await fetch('http://localhost:8000/api/olympics/participants/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                navigate('/olympics/events/list');
            } else {
                setError('Error al registrar participante');
            }
        } catch (error) {
            setError('No se pudo conectar con el servidor');
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

    return(
        <div className="contenedor_general_CE">

            <div className="caja_CE">
                {/* Encabezado 1 */}
                <div className="encabezado_1_CE">
                    <div className="caja_1_1_CE">
                        <img className="img_1_CE" src={img1} alt=""/>
                        <p className="titulo_1_CE">Admin Panel</p>
                    </div>

                    <div className="caja_1_2_CE" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                        <img className="img_CE" src={img2} alt="" />
                        <p className="titulo_2_CE">Close Session</p>
                    </div>
                </div>

                {/* Encabezado 2 */}
                <div className="encabezado_2_CE">
                    <p className="titulo_3_CE">Add Participant</p>

                    <div className="subcaja_1_CE">
                        <Link to="/olympics/events/list">
                            <div className="caja_1_2_CE">
                                <img className="img_CE" src={img3} alt=""/>
                                <p className="titulo_2_CE">Back to</p>
                            </div> 
                        </Link>
                    </div>
                </div> 


                {/* Formulario */}

                <div className="caja_formulario_FCE">
                    <form className="formulario_FCE"  onSubmit={handleSubmit}>
                        <label className="label_FCE">FullName:</label>
                        <input className="input_FCE" placeholder="fullname" type="text" value={fullname} onChange={e => setFullname(e.target.value)} required/>

                        <label className="label_FCE">Email:</label>
                        <input className="input_FCE" placeholder="email" type="text" value={email} onChange={e => setEmail(e.target.value)} required/>

                        <label className="label_FCE">Phone:</label>
                        <input className="input_FCE" placeholder="phone" type="number" value={phone} onChange={e => setPhone(e.target.value)} required/>

                        <label className="label_FCE">Event:</label>
                        <select className="input_FCE" value={eventId} onChange={e => setEventId(e.target.value)} required>
                        <option value="">Select...</option>
                            {events.map(event => (
                                <option key={event.id} value={event.id}>
                                    {event.name} ({event.date})
                                </option>
                            ))}
                        </select>

                        <button className="btn_FCE" type="submit">Add</button>
                        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Formu_crear_participante