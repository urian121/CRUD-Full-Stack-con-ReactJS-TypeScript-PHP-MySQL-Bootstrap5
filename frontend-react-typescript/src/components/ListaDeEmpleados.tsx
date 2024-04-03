import React from "react";
import TablaEmpleados from "./TablaEmpleados";
import { ListaDeEmpleadosProps } from "./interfaces";

const ListaDeEmpleados: React.FC<ListaDeEmpleadosProps> = ({
  empleados,
  URL_API,
  setEmpleados,
  setMostarDetallesEmpleado,
  setEmpleadoSeleccionado,
  setShowEditarEmpl,
  setDataToEdit,
}) => {
  return (
    <TablaEmpleados
      empleados={empleados}
      URL_API={URL_API}
      setEmpleados={setEmpleados}
      setMostarDetallesEmpleado={setMostarDetallesEmpleado}
      setEmpleadoSeleccionado={setEmpleadoSeleccionado}
      setShowEditarEmpl={setShowEditarEmpl}
      setDataToEdit={setDataToEdit}
    />
  );
};

export default ListaDeEmpleados;
