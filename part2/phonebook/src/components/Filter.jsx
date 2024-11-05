const Filter = (props) => {
	return (
		<div>
			filter shown with <input
			  name="Filter Input"
	          value={props.filter}
	          onChange={props.filterName}
	          id={props.id}
        />
		</div>
	)
}

export default Filter