import { User, UserWithoutId } from "@/interfaces/user";

const BASE_URL = process.env.API_URL;

//para actualizar solo los tags apenas se registra
export async function patchUserService(id: string, userData: UserWithoutId) {
  const url = BASE_URL + "/user/" + id;

  console.log(url);
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...userData }),
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`Error en la respuesta: ${response.status}`);
  }

  if (response.headers.get("Content-Type")?.includes("application/json")) {
    const responseData = await response.json();
    return responseData;
  } else {
    throw new Error("La respuesta no es un JSON válido.");
  }
}

//para editar los datos del perfil con la mayoria de los datos
export async function updateUserService(user: UserWithoutId, id: string) {
  const url = BASE_URL + "/user/" + id;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
  }
}
