import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [empid, setempid] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [dob, setdob] = useState("");
  const [contactno, setcontactno] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = () => {
    fetch("http://localhost:5000/employee/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employee_id: empid,
        password: password,
        first_name: fname,
        last_name: lname,
        dob: dob,
        contact_no: contactno,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.message === "Success") {
          navigate("/signin");
        }
      });
  };

  return (
    <div>
      This is the signup page<br></br>
      Enter your employee id
      <input
        value={empid}
        onChange={(e) => {
          setempid(e.target.value);
        }}
      />
      <br></br>
      Enter your first name
      <input
        value={fname}
        onChange={(e) => {
          setfname(e.target.value);
        }}
      />
      <br></br>
      Enter your last name
      <input
        value={lname}
        onChange={(e) => {
          setlname(e.target.value);
        }}
      />
      <br></br>
      Enter your date of birth
      <input
        type={"date"}
        value={dob}
        onChange={(e) => {
          setdob(e.target.value);
        }}
      />
      <br></br>
      Enter your contact no
      <input
        value={contactno}
        onChange={(e) => {
          setcontactno(e.target.value);
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
      <button onClick={submitHandler}>Signup</button>
    </div>
  );
};

export default SignUp;
