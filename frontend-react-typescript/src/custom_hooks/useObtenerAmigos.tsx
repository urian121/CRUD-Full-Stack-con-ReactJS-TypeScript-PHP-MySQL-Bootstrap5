import { useState, useEffect } from "react";
import axios from "axios";

const useObtenerAmigos = (URL_API) => {
  const [amigos, setAmigos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerAmigos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(URL_API);
        setAmigos(response.data);
      } catch (error) {
        console.log("Error al obtener amigos:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerAmigos();
  }, [URL_API]);

  return { amigos, setAmigos, loading };
};

export default useObtenerAmigos;
