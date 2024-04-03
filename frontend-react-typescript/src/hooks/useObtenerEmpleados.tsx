import { useState, useEffect } from "react";
import axios from "axios";
import { Empleado } from "../components/interfaces";

const useObtenerEmpleados = (URL_API: string) => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerEmpleados = async () => {
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

    obtenerEmpleados();
  }, [URL_API]);

  return { empleados, setEmpleados, loading };
};

export default useObtenerEmpleados;
