import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Global from "../../Global.js";
import  EmployeeForm  from "./EmployeeForm";
class EditDepartment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeID: "",
      firstName: "",
      lastName: "",
      contactNo: "",
      gender: "",
      address: "",
      email: "",
      dob: "",
      departmentID: 0,
    };
  }

  UpdateDepartment = (model) => {
    debugger;
    if (!this.validateSubmit(model)) {
      alert("please enter department name");
      return false;
    } else {
      axios
        .put(Global.APIBaseURL + "Employees/" + model.employeeID,model)
        .then(
          (result) => {
            console.log(result.data);
            if (result.data.status === 200) {
              alert(result.data.message);
              this.props.history.push("/Employees");
            } else alert(result.data.message);
          },
          (error) => {
            alert("failed." + error);
            this.props.history.push("/Employees");
          }
        );
    }
  }

  validateSubmit=(model)=>{
    debugger;
  
    if(model.firstName==="")
    {
      alert("please enter first name");
      return false;
    }
  
    if(model.lastName==="")
    {
      alert("please enter last name");
      return false;
    }
    if(model.contactNo==="")
    {
      alert("please enter Contact No.");
      return false;
    }
    if(model.address==="")
    {
      alert("please enter address");
      return false;
    }
    if(model.dob===0)
    {
      alert("please enter DOB");
      return false;
    }
     return true;
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-8 offset-md-2 col-12">
            <h2 className="alert alert-info">Edit Employee</h2>
          </div>
        </div>
       <EmployeeForm employeeID={this.props.match.params.id}  btnTitle="Update" handleMethod={this.UpdateDepartment}/>
      </div>
    );
  }
}

export default EditDepartment;
