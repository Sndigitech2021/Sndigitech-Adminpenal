import React, { useState } from "react";
import { ApiUrl, APIRequest } from "../../utils/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [statusCode, setStatusCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputType, setInputType] = useState("password");

  const [inputValue, setInputValue] = useState({
    email: "",
  });

  const [resetInputValue, setResetInputValue] = useState({
    email: "",
    OTP: "",
    password: "",
    confirmPassword: "",
  });

  const changeInputHandler = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    setResetInputValue({ ...resetInputValue, [e.target.name]: e.target.value });
  };

  const validatePasswords = () => {
    if (resetInputValue.password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const emailVerifyHandler = (e) => {
    e.preventDefault();
    if (inputValue.email === "") {
      toast.error("Email field is required");
    } else {
      emailVerifyAuth();
    }
  };

  const emailVerifyAuth = () => {
    setIsLoading(true);
    let config = {
      url: ApiUrl?.forgotPassword,
      method: "post",
      body: JSON.stringify({ email: inputValue.email }),
    };
    // console.log("asdasd", config);

    APIRequest(
      config,
      (res) => {
        setIsLoading(false);
        // console.log("emailVerifyAuth", res);

        if (!res?.error) {
          setStatusCode(true);
          setResetInputValue({ email: inputValue.email });
          toast.success(res?.message);
        } else {
          toast.error(res?.message);
        }
      },
      (err) => {
        setIsLoading(false);
        toast.error(err?.message);
      }
    );
  };

  const resetPasswordAuth = () => {
    setIsLoading(true);

    const validationError = validatePasswords();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    let config = {
      url: ApiUrl?.resetPassword,
      method: "post",
      body: JSON.stringify(resetInputValue),
    };
    // console.log("resetInputValueresetInputValue", config);

    APIRequest(
      config,
      (res) => {
        // console.log("12345678sdfghj", res);

        setIsLoading(false);
        if (!res?.error) {
          toast.success(res?.message);
          navigate("/");
        } else {
          toast.error(res?.message);
        }
      },
      (err) => {
        setIsLoading(false);
        toast.error(err?.message);
      }
    );
  };

  const resendOtp = () => {
    setIsLoading(true);

    const config = {
      url: ApiUrl?.forgotPassword,
      method: "post",
      body: {
        email: resetInputValue?.email,
      },
    };
    APIRequest(
      config,
      (res) => {
        console.log("resendOtp", res);
        setIsLoading(false);
        if (!res?.error) {
          toast.success(res?.message);
        } else {
          toast.error(res?.message);
        }
      },
      (err) => {
        setIsLoading(false);
        toast.error(err?.message);
      }
    );
  };

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    if (resetInputValue.email === "") {
      toast.error("Email field is required");
    } else if (resetInputValue.OTP === "") {
      toast.error("OTP field is required");
    } else if (resetInputValue.password === "") {
      toast.error("Password field is required");
    } else {
      resetPasswordAuth();
    }
  };

  return (
    <div className="wrapper">
      {!statusCode ? (
        <form onSubmit={emailVerifyHandler}>
          <h1>Forgot Password</h1>
          <div className="input_box">
            <div className="login">Email</div>
            <input
              type="text"
              name="email"
              // value={inputValue.email}
              onChange={(e) => changeInputHandler(e)}
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="btn">
            <button className="button" type="submit" disabled={isLoading}>
              {isLoading ? (
                <span>Processing...</span>
              ) : (
                <span>Request OTP</span>
              )}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={resetPasswordHandler}>
          <h1>Reset Password</h1>
          <div className="input_box">
            <div className="login">Email</div>
            <input
              onChange={(e) => changeInputHandler(e)}
              type="text"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="input_box">
            <div className="login">OTP</div>
            <input
              type={inputType}
              onChange={(e) => changeInputHandler(e)}
              placeholder="Enter Valid OTP"
              name="OTP"
            />
          </div>
          <div className="input_box">
            <div className="login">New Password</div>
            <input
              type={inputType}
              onChange={(e) => changeInputHandler(e)}
              placeholder="New Password"
              name="password"
            />
          </div>
          <div className="input_box">
            <div className="login">Confirm New Password</div>
            <input
              type={inputType}
              onChange={(e) => changeInputHandler(e)}
              placeholder="Confirm New Password"
              name="confirmPassword"
            />
          </div>
          <div className="Remember-forget">
            <label>
              <input type="checkbox" name="" />
              Remember me
            </label>
            <span
              onClick={resendOtp}
              // disabled={isLoading}
              style={{ color: "blue" }}
            >
              Resend OTP
            </span>
          </div>
          <div className="btn">
            <button className="button" type="submit" disabled={isLoading}>
              {isLoading ? (
                <span>Processing...</span>
              ) : (
                <span>Reset Password</span>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
