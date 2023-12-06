
const Filter = ({ filterName, filterNameChange }) => {
  
  return (
      <div>
        filter shown with <input value={filterName} onChange={filterNameChange} />
      </div>
  );
}

export default Filter;