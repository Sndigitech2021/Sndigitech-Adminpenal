import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiUrl, APIRequest } from "../../utils/api";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const loginAuth = async () => {
    navigate("/app/dashboard");
    // setIsLoading(true);
    // let config = {
    //   url: ApiUrl?.login,
    //   method: "post",
    //   body: {
    //     email: inputValue?.email,
    //     password: inputValue?.password,
    //   },
    // };
    // console.log("sadasdas", config);

    // APIRequest(
    //   config,
    //   (res) => {
    //     console.log("login", res);

    //     if (!res?.error) {
    //       setIsLoading(false);
    //       sessionStorage.setItem("data", JSON.stringify(res?.token));
    //       navigate("/app/dashboard");
    //       toast.success(res?.message);
    //     }
    //   },
    //   (err) => {
    //     setIsLoading(false);
    //     if (err?.error) {
    //       toast.error(err?.message);
    //     }
    //   }
    // );
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (inputValue?.email === "") {
      toast.error("Email field is required");
    } else if (inputValue?.password === "") {
      toast.error("Password field is required");
    } else {
      loginAuth();
    }
  };

  const changeInputHandler = (e) => {
    console.log("asdasdsa", e?.target?.name);

    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div class="wrapper">
        <form onSubmit={SubmitHandler}>
          <div className="logoimg">
            <img src="/assets/images/sndigitechimg.png" alt="Logo" />
          </div>
          <h1>Login</h1>
          <div className="input_box">
            <div className="login">Login Id</div>
            <input
              onChange={(e) => changeInputHandler(e)}
              type="text"
              name="email"
              value={inputValue?.email}
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="input_box">
            <div className="login">Password</div>
            <input
              onChange={(e) => changeInputHandler(e)}
              type="text"
              value={inputValue?.password}
              name="password"
              placeholder="Enter Password"
            />
          </div>
          <div className="Remember-forget">
            <label>
              <input type="checkbox" name="" />
              Remember me
            </label>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <div className="btn">
            <button onClick={SubmitHandler} className="button" type="submit">
              {isLoading ? <span>Processing...</span> : <span>Login</span>}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;