import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiUrl, APIRequest, APIRequestWithFile } from "../../utils/api";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getAdminDetails = () => {
    setIsLoading(true);
    let config = {
      url: ApiUrl?.getAdminDetails,
      method: "get",
    };
    APIRequest(
      config,
      (res) => {
        if (!res?.error) {
          // console.log("=======Response=========",res);
          setIsLoading(false);
          setImage(res?.user?.image);
          setFullName(res?.user?.fullName);
          setEmail(res?.user?.email);
          setMobile(res?.user?.mobile);
          // navigation("/app/login");
        }
      },
      (err) => {
        setIsLoading(false);
        if (err?.error) {
          //   console.log("=====Error=======", err?.message);
        }
      }
    );
  };
  const updateAdminProfile = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let formdata = new FormData();
    formdata.append("fullName", fullName);
    formdata.append("mobile", mobile);
    formdata.append("email", email);
    if (image) {
      formdata.append("image", image);
    }
    let config = {
      url: ApiUrl?.updateProfile,
      method: "post",
      body: formdata,
    };
    APIRequestWithFile(
      config,
      (res) => {
        console.log("user updated", res);
        toast.success(res?.message);
        setIsLoading(false);
        getAdminDetails();
      },
      (err) => {
        setIsLoading(false);
        console.log("erroere", err?.message);
        if (err?.error) {
          toast.error(err?.message);
        }
      }
    );
  };

  useEffect(() => {
    getAdminDetails();
  }, []);

  return (
    <>
      <div class="profile">
        <form>
          <h1>Account Details</h1>
          <div className="profile_img">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="fileInput"
            />
            <label htmlFor="fileInput">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  style={{
                    width: "10rem",
                    height: "10rem",
                    cursor: "pointer",
                    borderRadius: "50%",
                  }}
                  alt="Profile"
                />
              ) : (
                <img
                  src={image}
                  style={{
                    width: "10rem",
                    height: "10rem",
                    cursor: "pointer",
                    borderRadius: "50%",
                  }}
                  alt="Profile"
                />
              )}
            </label>
            <div className="edit_icon">
              <MdEdit />
            </div>
          </div>
          <div className="input_box">
            <div className="login">Name</div>
            <input
              type="name"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              id="typeName"
              placeholder="Enter Name"
            />
          </div>
          <div className="input_box">
            <div className="login">Email</div>
            <input
              type="name"
              value={email}
              id="typeEmail"
              placeholder="Enter Email"
              disabled
            />
          </div>
          <div className="input_box">
            <div className="login">Mobile</div>
            <input
              type="number"
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              id="typeMobile"
              placeholder="Enter Mobile"
            />
          </div>
          <div className="btn">
            <button
              onClick={updateAdminProfile}
              className="button"
              type="submit"
            >
              {isLoading ? <span>Processing...</span> : <span>Save</span>}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
