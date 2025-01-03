import React, { useState } from "react";
import { toast } from "react-toastify";
import TitleChanger from "../../TitleChanger/TitleChanger";
import BreadCrumb from "../Breadcrumb/index";
import { APIRequest, APIRequestWithFile, ApiUrl } from "../../utils/api";

const AddHeroSection = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
    type: "",
    category: "",
    uploadedfile: null,
    sub_category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
    setServiceData((prev) => ({
      ...prev,
      uploadedfile: uploadedFile,
    }));
  };



  // const handleFileChange = (event) => {
  //   const uploadedFile = event.target.files[0];
  //   if (uploadedFile) {
  //     setFile(uploadedFile);
  //   }
  // };

  const isImage = (file) => {
    return file && file.type.startsWith("image/");
  };

  const isVideo = (file) => {
    return file && file.type.startsWith("video/");
  };


  const handlerAddService = (e) => {
    e.preventDefault();
    // console.log("handlerAddServicehandlerAddService");

    if (!serviceData.title || !serviceData.description || !serviceData.type) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append('title', serviceData.title);
    formData.append('description', serviceData.description);
    formData.append('type', serviceData.type);
    formData.append('category', serviceData.category);
    formData.append('sub_category', serviceData.sub_category);
    // formData.append('location', serviceData.location);
    // formData.append('technology', serviceData.technology);
    // formData.append('sub_title', serviceData.sub_title);
    formData.append('uploadedfile', serviceData.uploadedfile);
    // formData.append('file', serviceData.file);

    const config = {
      url: ApiUrl.addAllService,
      method: 'POST',
      body: formData,
    };
    // console.log("configconfig", config);

    APIRequestWithFile(config,
      (res) => {
        console.log("response", res);
        toast.success(res.message);
        setServiceData({
          title: "",
          description: "",
          type: "",
          category: "",
          uploadedfile: null,
          sub_category: "",
          // location: "",
          // technology: "",
          // sub_title: "",
        });
        setFile(null);
      },
      (error) => {
        toast.error(error.message)
      }// No error handling for now
    )
  };

  return (
    <>
      <TitleChanger title="Add Hero Section" />
      <BreadCrumb pageTitle="Add Hero Section" />
      <div>
        <div className="product_page">
          <div className="basic_info">
            <div className="basic_info_con">
              <div className="basic_info_con1">
                {/* Title Input */}
                <div className="name">
                  <label>TITLE</label>
                  <input
                    type="text"
                    name="title"
                    value={serviceData.title}
                    onChange={handleInputChange}
                    placeholder="Enter Title Here"
                  />
                </div>

                {/* Sub Title Input */}
                {/* <div className="name">
                  <label>SUB TITLE</label>
                  <input
                    type="text"
                    name="sub_title"
                    value={serviceData.sub_title}
                    onChange={handleInputChange}
                    placeholder="Enter Sub-title Here"
                  />
                </div> */}

                {/* Description Input */}
                <div className="name">
                  <label>DESCRIPTION</label>
                  <input
                    type="text"
                    name="description"
                    value={serviceData.description}
                    onChange={handleInputChange}
                    placeholder="Enter description Here"
                  />
                </div>

                {/* Type Select */}
                <div className="name">
                  <label>TYPE</label>
                  <select
                    name="type"
                    value={serviceData.type}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Select Type
                    </option>
                    <option value="Image">Image</option>
                    <option value="Video">Video</option>
                  </select>
                </div>

                {/* Category Select */}
                <div className="name">
                  <label>CATEGORY</label>
                  <select name="category" value={serviceData.category} // Bind the selected value to state
                    onChange={handleInputChange}
                  > // Update the state on selection change
                    <option value="hero" disabled>
                      Select Category
                    </option>

                    <option value="hero">Hero</option>
                  </select>
                </div>

                {/* Sub-Category Select */}
                <div className="name">
                  <label>Sub Category</label>
                  <select name="sub_category" // Ensure the name matches the field in the state
                    value={serviceData.sub_category} // Bind the selected value to the `sub_category` field in the state
                    onChange={handleInputChange}>
                    <option value="" disabled>
                      Select Sub Category
                    </option>
                    <option value="home_page">Home Page</option>
                    <option value="about_page">About Page</option>

                  </select>
                </div>

                {/* Technology Input */}
                {/* <div className="name">
                  <label>TECHNOLOGY</label>
                  <input
                    type="text"
                    name="technology"
                    value={serviceData.technology}
                    onChange={handleInputChange}
                    placeholder="Enter Technology Here"
                  />
                </div> */}

                {/* Location Input */}
                {/* <div className="name">
                  <label>LOCATION</label>
                  <input
                    type="text"
                    name="location"
                    value={serviceData.location}
                    onChange={handleInputChange}
                    placeholder="Enter Location Here"
                  />
                </div> */}

                {/* File Upload */}
                <div className="main_image">
                  <p>Upload File</p>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*,video/*" // Allows only images and videos
                    onChange={handleFileChange}
                    style={{ display: "none" }} // Hides the default file input
                  />
                  <label htmlFor="file-upload" className="custom-file-upload">
                    Upload Image/Video
                  </label>
                  <p>{file?.name}</p>
                  <div className="preview">
                    {isImage(file) && (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Uploaded Preview"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    )}
                    {isVideo(file) && (
                      <video
                        controls
                        style={{ maxWidth: "100%", height: "auto" }}
                      >
                        <source src={URL.createObjectURL(file)} type={file.type} />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Add Button */}
          <div className="add_reset_btn">
            <div className="add_prod">
              <button onClick={handlerAddService} disabled={isLoading}>
                {isLoading ? "Loading..." : "Add Service"}
              </button>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default AddHeroSection;
