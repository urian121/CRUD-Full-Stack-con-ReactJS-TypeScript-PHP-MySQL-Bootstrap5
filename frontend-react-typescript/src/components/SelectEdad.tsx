import { SelectEdadProps } from "./interfaces";

const SelectEdad: React.FC<SelectEdadProps> = ({ edadRef }) => {
  const options = [];
  for (let i = 18; i <= 50; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <select className="form-select" ref={edadRef} required>
      <option value="">Seleccione la Edad</option>
      {options}
    </select>
  );
};

export default SelectEdad;
