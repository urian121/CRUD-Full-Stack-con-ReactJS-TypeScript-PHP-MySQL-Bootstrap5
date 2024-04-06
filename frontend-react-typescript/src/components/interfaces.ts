/**
 * Una interfaz en TypeScript es una forma de definir la estructura de un objeto. Proporciona un contrato que especifica qué propiedades y métodos deben estar presentes en un objeto para que sea considerado de cierto tipo
 interface Persona {
  nombre: string;
  edad: number;
}

la interfaz Persona tiene dos propiedades: nombre, que debe ser una cadena (string), y edad, que debe ser un número (number). Esto significa que cualquier objeto que se ajuste a esta interfaz debe tener estas dos propiedades con estos tipos de datos.

function imprimirInformacion(persona: Persona) {
  console.log(`Nombre: ${persona.nombre}, Edad: ${persona.edad}`);
}

const usuario: Persona = { nombre: 'Juan', edad: 30 };

imprimirInformacion(usuario); // Output: Nombre: Juan, Edad: 30

La función imprimirInformacion que espera un objeto que cumpla con la interfaz Persona. Luego creamos un objeto usuario que tiene las propiedades nombre y edad requeridas por la interfaz Persona. Finalmente, llamamos a la función imprimirInformacion pasando el objeto usuario como argumento, y se imprimirá su información en la consola.
 */


// Define la interfaz para un empleado, con las propiedades específicas que se esperan para cada empleado.
export interface Empleado {
  id: number;
  nombre: string;
  cedula: string;
  edad: number;
  sexo: string;
  telefono: string;
  cargo: string;
  avatar: string;
}


 export  interface InfoEmp {
    id: string;
    nombre: string;
    cedula: string;
    sexo: string;
    cargo: string;
    avatar?: string;
    edad?: string;
    telefono?: string;
  }


// Define las propiedades esperadas para el componente ListaDeEmpleados.
export interface ListaDeEmpleadosProps {
  empleados: Empleado[]; //Array de empleados
  URL_API: string;
  //mostarDetallesEmpleado: boolean;
  setEmpleados: React.Dispatch<React.SetStateAction<Empleado[]>>;
  setMostarDetallesEmpleado: React.Dispatch<React.SetStateAction<boolean>>;
  setEmpleadoSeleccionado: React.Dispatch<React.SetStateAction<InfoEmp | null>>;
  setShowEditarEmpl: React.Dispatch<React.SetStateAction<boolean>>;
  setDataToEdit: React.Dispatch<React.SetStateAction<InfoEmp | null>>;
}


export interface FormularioProps {
  idUpdateRef: React.RefObject<HTMLInputElement>;
  handleSubmitUpdate: (event: React.FormEvent<HTMLFormElement>) => void;
  nombreUpdateRef: React.RefObject<HTMLInputElement>;
  cedulaUpdateRef: React.RefObject<HTMLInputElement>;
  edadUpdateRef: React.RefObject<HTMLSelectElement>;
  sexoUpdateRef: React.RefObject<HTMLSelectElement>;
  telefonoUpdateRef: React.RefObject<HTMLInputElement>;
  cargoUpdateRef: React.RefObject<HTMLSelectElement>;
  avatarUpdateRef: React.RefObject<HTMLInputElement>;
  dataToEdit: InfoEmp | null;
}

// Define las propiedades esperadas para el componente SelectEdad.
export interface SelectEdadProps {
  edadRef: React.RefObject<HTMLSelectElement>;
}

// Define las propiedades esperadas para el componente SelectCargo.
export interface SelectCargoProps {
  cargoRef: React.RefObject<HTMLSelectElement>;
}