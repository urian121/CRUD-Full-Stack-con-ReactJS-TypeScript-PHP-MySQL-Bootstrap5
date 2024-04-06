import SelectEdad from "./SelectEdad";
import SelectCargoEmpleado from "./SelectCargoEmpleado";
import { FormularioProps } from "../components/interfaces";
import { useState, useEffect } from "react";

const FormularioEdit: React.FC<FormularioProps> = ({
  handleSubmitUpdate,
  idUpdateRef,
  nombreUpdateRef,
  cedulaUpdateRef,
  edadUpdateRef,
  sexoUpdateRef,
  telefonoUpdateRef,
  cargoUpdateRef,
  avatarUpdateRef,
  dataToEdit,
}) => {
  const avatarUrl: string =
    "http://localhost/crud-full-stack-con-reactjs-typescript-php-y-mysql/backend-php/fotos_empleados";

  const [sexo, setSexo] = useState<string>("");

  /**
   * Hay que asegurarsee de actualizar las referencias (ref) de los campos del formulario cada vez que cambia el empleado seleccionado.
   *  Puedes hacer esto utilizando el método useEffect de React.
   */
  useEffect(() => {
    if (dataToEdit) {
      setSexo(dataToEdit.sexo);
      if (idUpdateRef.current) {
        idUpdateRef.current.value = dataToEdit.id.toString();
      }
      if (nombreUpdateRef.current) {
        nombreUpdateRef.current.value = dataToEdit.nombre || "";
      }
      if (cedulaUpdateRef.current) {
        cedulaUpdateRef.current.value = dataToEdit.cedula || "";
      }
      if (edadUpdateRef.current) {
        edadUpdateRef.current.value = dataToEdit.edad || "";
      }
      if (dataToEdit && dataToEdit.sexo && sexoUpdateRef.current) {
        sexoUpdateRef.current.checked = dataToEdit.sexo === "masculino";
      }
      if (telefonoUpdateRef.current) {
        telefonoUpdateRef.current.value = dataToEdit.telefono || "";
      }
      if (cargoUpdateRef.current) {
        cargoUpdateRef.current.value = dataToEdit.cargo || "";
      }
    }
  }, [
    idUpdateRef,
    dataToEdit,
    nombreUpdateRef,
    cedulaUpdateRef,
    edadUpdateRef,
    sexoUpdateRef,
    telefonoUpdateRef,
    cargoUpdateRef,
    avatarUpdateRef,
  ]);

  return (
    <>
      <h1 className="fw-bold-900 mb-4">
        Actualizar el Empleado <hr />
      </h1>

      <form
        className="px-5"
        onSubmit={handleSubmitUpdate}
        method="POST"
        encType="multipart/form-data">
        <input
          type="text"
          name="id"
          ref={idUpdateRef}
          defaultValue={dataToEdit?.id || ""}
          hidden
        />
        <div className="mb-3">
          <label className="form-label float-start">Nombre</label>
          <input
            type="text"
            ref={nombreUpdateRef}
            defaultValue={dataToEdit?.nombre || ""}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label float-start">Cédula (NIT)</label>
          <input
            type="number"
            ref={cedulaUpdateRef}
            defaultValue={dataToEdit?.cedula || ""}
            className="form-control"
            required
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="form-label float-start">Seleccione la edad</label>
            <SelectEdad edadRef={edadUpdateRef} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Sexo del empleado</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                ref={sexoUpdateRef}
                id="masculino"
                value="masculino"
                checked={sexo === "masculino"}
                onChange={() => setSexo("masculino")}
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
                ref={sexoUpdateRef}
                id="femenino"
                value="femenino"
                checked={sexo === "femenino"}
                onChange={() => setSexo("femenino")}
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
            ref={telefonoUpdateRef}
            defaultValue={dataToEdit?.telefono || ""}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label float-start">Seleccione el Cargo</label>
          <SelectCargoEmpleado cargoRef={cargoUpdateRef} />
        </div>

        <div className="mb-3">
          <label className="form-label">Foto actual del Empleado</label>{" "}
          <img
            className="foto-perfil"
            src={`${avatarUrl}/${dataToEdit?.avatar}`}
            alt={dataToEdit?.avatar}
          />
        </div>

        <div className="mb-3 mt-4">
          <label className="form-label float-start">
            Cambiar Foto del empleado
          </label>
          <input
            className="form-control form-control-sm"
            type="file"
            name="avatar"
            ref={avatarUpdateRef}
            accept="image/png, image/jpeg"
          />
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary btn_add">
            Actualizar Empleado
          </button>
        </div>
      </form>
    </>
  );
};

export default FormularioEdit;
