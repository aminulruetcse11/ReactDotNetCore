import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Global from "./../.././Global.js";
import { Link } from "react-router-dom";
class Departments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { departments: [], error: "" };
  }

  async GetDepartment()
  {
   await axios.get(Global.APIBaseURL + "Departments").then(
      (result) => {
        console.log(result.data);
        this.setState({
          departments: result.data,
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
    this.GetDepartment();
  }

  deleteDepartment=(departmentID)=> {
    debugger;
    if (!window.confirm("Are you sure to delete this department?")) {
      return;
    } else {
      axios.delete(Global.APIBaseURL + "Departments/" + departmentID)
      .then((result) => {
        debugger;
        if(result.data.status===200)
        {
          alert(result.data.message);
         this.setState({
           departments:this.state.departments.filter(i=>i.departmentID!==departmentID)
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
    const { departments } = this.state;
    var counter = 1;
    return (
      <>
        <div className="row">
          <div className="col-md-6 offset-md-3 col-12">
            <h2 className="alert alert-info">Department List</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3 col-12">
            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Department Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((item) => (
                  <tr key={item.departmentID}>
                    <td>{counter++}</td>
                    <td>{item.departmentName}</td>
                    <td>
                      <div className="btn-group">
                        <Link
                          className="btn btn-info btn-sm mr-1"
                          to={"/editdepartment/" + item.departmentID}
                        >
                          Edit
                        </Link>
                        <button type="button"
                          onClick={id=>this.deleteDepartment(item.departmentID)}
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
      </>
    );
  }
}

export default Departments;
