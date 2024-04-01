interface SelectCargoProps {
  cargoRef: React.RefObject<HTMLSelectElement>;
}

const SelectCargo: React.FC<SelectCargoProps> = ({ cargoRef }) => {
  const cargos = [
    "Gerente",
    "Asistente",
    "Analista",
    "Contador",
    "Secretario",
    "Desarrollador Web",
    "Desarrollador FrontEnd",
    "Desarrollador BackEnd",
  ];

  const options = cargos.map((cargo, index) => (
    <option key={index} value={cargo}>
      {cargo}
    </option>
  ));

  return (
    <select ref={cargoRef} className="form-select" required>
      <option value="">Seleccione el Cargo</option>
      {options}
    </select>
  );
};

export default SelectCargo;
