const Persons = ({ persons, filterName }) => {
  const filteredPersons = persons.filter(person => person.name.includes(filterName))
  return (
    <div>
      {filteredPersons.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
    </div>
  );
}

export default Persons;