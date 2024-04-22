import Header from "../components/Header";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import { CiLogin as Login } from "react-icons/ci";

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


import { IoEyeSharp as ShowPassword } from "react-icons/io5";
import { FaEyeSlash as HidePassword } from "react-icons/fa6";


function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [data, setData] = useState([]);

  function changePasswordInputType() {
    if (passwordInputType === "text") {
      setPasswordInputType("password");
    } else {
      setPasswordInputType("text");
    }
  }

  function validate(password) {
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!strongPassword.test(password)) {
      setErrorMessage("Password must contain at least 8 characters, contain at least one lowercase letter, one uppercase letter, and one number.");
    } else {
      setErrorMessage("");
    }
  }

  function handlePasswordChange(event, type) {
    if (type === "password") {
        setPassword(event.target.value);
        validate(event.target.value);
    } else if (type === "confirmPassword") {
        setConfirmPassword(event.target.value);
      if (password === event.target.value) {
        setIsFormValid(true);
        const userData = { email, password };
        setData(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setErrorMessage("");
      } else {
        setIsFormValid(false);
        setErrorMessage("Passwords do not match"); 
      }
    }
  };


  return (
    <div>
      <Header title="Signup" icon={<Login />} to="/login" />
      <Card>
        <h1 className="text-2xl">Signup</h1>
        <hr className="h-1 w-32 bg-dark-green" />
        <form className="w-full">
          {/* email div */}
          <div className="w-full">
            Insert e-mail:
            <Input type="email" placeholder="example@test.com" value={email} onChange={event => setEmail(event.target.value)} />
          </div>

          {/* password div */}
          Insert password:
          <div className="w-full flex relative">
            <Input type={passwordInputType} placeholder="password" value={password} onChange={(event) => handlePasswordChange(event, "password")} />
            <span style={{ fontWeight: "bold", color: "red" }}>{errorMessage}</span>
            <span className="absolute right-3 top-3.5 cursor-pointer" onClick={changePasswordInputType}>
              {passwordInputType === "text" ? <HidePassword /> : <ShowPassword />}
            </span>
          </div>
          {/*Confirm password div*/}
          Confirm password:
          <div className="w-full flex relative">
            <Input
              type={passwordInputType}
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(event) => handlePasswordChange(event, "confirmPassword")}
              errorMessage={confirmPassword !== password ? "Passwords do not match" : ""}
            />            <span className="absolute right-3 top-3.5 cursor-pointer" onClick={changePasswordInputType}>
              {passwordInputType === "text" ? <HidePassword /> : <ShowPassword />}
            </span>
          </div>
          {/* Button div */}
          <div className="w-full">
            <Button title="Subscribe!" disabled={!isFormValid} onClick={() => navigate('/login')}  />
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Signup;