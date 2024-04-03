import axios from "axios";
import { toast } from "../toastUtils";
import { ListaDeEmpleadosProps } from "./interfaces";

const TablaEmpleados: React.FC<ListaDeEmpleadosProps> = ({
  empleados,
  URL_API,
  setEmpleados,
  setMostarDetallesEmpleado,
  setEmpleadoSeleccionado,
  setShowEditarEmpl,
  setDataToEdit,
}) => {
  const obtenerDetallesEmpleado = async (id: number) => {
    setMostarDetallesEmpleado(true);
    try {
      const response = await axios.get(`${URL_API}?id=${id}`);
      setMostarDetallesEmpleado(true);
      setEmpleadoSeleccionado(response.data);
    } catch (error) {
      console.error("Error buscar detalles del empleado:", error);
    }
  };

  const obtenerEmpleadoParaEditar = async (id: number) => {
    try {
      const response = await axios.get(`${URL_API}?id=${id}`);
      setMostarDetallesEmpleado(false); // oculto el formulario de detalles
      setShowEditarEmpl(true); // muestro el formulario de edición
      setDataToEdit(response.data); // almaceno la data de empleado seleccionado en esta variable
    } catch (error) {
      console.error("Error al obtener los datos del empleado:", error);
    }
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
  );
};

export default TablaEmpleados;
