import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Global from "../../Global.js";
import { Link } from "react-router-dom";
class Departments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { employees: [], error: "" };
  }
async GetEmployees()
{
await axios.get(Global.APIBaseURL + "Employees").then(
    (result) => {
      console.log(result.data);
      this.setState({
        employees: result.data,
      });
    },
    (error) => {
      this.setState({
        error,
      });
    }
  );
}

  componentDidMount() {
      this.GetEmployees();
  }

  deleteEmployee=(employeeID)=> {
    debugger;
    if (!window.confirm("Are you sure to delete this employee?")) {
      return;
    } else {
      axios.delete(Global.APIBaseURL + "Employees/" + employeeID)
      .then((result) => {
        debugger;
        if(result.data.status===200)
        {
          alert(result.data.message);
          this.setState({
            employees:this.state.employees.filter(i=>i.employeeID!==employeeID)
          });
        }
        else
        alert(result.data.message);
        console.log(result);
      },
      error=>{
        debugger;
        console.error(error);
        window.location.reload();
      }
      );
    }
  }

  render() {
    const { employees } = this.state;
    var counter = 1;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12">
            <h2 className="alert alert-info">Employee List</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Employee Name</th>
                  <th>Department</th>
                  <th>Contact No.</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Date of Birth</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((item) => (
                  <tr key={item.employeeID}>
                    <td>{counter++}</td>
                    <td>
                      {item.firstName+" "+item.lastName}
                    </td>
                    <td>{item.departmentName}</td>
                    <td>{item.contactNo}</td>
                    <td>{item.address}</td>
                    <td>{item.email}</td>
                    <td>{item.dob}</td>
                    <td>
                      <div className="btn-group">
                        <Link
                          className="btn btn-info btn-sm mr-1"
                          to={"/editemployee/" + item.employeeID}
                        >
                          Edit
                        </Link>
                        <button type="button"
                          onClick={id=>this.deleteEmployee(item.employeeID)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
</div>  
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Departments;
