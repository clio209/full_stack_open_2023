import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const Persons = ({ persons, filterName, deletePerson }) => {
  const filteredPersons = persons.filter(person => person.name.includes(filterName))
  return (
    <div>
      {filteredPersons.map(person => (
      <div key={person.id}>
        <p>{person.name} {person.number} </p>
      <button onClick={() => deletePerson(person.id)}>delete</button>
      </div>
      ))}
    </div>
  );
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default Persons;
export { getAll, create, update};
