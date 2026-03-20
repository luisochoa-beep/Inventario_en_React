const API_URL = "https://inventario-en-react.onrender.com/api";

export const fetchData = async (endpoint, options = {}) => {
const response = await fetch(`${API_URL}${endpoint}`, {
headers: {
"Content-Type": "application/json",
},...options,});

if (!response.ok) throw new Error("Error en la petición");
return response.json();
};