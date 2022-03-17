import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const [currentEmployee, setCurrentEmployee] = useState(undefined);
  const [report, setReport] = useState([]);
  const [empid, setEmpId] = useState("");
  const [empDetails, setEmpDetails] = useState(undefined);
  const [salaryDetails, setSalaryDetails] = useState("Not Available!");

  const [jobrole, setJobRole] = useState("");
  const [monthlysalary, setmonthlysalary] = useState(0);
  const [yearlybonus, setyearlybonus] = useState(0);

  const navigate = useNavigate();

  const getDetails = () => {
    fetch("http://localhost:5000/employee/" + empid, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.message === "Success") {
          setEmpDetails(result.employee);
          setSalaryDetails(result.salary);
        }
      });
  };

  const addSalary = () => {
    fetch("http://localhost:5000/employee/addsalary", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: empDetails.employee_id,
        job_role: jobrole,
        monthly_salary: monthlysalary,
        yearly_bonus: yearlybonus,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  const updateSalary = () => {
    fetch("http://localhost:5000/employee/updatesalary", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: empDetails.employee_id,
        job_role: jobrole,
        monthly_salary: monthlysalary,
        yearly_bonus: yearlybonus,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  const deleteSalary = () => {};

  useEffect(() => {
    if (!localStorage.getItem("employee")) {
      navigate("/signin");
    } else {
      setCurrentEmployee(JSON.parse(localStorage.getItem("employee")));
    }
    fetch("http://localhost:5000/employee/get_basic_report", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setReport(result.report);
      });
  }, []);

  return (
    <div>
      This is the report page <br></br>Current Employee Details
      {currentEmployee !== undefined && (
        <div>
          Logged in as
          <h4>
            Name: {currentEmployee.first_name} {currentEmployee.last_name}
            <br></br>
            EmployeeId: {currentEmployee.employee_id}
          </h4>
        </div>
      )}
      <h4>All employee details</h4>
      {report.length == 0 && <p>Loading reports....</p>}
      {report.map((employee) => {
        return (
          <div>
            {employee.employee_id} {employee.first_name} {employee.last_name}{" "}
            {employee.dob}
          </div>
        );
      })}
      <h2>Get employee specific details</h2>
      Enter employee_id
      <input
        value={empid}
        onChange={(e) => {
          setEmpId(e.target.value);
        }}
      />
      <br></br>
      <button onClick={getDetails}>Get Details</button>
      {empDetails !== undefined && (
        <div>
          <h5>EmployeeId: {empDetails.employee_id}</h5>
          <h5>Name: {empDetails.first_name + " " + empDetails.last_name}</h5>
          {salaryDetails === "Not Available!" && (
            <div>
              Salary not Available...Enter details below to add one!
              <br></br>Enter job role
              <input
                value={jobrole}
                onChange={(e) => {
                  setJobRole(e.target.value);
                }}
              />
              <br></br>
              Enter monthly salary
              <input
                type="number"
                value={monthlysalary}
                onChange={(e) => {
                  setmonthlysalary(e.target.value);
                }}
              />
              <br></br>
              Enter yearly bonus
              <input
                type="number"
                value={yearlybonus}
                onChange={(e) => {
                  setyearlybonus(e.target.value);
                }}
              />
              <br></br>
              <button onClick={addSalary}>Add salary</button>
            </div>
          )}
          {salaryDetails !== "Not Available!" && (
            <div>
              <h6>Job role: {salaryDetails.job_role}</h6>
              <h6>Monthly salary: {salaryDetails.monthly_salary}</h6>
              <h6>Yealy Bonus: {salaryDetails.yearly_bonus}</h6>
              <h6>
                Annual salary:{" "}
                {salaryDetails.monthly_salary * 12 + salaryDetails.yearly_bonus}
              </h6>
              Fill the details below if you want to update the salary
              <br></br>Enter job role
              <input
                value={jobrole}
                onChange={(e) => {
                  setJobRole(e.target.value);
                }}
              />
              <br></br>
              Enter monthly salary
              <input
                type="number"
                value={monthlysalary}
                onChange={(e) => {
                  setmonthlysalary(e.target.value);
                }}
              />
              <br></br>
              Enter yearly bonus
              <input
                type="number"
                value={yearlybonus}
                onChange={(e) => {
                  setyearlybonus(e.target.value);
                }}
              />
              <br></br>
              <button onClick={updateSalary}>Update salary</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Report;
