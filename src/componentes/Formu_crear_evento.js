import React , { useEffect, useState }from "react";
import { Link,useNavigate } from "react-router-dom";
import '../componentes/css/Formu_crear_evento.css'
import img1 from "../img/logo_1.png"
import img2 from "../img/logo_2.png"
import img3 from "../img/flecha.png"


const Formu_crear_evento = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [venueId, setVenueId] = useState('');
    const [venues, setVenues] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Traer las sedes al cargar el componente
    useEffect(() => {
        fetch('http://localhost:8000/api/venues')
            .then(res => res.json())
            .then(data => setVenues(data))
            .catch(() => setError('Error al cargar las sedes'));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/olympics/events/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, date, venue_id: venueId })
            });

            if (response.status === 201 || response.ok) {
                navigate('/olympics/events/list');
            } else {
                setError('Error al registrar el evento');
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
                    <p className="titulo_3_CE">Add Event</p>

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
                        <input className="input_FCE" placeholder="name" type="text"  value={name} onChange={e => setName(e.target.value)} required/>

                        <label className="label_FCE">Date:</label>
                        <input className="input_FCE" type="date" value={date} onChange={e => setDate(e.target.value)} required/>

                        <label className="label_FCE">Venue:</label>
                        <select className="input_FCE" value={venueId} onChange={e => setVenueId(e.target.value)} required>
                            <option value="">Select...</option>
                            {venues.map(venue => (
                                <option key={venue.id} value={venue.id}>{venue.name}</option>
                            ))}
                        </select>

                        <button className="btn_FCE" type="submit">Add</button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                </div>


            </div>
        </div>
    )

}

export default Formu_crear_evento