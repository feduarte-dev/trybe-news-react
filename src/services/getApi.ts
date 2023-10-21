// Return model can be checked in src/types.ts
export const getApi = async (URL: string) => {
  const data = await fetch(URL);
  const response = await data.json();
  return response.items;
};
