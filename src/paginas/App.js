import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../paginas/Login";
import Gestion_eventos from "./Gestion_eventos";
import Crear_evento from "./Crear_evento";
import Crear_participante from "./Crear_participante";
import Editar_evento from "./Editar_evento";
import Lista_participantes from "../paginas/Lista_participantes";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/olympics/login" element={<Login/>}/>
                <Route path="/olympics/events/list" element={<Gestion_eventos/>}/>
                <Route path="/olympics/events/create" element={<Crear_evento/>}/>
                <Route path="/olympics/participants/create" element={<Crear_participante/>}/>
                <Route path="/olympics/events/edit/:id" element={<Editar_evento/>}/>
                <Route path="/olympics/participants/list/:eventId" element={<Lista_participantes/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
