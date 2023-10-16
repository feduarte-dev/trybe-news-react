function useFetch() {
  const getApi = async (URL: string) => {
    const data = await fetch(URL);
    const response = await data.json();
    return response.items;
  };

  return {
    getApi,
  };
}

export default useFetch;
