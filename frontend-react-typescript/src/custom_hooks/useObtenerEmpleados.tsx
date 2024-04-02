import { useState, useEffect } from "react";
import axios from "axios";

const useObtenerEmpleados = (URL_API: string) => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerAmigos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(URL_API);
        setEmpleados(response.data);
      } catch (error) {
        console.log("Error al obtener los empleados:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerAmigos();
  }, [URL_API]);

  return { empleados, setEmpleados, loading };
};

export default useObtenerEmpleados;
