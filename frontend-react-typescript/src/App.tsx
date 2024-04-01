import Formulario from "./components/Formulario";
import ListaDeEmpleados from "./components/ListaDeEmpleados";
import Titulo from "./components/Titulo";
import useGestionarFormulario from "./custom_hooks/useGestionarFormulario";

function App() {
  const URL_API =
    "http://localhost/crud-full-stack-con-reactjs-typescript-php-y-mysql/backend-php/";

  // Usar el hook personalizado
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
          <ListaDeEmpleados />
        </div>
      </div>
    </>
  );
}

export default App;
