import { useState } from "react";
import "./assets/css/App.css";
import Formulario from "./components/Formulario";
import ListaDeEmpleados from "./components/ListaDeEmpleados";
import Loader from "./components/Loader";
import Titulo from "./components/Titulo";

import { ToastContainer } from "./toastUtils";

import { InfoEmp } from "./components/interfaces";

// Importar el hook personalizado
import useGestionarFormulario from "./hooks/useGestionarFormulario";
import useObtenerEmpleados from "./hooks/useObtenerEmpleados";
import useGestionarUpdateFormulario from "./hooks/useGestionarUpdateFormulario";

import DetallesDelEmpleado from "./components/DetallesDelEmpleado";
import FormularioEdit from "./components/FormularioEdit";

function App() {
  const [mostarDetallesEmpleado, setMostarDetallesEmpleado] =
    useState<boolean>(false);

  const [empleadoSeleccionado, setEmpleadoSeleccionado] =
    useState<InfoEmp | null>(null);

  // Manejar 2 estados para obtener el empleado a editar y almacenar la data de dicho empleado
  const [showEditarEmpl, setShowEditarEmpl] = useState<boolean>(false);
  const [dataToEdit, setDataToEdit] = useState<InfoEmp | null>(null);

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

  const {
    idUpdateRef,
    handleSubmitUpdate,
    nombreUpdateRef,
    cedulaUpdateRef,
    edadUpdateRef,
    sexoUpdateRef,
    telefonoUpdateRef,
    cargoUpdateRef,
    avatarUpdateRef,
  } = useGestionarUpdateFormulario(URL_API, empleados, setEmpleados);
  if (loading) {
    return <Loader />;
  }

  const volverHome = () => {
    setMostarDetallesEmpleado(false);
  };

  return (
    <>
      <div className="row justify-content-md-center">
        <Titulo />
        <ToastContainer />
        <div className="col-md-5 mb-5">
          {mostarDetallesEmpleado ? (
            <DetallesDelEmpleado
              empleadoSeleccionado={empleadoSeleccionado}
              volverHome={volverHome}
            />
          ) : showEditarEmpl ? (
            <FormularioEdit
              idUpdateRef={idUpdateRef}
              handleSubmitUpdate={handleSubmitUpdate}
              nombreUpdateRef={nombreUpdateRef}
              cedulaUpdateRef={cedulaUpdateRef}
              edadUpdateRef={edadUpdateRef}
              sexoUpdateRef={sexoUpdateRef}
              telefonoUpdateRef={telefonoUpdateRef}
              cargoUpdateRef={cargoUpdateRef}
              avatarUpdateRef={avatarUpdateRef}
              dataToEdit={dataToEdit}
            />
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
              setEmpleadoSeleccionado={setEmpleadoSeleccionado}
              setShowEditarEmpl={setShowEditarEmpl}
              setDataToEdit={setDataToEdit}
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
