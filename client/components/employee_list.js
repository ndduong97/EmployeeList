import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './employee_detail';

const PER_PAGE = 21;

class EmployeeList extends Component {

  componentWillMount() {
    this.page = 1;
  }

  handleButtonClick() {
    Meteor.subscribe('employees', PER_PAGE * (this.page + 1))
    this.page += 1;
  }

  render() {
    // props.employees => an array of employee objects
    return (
      <div>
        <div className="header">
          <h1>Employee List</h1>
        </div>
        <div className="employee-list">
          {this.props.employees.map(employee => <EmployeeDetail key={employee._id} employee={employee} />)}
        </div>
        <div className="button">
          <button onClick={this.handleButtonClick.bind(this)}
            className="btn btn-primary">
            Load More...
          </button>
        </div>
      </div>
    );
  }
};

export default createContainer(() => {
  // set up subscription
  Meteor.subscribe('employees', PER_PAGE);
  // return an object. Whatever we return will be sent to
  // EmployeeList as props

  return { employees: Employees.find({}).fetch() };
}, EmployeeList);
