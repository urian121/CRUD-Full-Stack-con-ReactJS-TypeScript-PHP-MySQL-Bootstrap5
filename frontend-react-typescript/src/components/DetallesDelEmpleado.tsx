import { Empleado } from "./interfaces";

interface DetallesDelEmpleadoProps {
  infoEmpleado: Empleado;
}

const DetallesDelEmpleado: React.FC<DetallesDelEmpleadoProps> = ({
  infoEmpleado,
}) => {
  return (
    <div>
      <h2>Detalles del Empleado</h2>
      <p>ID: {infoEmpleado.id}</p>
      <p>Nombre: {infoEmpleado.nombre}</p>
      <p>Cédula: {infoEmpleado.cedula}</p>
      <p>Edad: {infoEmpleado.edad}</p>
      <p>Sexo: {infoEmpleado.sexo}</p>
    </div>
  );
};

export default DetallesDelEmpleado;
