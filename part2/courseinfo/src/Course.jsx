const Course = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      <div>
        {course.parts.map((part) => (
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>
        ))}
      </div>
      <div>
        total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
      </div>
    </div>
  )
}

export default Course