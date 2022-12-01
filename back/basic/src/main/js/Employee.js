const React = require('react');
const ReactDOM = require('react-dom');

class Employee extends React.Component{
    render() {
        return (

            <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <div className="flex-1 min-w-0">
                    <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-sm font-medium text-gray-900">{this.props.employee.firstName + " " + this.props.employee.lastName}</p>
                        <p className="text-sm text-gray-500 truncate">{this.props.employee.description}</p>
                    </a>
                </div>
            </div>

        )
    }
}

