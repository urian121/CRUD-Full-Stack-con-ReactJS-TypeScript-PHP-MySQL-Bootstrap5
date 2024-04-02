import "./assets/css/App.css";
import Formulario from "./components/Formulario";
import ListaDeEmpleados from "./components/ListaDeEmpleados";
import Loader from "./components/Loader";
import Titulo from "./components/Titulo";

// Importar el hook personalizado
import useGestionarFormulario from "./custom_hooks/useGestionarFormulario";
import useObtenerEmpleados from "./custom_hooks/useObtenerEmpleados";

function App() {
  const URL_API =
    "http://localhost/crud-full-stack-con-reactjs-typescript-php-y-mysql/backend-php/";

  // Usar el hook personalizado
  const { empleados, loading } = useObtenerEmpleados(URL_API);
  console.log("Empleados:", empleados);
  const {
    handleSubmit,
    nombreRef,
    cedulaRef,
    edadRef,
    sexoRef,
    telefonoRef,
    cargoRef,
    avatarRef,
  } = useGestionarFormulario(URL_API);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="row justify-content-md-center">
        <Titulo />
        <div className="col-md-5 mb-5">
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
        </div>
        <div className="col-md-7">
          <ListaDeEmpleados empleados={empleados} URL_API={URL_API} />
        </div>
      </div>
    </>
  );
}

export default App;
