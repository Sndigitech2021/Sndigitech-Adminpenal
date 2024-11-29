import React, { useState } from "react";
import { toast } from "react-toastify";
import TitleChanger from "../../TitleChanger/TitleChanger";
import BreadCrumb from "../Breadcrumb/index";
import { APIRequest, APIRequestWithFile, ApiUrl } from "../../utils/api";

const AddDigitalService = () => {
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

  const isImage = (file) => {
    return file && file.type.startsWith("image/");
  };

  // const isVideo = (file) => {
  //   return file && file.type.startsWith("video/");
  // };


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
      <TitleChanger title="Add Digital Marketing Process" />
      <BreadCrumb pageTitle="Add Digital Marketing Process" />
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
                    {/* <option value="Video">Video</option> */}
                  </select>
                </div>

                {/* Category Select */}
                <div className="name">
                  <label>CATEGORY</label>
                  <select name="category" value={serviceData.category} // Bind the selected value to state
                    onChange={handleInputChange}
                  > // Update the state on selection change
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option value="industry_section">Industry Section</option>
                    <option value="digital_marketing">Digital Marketing</option>
                    <option value="digital_marketing_process">Digital Marketing Process</option>
                    <option value="360_marketing">360 Marketing</option>
                    <option value="development_process">Development Process</option>
                    <option value="it_services">IT Services</option>
                    <option value="news">News</option>
                    <option value="blog">Blog</option>
                    <option value="key_pointers">Key Pointers</option>
                    <option value="our_team">Our Team</option>
                    <option value="why_services">Why Services</option>
                    <option value="hero">Hero</option>
                    <option value="client_image">Client Image</option>
                    <option value="gallery_image">Gallery Image</option>
                    <option value="why_sndigitech_section">Why SNDigitech Section</option>
                  </select>
                </div>

                {/* Sub-Category Select */}
                <div className="name">
                  <label>Sub CATEGORY</label>
                  <select name="sub_category" // Ensure the name matches the field in the state
                    value={serviceData.sub_category} // Bind the selected value to the `sub_category` field in the state
                    onChange={handleInputChange}>
                    <option value="" disabled>
                      Select Sub Category
                    </option>
                    <option value="home_page">Home Page</option>
                    <option value="about_page">About Page</option>
                    <option value="service_list">Service List</option>
                    <option value="service_details">Service Details</option>
                    <option value="portfolio_list">Portfolio List</option>
                    <option value="portfolio_details">Portfolio Details</option>
                    <option value="blog_list">Blog List</option>
                    <option value="blog_details">Blog Details</option>
                    <option value="contact_us">Contact Us</option>
                    <option value="testimonial">Testimonial</option>
                    <option value="industry_page">Industry Page</option>
                    <option value="industry_details">Industry Details</option>
                    <option value="carrer_page">Career Page</option>
                  </select>
                </div>

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
                    Upload Image
                  </label>
                  <p>{file?.name}</p>
                  <div className="preview">
                    {isImage(file) && (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Uploaded Preview"
                        style={{ maxWidth: "200px", height: "200px" }}
                      />
                    )}
                    {/* {isVideo(file) && (
                      <video
                        controls
                        style={{ maxWidth: "200px", height: "200px" }}
                      >
                        <source src={URL.createObjectURL(file)} type={file.type} />
                        Your browser does not support the video tag.
                      </video>
                    )} */}
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

export default AddDigitalService;
