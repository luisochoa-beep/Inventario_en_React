const API_URL = "https://inventario-en-react.onrender.com/api";

export const fetchData = async (endpoint, options = {}) => {
  const response = await fetch(${API_URL}${endpoint}, {
    method: options.method || 'GET',
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok || json.error) {
    throw new Error(json.error || "Error en la peticion");
  }

  // Las APIs devuelven { success, data, ... }; devolvemos solo data si existe.
  return typeof json.data !== "undefined" ? json.data : json;
};