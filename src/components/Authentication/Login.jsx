import React, { useState } from "react";
import { Input } from "../../../@/components/ui/input";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { Button } from "../../../@/components/ui/button";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = (e) => {
    e.preventDefault();
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
    <div className="w-full max-w-xs mx-auto space-y-4">
      <h1 className="text-center text-xl font-semibold">Login</h1>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
        onSubmit={(e) => handleSubmission}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="Email"
            placeholder="Email"
            type="text"
            onChange={(e) => {
              setValues((prev) => ({ ...prev, email: e.target.value }));
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="password"
            placeholder="Password"
            //type="password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => {
              setValues((prev) => ({ ...prev, password: e.target.value }));
            }}
          />
        </div>
        <div className="flex items-center mb-2">
          <input
            className="w-4 mr-1 mb-2 flex items-center"
            id="checkbox"
            type="checkbox"
            value={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          <label className="  text-gray-700 text-sm font-bold mb-2 mr-2">
            Show Password
          </label>
        </div>

        <div className="footer">
          <b className="error"> {errorMsg}</b>
          <Button
            className="mb-2"
            disabled={submitButtonDisabled}
            onClick={handleSubmission}
          >
            Login
          </Button>
          <p>
            Already have an account?{""}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
