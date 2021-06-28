import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Global from "../../Global.js";
import  EmployeeForm  from "./EmployeeForm";

class CreateEmployee extends React.Component {
  AddEmployee = (newemployee) => {
    if(!this.validateSubmit(newemployee))
    {
      return false;
    }
    else
    {
      axios
        .post(Global.APIBaseURL + "Employees",newemployee)
        .then(
          (result) => {
            console.log(result.data);
            if (result.data.status === 201) {
              alert(result.data.message);
              this.props.history.push("/Employees");
            } else {
              alert(result.data.message);
            }
          },
          (error) => {
            alert("failed." + error);
            this.props.history.push("/Employees");
          }
        );
    }
   
  };
  
validateSubmit=(model)=>{

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
          <h2 className="alert alert-info">Add Employee</h2>
        </div>
      </div>
       <EmployeeForm btnTitle="Add" handleMethod={this.AddEmployee}/>
    </div>
    );
  }
}

export default CreateEmployee;
