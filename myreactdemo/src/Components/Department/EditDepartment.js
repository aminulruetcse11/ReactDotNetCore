import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Global from "./../.././Global.js";
class EditDepartment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentName: "",
      departmentID: 0,
    };
  }

  componentDidMount() {
    console.log("edit page:" + this.props.match.params.id);
    axios
      .get(Global.APIBaseURL + "Departments/" + this.props.match.params.id)
      .then(
        result=> {
          console.log(result.data);
          this.setState({
            departmentID:result.data.departmentID,
            departmentName:result.data.departmentName
        });
        },
        (error) => {
          alert("failed." + error);
        }
      );
  }

  UpdateDepartment = (e) => {
    e.preventDefault();
    if (!this.validateSubmit()) {
      alert("please enter department name");
      return false;
    } else {
      axios.put(Global.APIBaseURL + "Departments/"+this.state.departmentID, {
          departmentName: this.state.departmentName,
          departmentID: this.state.departmentID,
        })
        .then(
          (result) => {
            console.log(result.data);
            if (result.data.status === 200) {
              alert(result.data.message);
              this.props.history.push("/departments");
            }
            else
            alert(result.data.message);
          },
          (error) => {
            alert("failed." + error);
            this.props.history.push("/departments");
          }
        );
    }
  };

  validateSubmit = () => {
    if (this.state.departmentName === "") 
        return false;

        return true;
  };
  handleChange = (e) => {
    this.setState({ departmentName: e.target.value });
  };

  render() {
    return (
      <>
        <div className="row">
          <div className="col-6 offset-3">
            <h2 className="alert alert-info">Edit Department</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 offset-4">
            <form className="form-horizontal">
              <div className="form-group row">
                <label className="col-4">Department Name</label>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    id="DepartmentName"
                    name="DepartmentName"
                    placeholder="Enter department name"
                    onChange={this.handleChange}
                    value={this.state.departmentName}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-2 offset-4">
                  <input
                    type="submit"
                    className="btn btn-info"
                    onClick={this.UpdateDepartment}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default EditDepartment;
