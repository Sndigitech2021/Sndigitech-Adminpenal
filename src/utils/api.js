import axios from "axios";
import ClearSession from "./ClearSession";
import AddStacks from "../component/Stacks/AddStacks";

// https://newapi.sndigitech.in/api/

export const BASEURL = "https://newapi.sndigitech.in";

const apiBaseUrl = `${BASEURL}/api/`;

const APIUserAdmin = `${apiBaseUrl}admin/`;

export const ApiUrl = {
  //Auth
  login: `${apiBaseUrl}user/login`,
  forgotPassword: `${apiBaseUrl}user/forgot`,
  resetPassword: `${apiBaseUrl}user/reset`,


  // services
  getAllServices: `${apiBaseUrl}service/admin`,
  addAllService: `${apiBaseUrl}service/add/admin`,
  updateService: `${apiBaseUrl}service/update/admin`,
  deleteService: `${apiBaseUrl}service/delete/admin`,

  // portfolio 
  AddAllCategory: `${apiBaseUrl}portfolio/development/add/admin`,
  AddAllSubCategory: `${apiBaseUrl}portfolio/sub/development/add/admin`,
  getAllCategory: `${apiBaseUrl}portfolio/development/all/admin`,

  addServiceDetails: `${apiBaseUrl}details/add/admin`,
  getServiceDetails: `${apiBaseUrl}details/admin`,
  updateServiceDetails: `${apiBaseUrl}details/update/admin`,
  deleteServiceDetails: `${apiBaseUrl}details/delete/admin`,

  AddStacks: `${apiBaseUrl}stack/add/admin`,
  AddSubStacks: `${apiBaseUrl}sub/stack/add/admin`,
  getStacks: `${apiBaseUrl}stack/all/admin`,
  getSubStacks: `${apiBaseUrl}sub/stack/all/admin`,
  updateStacks: `${apiBaseUrl}stack/update/admin`,
  updateSubStacks: `${apiBaseUrl}sub/stack/update/admin`,
  deleteStacks: `${apiBaseUrl}stack/delete/all/admin`,
  deleteSubStacks: `${apiBaseUrl}sub/stack/delete/admin`,
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

    console.log("config@@@@@@@@@@@@@@@@@@@@", data);
    axios(data)
      .then((res) => {
        console.log("asdsasdfdasf", res)
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
