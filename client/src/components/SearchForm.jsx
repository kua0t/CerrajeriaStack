import React, { useState } from "react";
import searchTasks from "./api/searchTasks";

function SearchForm() {
  const [criteria, setCriteria] = useState("");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    const results = await searchTasks(criteria, query);
    setSearchResults(results);
  };

  return (
    <div>
      <select value={criteria} onChange={(e) => setCriteria(e.target.value)}>
        <option value="">Selecciona un criterio</option>
        <option value="month">Mes</option>
        <option value="dayOfWeek">Día de la semana</option>
        <option value="phoneNumber">Número de teléfono</option>
        <option value="name">Nombre</option>
      </select>
      {criteria && (
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}
      <button onClick={handleSearch}>Buscar</button>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}></li>
        ))}
      </ul>
    </div>
  );
}

export default SearchForm;
