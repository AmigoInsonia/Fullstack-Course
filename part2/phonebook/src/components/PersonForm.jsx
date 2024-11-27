const PersonForm = (props) => {
	return (
		<form onSubmit={props.addName}>
        <div>
          name: <input
          	name="Name Input"
            value={props.newName}
            onChange={props.handleNameChange}
          />
        </div>
        <div>
          number: <input
          	name="Number Input"
            value={props.newNumber}
            onChange={props.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
	)
}

export default PersonForm