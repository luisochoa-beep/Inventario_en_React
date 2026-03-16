import { fetchData } from "./api";

export const login = async (username, password) => {
return await fetchData("/usuarios/login", {
  method: "POST",
  body: JSON.stringify({ username, password }),
});
};