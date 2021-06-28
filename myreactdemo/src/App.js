import React from "react";
import "./App.css";
import Home from "./Components/Home";
import Departments from "./Components/Department/Departments";
import Employees from "./Components/Employee/Employees";
import CreateEmployee from "./Components/Employee/CreateEmployee";
import EditEmployee from "./Components/Employee/EditEmployee";
import Layout from "./Components/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateDepartment from "./Components/Department/CreateDepartment";
import EditDepartment from "./Components/Department/EditDepartment";
function App() {
  return (
    <div className="App">
      <Router>
      <Layout />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/departments" component={Departments} />
          <Route path="/Createdepartment" component={CreateDepartment} />
          <Route path="/editdepartment/:id" component={EditDepartment} />
          <Route path="/employees" component={Employees} />
          <Route path="/createEmployee" component={CreateEmployee} />
          <Route path="/editEmployee/:id" component={EditEmployee} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
