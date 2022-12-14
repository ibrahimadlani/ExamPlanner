'use strict';

// tag::vars[]
const React = require('react'); // <1>
const ReactDOM = require('react-dom'); // <2>
const client = require('./client'); // <3>
// end::vars[]

// tag::app[]
class App extends React.Component { // <1>

	constructor(props) {
		super(props);
		this.state = {employees: []};
	}

	componentDidMount() { // <2>
		client({method: 'GET', path: '/api/employees'}).done(response => {
			this.setState({employees: response.entity._embedded.employees});
		});
	}

	componentDidMount() { // <2>
		client({method: 'GET', path: '/api/personnes'}).done(response => {
			this.setState({personnes: response.entity._embedded.personnes});
		});
	}

	componentDidMount() { // <2>
		client({method: 'GET', path: '/api/creneaux'}).done(response => {
			this.setState({creneaux: response.entity._embedded.creneaux});
		});
	}

	render() {
		return (
			<div className="container mx-auto mt-5">
				<EmployeeList employees={this.state.employees}/>
			</div>

		)
	}
}

class EmployeeList extends React.Component{
	render() {
		const employees = this.props.employees.map(employee =>
			<Employee key={employee._links.self.href} employee={employee}/>
		);
		return (
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{employees}
			</div>
		)
	}
}
// end::employee-list[]

// tag::employee[]



ReactDOM.render(<App />,document.getElementById('react'))
