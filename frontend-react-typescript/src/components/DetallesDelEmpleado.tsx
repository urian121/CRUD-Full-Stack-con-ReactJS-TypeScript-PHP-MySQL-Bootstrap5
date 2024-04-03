import { InfoEmp } from "../components/interfaces";
import "../assets/css/card.css";

interface Props {
  empleadoSeleccionado: InfoEmp | null;
  volverHome: () => void;
}

const DetallesDelEmpleado: React.FC<Props> = ({
  empleadoSeleccionado,
  volverHome,
}) => {
  if (!empleadoSeleccionado) {
    return <div>No se ha seleccionado ningún empleado</div>;
  }

  const { nombre, cedula, sexo, cargo, avatar, edad, telefono } =
    empleadoSeleccionado;

  const avatarUrl: string =
    "http://localhost/crud-full-stack-con-reactjs-typescript-php-y-mysql/backend-php/fotos_empleados";

  return (
    <>
      <h1 className="fw-bold-900 mb-4">
        Detalles del Empleado <hr />
      </h1>

      <div className="cards">
        <div className="img">
          <img src={`${avatarUrl}/${avatar}`} alt={avatar} />
        </div>
        <div className="infos">
          <div className="name">
            <h2>{nombre}</h2>
            <h4>@{nombre}</h4>
          </div>
          <p className="text">
            Empleado, <strong>{nombre}</strong>, cargo de{" "}
            <strong>{cargo}</strong> y su teléfono es{" "}
            <strong>{telefono}</strong>
          </p>
          <ul className="stats">
            <li>
              <h3>{edad}</h3>
              <h4>Edad</h4>
            </li>
            <li>
              <h3>{sexo}</h3>
              <h4>Sexo</h4>
            </li>
            <li>
              <h3>{cedula}</h3>
              <h4>Cedula</h4>
            </li>
          </ul>
          <div className="links">
            <button className="follow" onClick={volverHome}>
              <i className="bi bi-arrow-left-circle float-start"></i>
              Volver
            </button>
            <button className="view">Imprimir</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetallesDelEmpleado;
