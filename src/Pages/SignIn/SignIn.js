import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [empid, setempid] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = () => {
    fetch("http://localhost:5000/employee/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employee_id: empid,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.message === "Success") {
          localStorage.setItem("employee", JSON.stringify(result.employee));
          navigate("/report");
        }
      });
  };

  return (
    <div>
      Enter your employee id
      <input
        value={empid}
        onChange={(e) => {
          setempid(e.target.value);
        }}
      />
      <br></br>
      Enter your password
      <input
        type={"password"}
        value={password}
        onChange={(e) => {
          setpassword(e.target.value);
        }}
      />
      <br></br>
      <button onClick={submitHandler}>Signin</button>
    </div>
  );
};

export default SignIn;
