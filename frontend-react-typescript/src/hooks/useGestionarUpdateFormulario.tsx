import { useRef } from "react";
import axios from "axios";
import { toast } from "../toastUtils";
import { Empleado } from "../components/interfaces";

const useGestionarUpdateFormulario = (
  URL_API: string,
  empleados: Empleado[],
  setEmpleados: React.Dispatch<React.SetStateAction<Empleado[]>>
) => {
  const nombreUpdateRef = useRef<HTMLInputElement>(null);
  const cedulaUpdateRef = useRef<HTMLInputElement>(null);
  const edadUpdateRef = useRef<HTMLSelectElement>(null);
  const sexoUpdateRef = useRef<HTMLInputElement>(null);
  const telefonoUpdateRef = useRef<HTMLInputElement>(null);
  const cargoUpdateRef = useRef<HTMLSelectElement>(null);
  const avatarUpdateRef = useRef<HTMLInputElement>(null);

  const handleSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !nombreUpdateRef.current ||
      !cedulaUpdateRef.current ||
      !edadUpdateRef.current ||
      !sexoUpdateRef.current ||
      !telefonoUpdateRef.current ||
      !cargoUpdateRef.current ||
      !avatarUpdateRef.current ||
      !avatarUpdateRef.current.files
    ) {
      console.error("Alguno de los campos no está definido correctamente.");
      return;
    }
    const formData = {
      nombre: nombreUpdateRef.current.value,
      cedula: cedulaUpdateRef.current.value,
      edad: parseInt(edadUpdateRef.current.value),
      sexo: sexoUpdateRef.current.value,
      telefono: telefonoUpdateRef.current.value,
      cargo: cargoUpdateRef.current.value,
      avatar: avatarUpdateRef.current.files[0],
    };
    console.log("Data para actualizar:", formData);
    const id = dataToEdit?.id;
    try {
      const response = await axios.put<Empleado>(`${URL_API}${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Empleado registrado correctamente.");
      console.log("Empleado registrado:", response.data);

      const ultimoEmpleado = response.data;
      setEmpleados([ultimoEmpleado, ...empleados]);

      limpiarFormulario();
    } catch (error) {
      console.error("Error al agregar empleado:", error);
    }
  };

  const limpiarFormulario = () => {
    if (
      !nombreUpdateRef.current ||
      !cedulaUpdateRef.current ||
      !edadUpdateRef.current ||
      !sexoUpdateRef.current ||
      !telefonoUpdateRef.current ||
      !cargoUpdateRef.current ||
      !avatarUpdateRef.current
    ) {
      console.error("Alguno de los campos no está definido correctamente.");
      return;
    }

    nombreUpdateRef.current.value = "";
    cedulaUpdateRef.current.value = "";
    edadUpdateRef.current.value = "";
    sexoUpdateRef.current.value = "";
    telefonoUpdateRef.current.value = "";
    cargoUpdateRef.current.value = "";
    avatarUpdateRef.current.value = "";
  };

  return {
    handleSubmitUpdate,
    nombreUpdateRef,
    cedulaUpdateRef,
    edadUpdateRef,
    sexoUpdateRef,
    telefonoUpdateRef,
    cargoUpdateRef,
    avatarUpdateRef,
  };
};

export default useGestionarUpdateFormulario;
