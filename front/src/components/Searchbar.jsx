const Searchbar = ({ value, setValue, placeholder }) => {
  return (
    <input
      className="w-full text-sm outline-0 rounded-lg p-3 border text-gray-800 border-gray-200 bg-white"
      type="text"
      value={value}
      placeholder={placeholder ?? "Rechercher..."}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Searchbar;