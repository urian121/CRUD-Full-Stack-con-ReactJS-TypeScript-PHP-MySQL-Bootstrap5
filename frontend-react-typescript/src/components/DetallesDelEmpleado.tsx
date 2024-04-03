import { InfoEmp } from "../components/interfaces";

interface Props {
  empleadoSeleccionado: InfoEmp | null;
}

const DetallesDelEmpleado: React.FC<Props> = ({ empleadoSeleccionado }) => {
  if (!empleadoSeleccionado) {
    return <div>No se ha seleccionado ningún empleado</div>;
  }

  const { id, nombre, cedula, sexo, cargo, avatar, edad, telefono } =
    empleadoSeleccionado;

  return (
    <div>
      <h2>Detalles del Empleado</h2>
      <p>ID: {id}</p>
      <p>Nombre: {nombre}</p>
      <p>Cédula: {cedula}</p>
      <p>Sexo: {sexo}</p>
      <p>Cargo: {cargo}</p>
      <p>Edad: {edad}</p>
      <p>Teléfono: {telefono}</p>
      <p>Avatar: {avatar}</p>
    </div>
  );
};

export default DetallesDelEmpleado;
