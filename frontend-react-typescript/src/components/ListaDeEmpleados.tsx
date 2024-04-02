import React from "react";

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
  URL_API: string;
}

const ListaDeEmpleados: React.FC<ListaDeEmpleadosProps> = ({
  empleados,
  URL_API,
}) => {
  const obtenerDetallesEmpleado = (id: number) => {
    console.log("Detalles del empleado:", id);
  };

  const obtenerEmpleadoParaEditar = (id: number) => {
    console.log("Empleado para editar:", id);
  };

  const eliminarEmpleado = (id: number) => {
    console.log("Empleado para eliminar:", id);
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
                    <li>
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
