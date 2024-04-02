import React from "react";
import TablaEmpleados from "./TablaEmpleados";
import { ListaDeEmpleadosProps } from "./interfaces";

const ListaDeEmpleados: React.FC<ListaDeEmpleadosProps> = ({
  empleados,
  URL_API,
  setEmpleados,
  setMostarDetallesEmpleado,
  setInfoEmpleado,
}) => {
  return (
    <TablaEmpleados
      empleados={empleados}
      URL_API={URL_API}
      setEmpleados={setEmpleados}
      setMostarDetallesEmpleado={setMostarDetallesEmpleado}
      setInfoEmpleado={setInfoEmpleado}
    />
  );
};

export default ListaDeEmpleados;
