import { useState } from "react";
import "./assets/css/App.css";
import Formulario from "./components/Formulario";
import ListaDeEmpleados from "./components/ListaDeEmpleados";
import Loader from "./components/Loader";
import Titulo from "./components/Titulo";

import { ToastContainer } from "./toastUtils";

import { Empleado } from "./components/interfaces";

// Importar el hook personalizado
import useGestionarFormulario from "./custom_hooks/useGestionarFormulario";
import useObtenerEmpleados from "./custom_hooks/useObtenerEmpleados";
import DetallesDelEmpleado from "./components/DetallesDelEmpleado";

function App() {
  const [mostarDetallesEmpleado, setMostarDetallesEmpleado] =
    useState<boolean>(false);

  /**
   * El problema radica en que estás pasando un array de empleados (Empleado[]) a DetallesDelEmpleado, pero la interfaz DetallesDelEmpleadoProps espera un solo objeto de tipo Empleado. Por eso estás viendo el error.

Una forma de resolverlo es asegurarse de pasar un solo objeto Empleado en lugar de un array. Puedes hacerlo modificando cómo se asigna infoEmpleado en tu estado. En lugar de asignar un array de empleados, puedes asignar un solo empleado cuando haces clic en un empleado específico en la lista.
   */
  //  const [infoEmpleado, setInfoEmpleado] = useState<Empleado | null>(null);
  const [infoEmpleado, setInfoEmpleado] = useState<Empleado[]>([]);

  console.log("info empleado**:", infoEmpleado);

  const URL_API =
    "http://localhost/crud-full-stack-con-reactjs-typescript-php-y-mysql/backend-php/";

  // Usar el hook personalizado
  const { empleados, setEmpleados, loading } = useObtenerEmpleados(URL_API);
  const {
    handleSubmit,
    nombreRef,
    cedulaRef,
    edadRef,
    sexoRef,
    telefonoRef,
    cargoRef,
    avatarRef,
  } = useGestionarFormulario(URL_API, empleados, setEmpleados);

  if (loading) {
    return <Loader />;
  }

  console.log("vlor mostarDetallesEmpleado", mostarDetallesEmpleado);
  return (
    <>
      <div className="row justify-content-md-center">
        <Titulo />
        <ToastContainer />
        <div className="col-md-5 mb-5">
          {/* 
          No hay que pasar un array de empleados (Empleado[]) en lugar de un solo empleado (Empleado) al componente DetallesDelEmpleado.
           La definición de la interfaz DetallesDelEmpleadoProps espera un objeto de tipo Empleado, no un array de Empleado[].
          */}
          {mostarDetallesEmpleado ? (
            <DetallesDelEmpleado infoEmpleado={infoEmpleado} />
          ) : (
            <Formulario
              handleSubmit={handleSubmit}
              nombreRef={nombreRef}
              cedulaRef={cedulaRef}
              edadRef={edadRef}
              sexoRef={sexoRef}
              telefonoRef={telefonoRef}
              cargoRef={cargoRef}
              avatarRef={avatarRef}
            />
          )}
        </div>
        <div className="col-md-7">
          {empleados.length > 0 ? (
            <ListaDeEmpleados
              URL_API={URL_API}
              empleados={empleados}
              setEmpleados={setEmpleados}
              setMostarDetallesEmpleado={setMostarDetallesEmpleado}
              setInfoEmpleado={setInfoEmpleado}
            />
          ) : (
            <p className="text-center">No hay empleados</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
