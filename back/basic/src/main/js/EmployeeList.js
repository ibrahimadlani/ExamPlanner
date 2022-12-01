const React = require('react'); // <1>
const ReactDOM = require('react-dom'); // <2>

const Employee = require("./Employee");

class EmployeeList extends React.Component{
    render() {
        const employees = this.props.employees.map(employee => <Employee key={employee._links.self.href} employee={employee}/>);

        return (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 container">
                <h1>OUI</h1>
                {{ employees }}
            </div>
        )
    }
}