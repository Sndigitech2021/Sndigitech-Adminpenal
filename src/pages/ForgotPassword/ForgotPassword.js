import React, { useState } from "react";
import { ApiUrl, APIRequest } from "../../utils/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [statusCode, setStatusCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const [inputValue, setInputValue] = useState({
    email: "",
  });

  const [resetInputValue, setResetInputValue] = useState({
    email: "",
    otp: "1215",
    password: "",
    // confirmPassword: "",
  });

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    setResetInputValue({ ...resetInputValue, [name]: value });
    // setConfirmPassword({ [name]: value });
  };

  const validatePasswords = () => {
    if (inputValue.password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (inputValue.password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  const emailVerifyHandler = (e) => {
    e.preventDefault();
    if (inputValue.email === "") {
      toast.error("Email field is required");
    } else {
      forgetPassword();
    }
  };

  const forgetPassword = () => {
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

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    if (resetInputValue.email === "") {
      toast.error("Email field is required");
    } else if (resetInputValue.otp === "") {
      toast.error("OTP field is required");
    } else if (resetInputValue.password === "") {
      toast.error("Password field is required");
    } else {
      resetPasswordAuth();
    }
  };
  const resetPasswordAuth = () => {
    setIsLoading(true);

    const validationError = validatePasswords();
    if (validationError) {
      toast.error(validationError);
      // setIsLoading(false);
      return;
    }

    let config = {
      url: ApiUrl?.resetPassword,
      method: "post",
      body: JSON.stringify(resetInputValue),
    };
    console.log("resetInputValueresetInputValue", config);

    APIRequest(
      config,
      (res) => {
        console.log("12345678sdfghj", res);
        setIsLoading(false);
        if (!res?.error) {
          toast.success(res?.message);
          navigate("/");
          setIsLoading(false);
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
              type="email"
              name="email"
              value={resetInputValue.email}
              onChange={changeInputHandler}
              placeholder="Enter email address"
            />
          </div>
          <div className="input_box">
            <div className="login">OTP</div>
            <input
              type="text"
              name="otp"
              value={resetInputValue.otp}
              onChange={changeInputHandler}
              placeholder="Enter Valid OTP"
            />
          </div>
          <div className="input_box">
            <div className="login">New Password</div>
            <input
              type="password"
              name="password"
              value={resetInputValue.password}
              onChange={changeInputHandler}
              placeholder="New Password"
            />
          </div>
          <div className="input_box">
            <div className="login">Confirm New Password</div>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
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
