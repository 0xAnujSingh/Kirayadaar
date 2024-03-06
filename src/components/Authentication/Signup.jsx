import React, { useState } from "react";
import { Input } from "../../../@/components/ui/input";
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

  const handleSubmission = (e) => {
    e.preventDefault();
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
    <div>
      <div className="w-full max-w-xs mx-auto space-y-4">
        <h1 className="text-center text-xl font-semibold">Sign Up</h1>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onChange={(e) => handleSubmission}
        >
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="name"
            placeholder="Name"
            type="text"
            onChange={(e) => {
              setValues((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            placeholder="Email"
            type="email"
            onChange={(e) => {
              setValues((prev) => ({ ...prev, email: e.target.value }));
            }}
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            name="password"
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setValues((prev) => ({ ...prev, password: e.target.value }));
            }}
          />

          <div className="footer ">
            <b className="error">{errorMsg}</b>
            <Button
              className="mb-2"
              onClick={handleSubmission}
              disabled={submitButtonDisabled}
            >
              Signup
            </Button>
            <p>
              Already have an account?{""}
              <span>
                <Link to="/login">Login</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
