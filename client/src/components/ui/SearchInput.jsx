import { forwardRef } from "react";

export const SearchInput = forwardRef(({ onChange, value }, ref) => (
  <input
    onChange={onChange}
    value={value}
    ref={ref}
    className="w-96 text-black px-4 py-2 rounded-md"
    placeholder="Busque por Nombre, Telefono o Fecha"
  />
));
