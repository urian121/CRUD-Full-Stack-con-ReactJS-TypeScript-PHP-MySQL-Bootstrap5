import { useRef } from "react";
import axios from "axios";
import { toast } from "../toastUtils";
import { Empleado } from "../components/interfaces";

const useGestionarFormulario = (
  URL_API: string,
  empleados: Empleado[],
  setEmpleados: React.Dispatch<React.SetStateAction<Empleado[]>>
) => {
  const nombreRef = useRef<HTMLInputElement>(null);
  const cedulaRef = useRef<HTMLInputElement>(null);
  const edadRef = useRef<HTMLSelectElement>(null);
  const sexoRef = useRef<HTMLInputElement>(null);
  const telefonoRef = useRef<HTMLInputElement>(null);
  const cargoRef = useRef<HTMLSelectElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !nombreRef.current ||
      !cedulaRef.current ||
      !edadRef.current ||
      !sexoRef.current ||
      !telefonoRef.current ||
      !cargoRef.current ||
      !avatarRef.current ||
      !avatarRef.current.files
    ) {
      console.error("Alguno de los campos no está definido correctamente.");
      return;
    }
    const formData = {
      nombre: nombreRef.current.value,
      cedula: cedulaRef.current.value,
      edad: parseInt(edadRef.current.value),
      sexo: sexoRef.current.value,
      telefono: telefonoRef.current.value,
      cargo: cargoRef.current.value,
      avatar: avatarRef.current.files[0],
    };
    console.log("Formulario enviado:", formData);

    try {
      const response = await axios.post<Empleado>(URL_API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Amigo registrado correctamente.");
      console.log("Amigo registrado:", response.data);

      const ultimoEmpleado = response.data;
      setEmpleados([ultimoEmpleado, ...empleados]);

      limpiarFormulario();
    } catch (error) {
      console.error("Error al agregar amigo:", error);
    }
  };

  const limpiarFormulario = () => {
    if (
      !nombreRef.current ||
      !cedulaRef.current ||
      !edadRef.current ||
      !sexoRef.current ||
      !telefonoRef.current ||
      !cargoRef.current ||
      !avatarRef.current
    ) {
      console.error("Alguno de los campos no está definido correctamente.");
      return;
    }

    nombreRef.current.value = "";
    cedulaRef.current.value = "";
    edadRef.current.value = "";
    sexoRef.current.value = "";
    telefonoRef.current.value = "";
    cargoRef.current.value = "";
    avatarRef.current.value = "";
  };

  return {
    handleSubmit,
    nombreRef,
    cedulaRef,
    edadRef,
    sexoRef,
    telefonoRef,
    cargoRef,
    avatarRef,
  };
};

export default useGestionarFormulario;
