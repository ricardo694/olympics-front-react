import { createRoot } from "react-dom/client";
import App from "./paginas/App";

const contenedor = document.getElementById('root')
const root = createRoot(contenedor)
root.render(<App/>)
