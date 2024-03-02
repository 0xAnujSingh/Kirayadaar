import React, { useState } from "react";
import { Input } from "../../../@/components/ui/input";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { Button } from "../../../@/components/ui/button";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Form } from "../../../@/components/ui/form";
import { Label } from "../../../@/components/ui/label";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.password) {
      setErrorMsg("Please fill all the fields");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        //console.log(res);
        
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
        console.log("err.-", err.message);
      });
  };

  return (
    <Form className="container" onSubmit={handleSubmission}>
      <div className="innerbox">
        <h1 className="heading">Login</h1>
        <Label className="label">Email</Label>
        <Input
          name="Email"
          placeholder="Email"
          type="text"
          onChange={(e) => {
            setValues((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <Label>Password</Label>
        <Input
          name="password"
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setValues((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
        <div className="footer">
          <b className="error"> {errorMsg}</b>
          <Button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Login
          </Button>
          <p>
            Already have an account?{""}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </Form>
  );
};

export default Login;
