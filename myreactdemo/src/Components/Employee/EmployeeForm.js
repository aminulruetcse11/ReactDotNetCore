import React, { Component } from "react";
import axios from "axios";
import Global from "../../Global.js";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeID: 0,
      firstName: "",
      lastName: "",
      contactNo: "",
      gender: "",
      address: "",
      email: "",
      dob: new Date(),
      departmentID: 0,
      departments: [],
    };

    this.refFirstName=React.createRef();

  }


  componentDidMount() {
    this.PopulateDepartmentDropdown();
    if (this.props.employeeID !== undefined) {
      axios.get(Global.APIBaseURL + "Employees/" + this.props.employeeID).then(
        (result) => {
          debugger;
          console.log(result.data.data);
          this.setState({
            employeeID: result.data.data.employeeID,
            firstName: result.data.data.firstName,
            lastName: result.data.data.lastName,
            contactNo: result.data.data.contactNo,
            gender: result.data.data.gender,
            address: result.data.data.address,
            email: result.data.data.email,
            dob: new Date( result.data.data.dob),
            departmentID: result.data.data.departmentID,
          });
        },
        (error) => {
          alert("failed." + error);
        }
      );
    }
  }

  handleMethod = (e) => {
    e.preventDefault();
    this.props.handleMethod(this.state);
  };
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleDateChange = (e) => {
    debugger;
    this.setState({ dob: e});
  };
  
  
  PopulateDepartmentDropdown=()=> {
    axios.get(Global.APIBaseURL + "Departments").then(
      (result) => {
        console.log(result.data);
        this.setState({
          departments: result.data,
          departmentID:result.data[0].departmentID
        });
      },
      (error) => {
        this.setState({
          error,
        });
      }
    );
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-8 offset-md-2 col-12">
          <form className="form-horizontal">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-4">First Name</label>
                      <div className="col-8">
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          autoFocus={true}
                          placeholder="Enter First name"
                          onChange={this.handleChange}
                          value={this.state.firstName}
                          ref={this.refFirstName}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-4">Last Name</label>
                      <div className="col-8">
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          placeholder="Enter last name"
                          onChange={this.handleChange}
                          value={this.state.lastName}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-4">Contact No</label>
                      <div className="col-8">
                        <input
                          type="text"
                          className="form-control"
                          id="contactNo"
                          name="contactNo"
                          placeholder="Enter contact No"
                          onChange={this.handleChange}
                          value={this.state.contactNo}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-4">DOB</label>
                      <div className="col-8">
                        <DatePicker
                          className="d-block form-control"
                          id="dob"
                          name="dob"
                          placeholder="Enter DOB"
                          onChange={this.handleDateChange}
                          selected={this.state.dob}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-4">Address</label>
                      <div className="col-8">
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          placeholder="Enter address"
                          onChange={this.handleChange}
                          value={this.state.address}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-4">Email</label>
                      <div className="col-8">
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Enter last name"
                          onChange={this.handleChange}
                          value={this.state.email}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-4">Gender</label>
                      <div className="col-8">
                        <select
                          type="text"
                          className="form-control"
                          id="gender"
                          name="gender"
                          placeholder="Enter Gender"
                          onChange={this.handleChange}
                          value={this.state.gender}
                        >
                          <option value="1">Male</option>
                          <option value="2">Female</option>
                          <option value="3">Other</option>
                          </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-4">Department</label>
                      <div className="col-8">
                        <select
                          className="form-control"
                          id="departmentID"
                          name="departmentID"
                          placeholder="Enter Department"
                          onChange={this.handleChange}
                          value={this.state.departmentID}>
                          {this.state.departments.map(d=>(
                            <option value={d.departmentID}>{d.departmentName}</option>
                          ))}
                        </select>

                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-2 offset-4">
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={this.handleMethod}
                        >
                          {this.props.btnTitle}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EmployeeForm;
