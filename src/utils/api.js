import axios from "axios";
import ClearSession from "./ClearSession";

export const BASEURL = "http://16.171.135.55:4000";

const apiBaseUrl = `${BASEURL}/api/`;

const APIUserAdmin = `${apiBaseUrl}admin/`;

export const ApiUrl = {
  //Auth
  login: `${apiBaseUrl}user/login`,
  forgotPassword: `${apiBaseUrl}user/forgot`,
  resetPassword: `${apiBaseUrl}user/reset`,
  // resendOtp: `${APIUserAdmin}resend/otp`,
  // updatePassword: `${APIUserAdmin}change-password`,
  // verifyAccount: `${APIUserAdmin}verified/account`,
  // delete: `${APIUserAdmin}delete`,

  // //Transaction
  // getTransaction: `${apiBaseUrl}transaction/get/all`,

  // //Student
  // getStudent: `${APIUserAdmin}get/all/users`,
  // getStudentDetails: `${APIUserAdmin}get/student_details`,
  // deleteStudent: `${APIUserAdmin}delete/student_details`,

  // //Student
  // getTeacher: `${APIUserAdmin}get/all/users`,
  // getTeacherDetails: `${APIUserAdmin}get/student_details`,
  // deleteTeacher: `${APIUserAdmin}delete/teacher_details`,

  // //Admin
  // getAdminDetails: `${APIUserAdmin}getDetails`,
  // updateProfile: `${APIUserAdmin}update-profile`,

  // getAllCount: `${APIUserAdmin}get/all/counts`,
};

export const APIRequest = async (
  config = {},
  onSuccess,
  onError,
  noAuth = null
) => {
  const token = JSON.parse(sessionStorage?.getItem("data"));
  console.log("token is coming", token);

  try {
    let data = {};
    if (token && noAuth == null) {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        // timeout: 180000, // Wait for 5 seconds
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    }
    // console.log(data);
    axios(data)
      .then((res) => {
        // console.log(res, 'api--------');
        if (!res?.data?.error) {
          onSuccess(res?.data);
        } else {
          if (res?.data?.message === "Token expired please login again.") {
            ClearSession();
            window.location.reload();
          }
          onError(res?.data ? res.data : res);
        }
      })
      .catch((err) => {
        console.log(err, "catch--");
        if (err?.response?.data?.message === "message.") {
          ClearSession();
          window.location.reload();
        }
        onError(err?.response?.data ? err?.response.data : err?.response);
      });
  } catch (error) {
    console.log("error", error);
  }
};

export const APIRequestWithFile = async (config = {}, onSuccess, onError) => {
  const token = JSON.parse(sessionStorage?.getItem("data"));

  try {
    let data;
    if (token) {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
        },
      };
    }

    console.log("config", data);
    axios(data)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          console.log(res.data);
          onSuccess(res.data);
        }
      })
      .catch((err) => {
        onError(err?.response);
      });
  } catch (error) {
    console.log(error);
  }
};
