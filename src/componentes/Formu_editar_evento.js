import React, { useState, useEffect } from "react";
import { useParams, useNavigate,Link } from "react-router-dom";
import img1 from "../img/logo_1.png"
import img2 from "../img/logo_2.png"
import img3 from "../img/flecha.png"

const Formu_editar_evento = () => {
    const { id } = useParams(); // El id del evento desde la URL
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [venueId, setVenueId] = useState('');
    const [venues, setVenues] = useState([]);
    const [error, setError] = useState('');

    // Cargar datos del evento actual
    useEffect(() => {
        fetch(`http://localhost:8000/api/olympics/events/list`)
            .then(res => res.json())
            .then(data => {
                const evento = data.find(e => e.id === parseInt(id));
                if (evento) {
                    setName(evento.name);
                    setDate(evento.date);
                    setVenueId(evento.venue_id);
                } else {
                    setError("Evento no encontrado.");
                }
            });
    }, [id]);

    // Cargar sedes disponibles
    useEffect(() => {
        fetch(`http://localhost:8000/api/venues`)
            .then(res => res.json())
            .then(data => setVenues(data))
            .catch(() => setVenues([]));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/api/olympics/events/edit/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, date, venue_id: venueId }),
            });

            if (response.ok) {
                navigate('/olympics/events/list');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Error al actualizar el evento');
            }
        } catch {
            setError('Error de conexión con el servidor');
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
                    <p className="titulo_3_CE">Edit Event</p>

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
                    <form className="formulario_FCE" onSubmit={handleSubmit}>
                        <label className="label_FCE">Name:</label>
                        <input className="input_FCE" placeholder="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required/>

                        <label className="label_FCE">Date:</label>
                        <input className="input_FCE" type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>

                        <label className="label_FCE">Venue:</label>
                        <select className="input_FCE"  value={venueId} onChange={(e) => setVenueId(e.target.value)} required>
                        <option value="">Select...</option>
                            {venues.map(venue => (
                                <option key={venue.id} value={venue.id}>
                                    {venue.name}
                                </option>
                            ))}
                        </select>

                        <button className="btn_FCE" type="submit">Add</button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </div>
        </div>
    )

}

export default Formu_editar_evento