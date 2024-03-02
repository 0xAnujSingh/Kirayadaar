import React, { useState } from "react";
import { Input } from "../../../@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { Button } from "../../../@/components/ui/button";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../../../@/components/ui/form";

const Signup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.password) {
      setErrorMsg("Please fill all the fields");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        console.log(res);
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/login");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
        console.log("Error.-", err.message);
      });
  };
  return (
    <Form className="container" onChange={handleSubmission}>
      <div className="innerbox">
        <h1 className="heading">Sign Up</h1>
        <Label>Name</Label>
        <Input
          name="name"
          placeholder="Name"
          type="text"
          onChange={(e) => {
            setValues((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
        <Label>Email</Label>
        <Input
          name="email"
          placeholder="Email"
          type="email"
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
          <b className="error">{errorMsg}</b>
          <Button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </Button>
          <p>
            Already have an account?{""}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </Form>
  );
};

export default Signup;
