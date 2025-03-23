export function Button({ onClick, children }) {
  return (
    <button
      className="bg-blue-900 px-4 py-1 rounded-md my-2 disabled:bg-indigo-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
