import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Global from "./../.././Global.js";
class CreateDepartment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentName: "",
    };

    this.refdepartmentName = React.createRef();
  }

  AddDepartment = (e) => {
    debugger;
    e.preventDefault();
    if(!this.validateSubmit())
    {
      alert("please enter department name");
      return false;
    }
    else
    {
      debugger;
      axios
      .post(Global.APIBaseURL + "Departments", {
        departmentName: this.state.departmentName,
        departmentID: 0,
      },{headers: {
        'Content-Type': 'application/json',
    }})
      .then(
        (result) => {
          debugger;
          console.log(result.data);
          if (result.data.status === 201) {
            alert(result.data.message);
            this.props.history.push("/departments");
          }
          else
          {
            alert(result.data.message);
          }
        },
        (error) => {
          debugger;
          alert("failed." + error);
          this.props.history.push("/departments");
        }
      );
    }
   
  };
validateSubmit=()=>{
  debugger;

  if(this.state.departmentName==="")
  {
    this.refdepartmentName.current.focus();
    return false;

  }

   return true;
}
  handleChange = (e) => {
    this.setState({ departmentName: e.target.value });
  };

  render() {
    return (
      <>
       <div className="row">
        <div className="col-md-6 offset-md-3 col-12">
          <h2 className="alert alert-info">Add Department</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3 col-12">
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
                  ref={this.refdepartmentName}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-2 offset-4">
                <input
                  type="submit"
                  className="btn btn-info"
                  onClick={this.AddDepartment}
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

export default CreateDepartment;
