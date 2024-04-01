import SelectEdad from "./SelectEdad";
import SelectCargoEmpleado from "./SelectCargoEmpleado";

interface FormularioProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  nombreRef: React.RefObject<HTMLInputElement>;
  cedulaRef: React.RefObject<HTMLInputElement>;
  edadRef: React.RefObject<HTMLSelectElement>;
  sexoRef: React.RefObject<HTMLInputElement>;
  telefonoRef: React.RefObject<HTMLInputElement>;
  cargoRef: React.RefObject<HTMLSelectElement>;
  avatarRef: React.RefObject<HTMLInputElement>;
}

const Formulario: React.FC<FormularioProps> = ({
  handleSubmit,
  nombreRef,
  cedulaRef,
  edadRef,
  sexoRef,
  telefonoRef,
  cargoRef,
  avatarRef,
}) => {
  return (
    <div>
      <form
        className="px-5"
        onSubmit={handleSubmit}
        method="POST"
        encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label float-start">Nombre</label>
          <input
            type="text"
            ref={nombreRef}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label float-start">Cédula (NIT)</label>
          <input
            type="number"
            ref={cedulaRef}
            className="form-control"
            required
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="form-label float-start">Seleccione la edad</label>
            <SelectEdad edadRef={edadRef} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Sexo del alumno</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                ref={sexoRef}
                id="masculino"
                value="masculino"
                defaultChecked
                name="sexo"
              />
              <label className="form-check-label" htmlFor="masculino">
                Masculino
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                ref={sexoRef}
                id="femenino"
                value="femenino"
                name="sexo"
              />
              <label className="form-check-label" htmlFor="femenino">
                Femenino
              </label>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label float-start">Teléfono</label>
          <input
            type="number"
            ref={telefonoRef}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label float-start">Seleccione el Cargo</label>
          <SelectCargoEmpleado cargoRef={cargoRef} />
        </div>
        <div className="mb-3 mt-4">
          <label className="form-label float-start">
            Cambiar Foto del empleado
          </label>
          <input
            className="form-control form-control-sm"
            type="file"
            name="avatar"
            ref={avatarRef}
            accept="image/png, image/jpeg"
          />
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary btn_add">
            Registrar Empleado
          </button>
        </div>
      </form>
    </div>
  );
};

export default Formulario;
