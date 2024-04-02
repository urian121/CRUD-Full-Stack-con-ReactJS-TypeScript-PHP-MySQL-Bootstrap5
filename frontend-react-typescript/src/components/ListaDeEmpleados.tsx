import axios from "axios";
import { toast } from "../toastUtils";

interface Empleado {
  id: number;
  nombre: string;
  cedula: string;
  edad: number;
  sexo: string;
  cargo: string;
  avatar: string;
}

interface ListaDeEmpleadosProps {
  empleados: Empleado[]; // Ahora empleados es un arreglo de objetos Empleado
  setEmpleados: React.Dispatch<React.SetStateAction<Empleado[]>>;
  URL_API: string;
}

const ListaDeEmpleados: React.FC<ListaDeEmpleadosProps> = ({
  empleados,
  URL_API,
  setEmpleados,
}) => {
  const obtenerDetallesEmpleado = (id: number) => {
    console.log("Detalles del empleado:", id);
  };

  const obtenerEmpleadoParaEditar = (id: number) => {
    console.log("Empleado para editar:", id);
  };

  const eliminarEmpleado = async (id: number) => {
    console.log("Empleado para eliminar:", id);
    try {
      const response = await axios.delete(`${URL_API}?id=${id}`);
      console.log("empleado eliminado:", response.data);
      toast.success("Empleado eliminado correctamente");

      const nuevaListaEmpleados = empleados.filter(
        (empleado) => empleado.id !== id
      );
      setEmpleados(nuevaListaEmpleados);
    } catch (error) {
      console.error("Error al eliminar el empleado:", error);
    }
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Edad</th>
              <th scope="col">Cedula</th>
              <th scope="col">Sexo</th>
              <th scope="col">Cargo</th>
              <th scope="col">Avatar</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado.id}>
                <td>{empleado.nombre}</td>
                <td>{empleado.edad}</td>
                <td>{empleado.cedula}</td>
                <td>{empleado.sexo}</td>
                <td>{empleado.cargo}</td>
                <td>
                  <img
                    src={`${URL_API}fotos_empleados/${empleado.avatar}`}
                    alt={empleado.avatar}
                    width="50"
                    height="50"
                  />
                </td>
                <td>
                  <ul className="flex_acciones">
                    <li>
                      <span
                        title={`Detalles del empleado ${empleado.nombre}`}
                        onClick={() => obtenerDetallesEmpleado(empleado.id)}
                        className="btn btn-success">
                        <i className="bi bi-binoculars"></i>
                      </span>
                    </li>
                    <li className="mx-2">
                      <span
                        title={`Editar datos del empleado ${empleado.nombre}`}
                        className="btn btn-primary"
                        onClick={() => obtenerEmpleadoParaEditar(empleado.id)}>
                        <i className="bi bi-pencil-square"></i>
                      </span>
                    </li>
                    <li>
                      <button
                        title={`Borrar empleado ${empleado.nombre}`}
                        className="btn btn-danger"
                        type="button"
                        onClick={() => eliminarEmpleado(empleado.id)}>
                        <i className="bi bi-trash3"></i>
                      </button>
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListaDeEmpleados;
