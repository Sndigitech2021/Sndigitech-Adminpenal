import React, { useState } from "react";
import { toast } from "react-toastify";
import TitleChanger from "../../TitleChanger/TitleChanger";
import BreadCrumb from "../Breadcrumb/index";
import { APIRequest, APIRequestWithFile, ApiUrl } from "../../utils/api";
import axios from "axios";

const AddPortfolioDetails = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceData, setServiceData] = useState({
    category: "",
    sub_category: "",
    main_title: "",
    main_description: "",
    sub_title1: "",
    sub_description1: "",
    sub_title2: "",
    sub_description2: "",
    sub_title3: "",
    sub_description3: "",
    sub_title4: "",
    sub_description4: "",
    sub_title5: "",
    sub_description5: "",
    sub_title6: "",
    sub_description6: "",
    sub_title7: "",
    sub_description7: "",
    sub_title8: "",
    sub_description8: "",
    sub_title9: "",
    sub_description9: "",
    location: "",
    name: "",
    type: "",
    uploadedfile: null,
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
    setFile(uploadedFile || null);
    setServiceData((prev) => ({
      ...prev,
      uploadedfile: uploadedFile || null,
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

    // Replace empty or undefined values with null
    const sanitizedData = Object.entries(serviceData).reduce((acc, [key, value]) => {
      acc[key] = value || null;
      return acc;
    }, {});


    console.log("sanitizedDatasanitizedData", sanitizedData);

    const data = new FormData();
    // Object.entries(sanitizedData).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });

    console.log("formDataformData", data);

    data.append('listById', sanitizedData.id);
    data.append('category', sanitizedData.category);
    data.append('sub_category', sanitizedData.sub_category);
    data.append('main_title', sanitizedData.main_title);
    data.append('main_description', sanitizedData.main_description);
    data.append('sub_title1', sanitizedData.sub_title1);
    data.append('sub_description1', sanitizedData.sub_description1);
    data.append('sub_title2', sanitizedData.sub_title2);
    data.append('sub_description2', sanitizedData.sub_description2);
    data.append('sub_title3', sanitizedData.sub_title3);
    data.append('sub_description3', sanitizedData.sub_description3);
    data.append('sub_title4', sanitizedData.sub_title4);
    data.append('sub_description4', sanitizedData.sub_description4);
    data.append('sub_title5', sanitizedData.sub_title5);
    data.append('sub_description5', sanitizedData.sub_description5);
    data.append('sub_title6', sanitizedData.sub_title6);
    data.append('sub_description6', sanitizedData.sub_description6);
    data.append('sub_title7', sanitizedData.sub_title7);
    data.append('sub_description7', sanitizedData.sub_description7);
    data.append('sub_title8', sanitizedData.sub_title8);
    data.append('sub_description8', sanitizedData.sub_description8);
    data.append('sub_title9', sanitizedData.sub_title9);
    data.append('sub_description9', sanitizedData.sub_description9);


    const config = {
      url: ApiUrl.addServiceDetails,
      method: "POST",
      body: data,
    };

    console.log("configconfig", config);


    // setIsLoading(true);
    APIRequestWithFile(
      config,
      (res) => {
        console.log("response", res);
        toast.success(res.message);
        setServiceData({
          id: "",
          category: "",
          sub_category: "",
          main_title: "",
          main_description: "",
          sub_title1: "",
          sub_description1: "",
          sub_title2: "",
          sub_description2: "",
          sub_title3: "",
          sub_description3: "",
          sub_title4: "",
          sub_description4: "",
          sub_title5: "",
          sub_description5: "",
          sub_title6: "",
          sub_description6: "",
          sub_title7: "",
          sub_description7: "",
          sub_title8: "",
          sub_description8: "",
          sub_title9: "",
          sub_description9: "",
          location: "",
          name: "",
          type: "",
          uploadedfile: null,
        });
        setFile(null);
      },
      (error) => {
        console.error("Error:", error);
        toast.error(error.message || "Failed to add service.");
      }
    )


  }


  return (
    <>
      <TitleChanger title="Add Portfolio Details" />
      <BreadCrumb pageTitle="Add PortfolioDetails" />
      <div>
        <div className="product_page">
          <div className="basic_info">
            <div className="basic_info_con">
              <div className="basic_info_con1">
                {/* <div className="basic_info_con1"> */}
                <div className="name">
                  <label>Add Service ID</label>
                  <input
                    type="text"
                    name="id"
                    value={serviceData.id}
                    onChange={handleInputChange}
                    placeholder="Enter Service ID Here"
                  />
                </div>

                <div className="name">
                  <label>CATEGORY</label>
                  <select
                    name="category"
                    value={serviceData.category} // Bind the selected value to state
                    onChange={handleInputChange} // Update the state on selection change
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option value="overview_service">Overview Service</option>
                    <option value="overview_below_service">Overview Below Service</option>
                    <option value="why_services">Why Services</option>
                    <option value="whyChooseUs_service">Why Choose Us Service</option>
                    <option value="process_service">Process Service</option>
                    <option value="portfolio_service">Portfolio Service</option>
                    <option value="testimonial_service">Testimonial Service</option>
                    <option value="hero_section">Hero Section</option>
                    <option value="faq">FAQ</option>
                    <option value="about_section">About Section</option>
                    <option value="blockchain_section">Blockchain Section</option>
                    <option value="screen_section">Screen Section</option>
                    <option value="contribution_section">Contribution Section</option>
                    <option value="portfolio_details">Portfolio Details</option>
                    <option value="CTA">Call to Action (CTA)</option>
                    <option value="process">Process</option>
                    <option value="features">Features</option>
                    <option value="challenges">Challenges</option>
                    <option value="services">Services</option>
                    <option value="industry_process">Industry Process</option>
                    <option value="healthcare_software">Healthcare Software</option>
                  </select>
                </div>

                <div className="name">
                  <label>Sub Category</label>
                  <select
                    name="sub_category"
                    value={serviceData.sub_category} // Bind the selected value to state
                    onChange={handleInputChange} // Update the state on selection change
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option value="service_details">Service Details</option>
                    <option value="blog_details">Blog Details</option>
                    <option value="portfolio_details">Portfolio Details</option>
                    <option value="industry_details">Industry Details</option>
                    <option value="infographic_list">Infographic List</option>
                    <option value="business_list">Business List</option>
                  </select>
                </div>


                {/* Description Input */}
                <div className="name">
                  <label>Main Title</label>
                  <input
                    type="text"
                    name="main_title"
                    value={serviceData.main_title}
                    onChange={handleInputChange}
                    placeholder="Enter description Here"
                  />
                </div>
                <div className="name">
                  <label>Main Description</label>
                  <input
                    type="text"
                    name="main_description"
                    value={serviceData.main_description}
                    onChange={handleInputChange}
                    placeholder="Enter description Here"
                  />
                </div>
                <div className="name">
                  <label>Sub Title1</label>
                  <input
                    type="text"
                    name="sub_title1"
                    value={serviceData.sub_title1}
                    onChange={handleInputChange}
                    placeholder="Enter description Here"
                  />
                </div>
                <div className="name">
                  <label>Sub Description1 </label>
                  <input
                    type="text"
                    name="sub_description1"
                    value={serviceData.sub_description1}
                    onChange={handleInputChange}
                    placeholder="Enter description Here"
                  />
                </div>
                <div className="name">
                  <label>Sub Title2</label>
                  <input
                    type="text"
                    name="sub_title2"
                    value={serviceData.sub_title2}
                    onChange={handleInputChange}
                    placeholder="Enter description Here"
                  />
                </div>
                <div className="name">
                  <label>Sub Description2</label>
                  <input
                    type="text"
                    name="sub_description2"
                    value={serviceData.sub_description2}
                    onChange={handleInputChange}
                    placeholder="Enter description Here"
                  />
                </div>
                <div className="name">
                  <label>Sub Title3</label>
                  <input
                    type="text"
                    name="sub_title3"
                    value={serviceData.sub_title3}
                    onChange={handleInputChange}
                    placeholder="Enter description Here"
                  />
                </div>
                <div className="name">
                  <label>Sub Description3</label>
                  <input
                    type="text"
                    name="sub_description3"
                    value={serviceData.sub_description3}
                    onChange={handleInputChange}
                    placeholder="Enter description Here"
                  />
                </div>
                <div className="name">
                  <label>Sub Title4</label>
                  <input
                    type="text"
                    name="sub_title4"
                    value={serviceData.sub_title4}
                    onChange={handleInputChange}
                    placeholder="Enter description Here"
                  />
                </div>
                <div className="name">
                  <label>Sub Description4</label>
                  <input
                    type="text"
                    name="sub_description4"
                    value={serviceData.sub_description4}
                    onChange={handleInputChange}
                    placeholder="Enter description Here"
                  />
                </div>
                <div className="name">
                  <label>Sub Title5</label>
                  <input
                    type="text"
                    name="sub_title5"
                    value={serviceData.sub_title5}
                    onChange={handleInputChange}
                    placeholder="Enter description Here"
                  />
                </div>
                <div className="name">
                  <label>Sub Description5</label>
                  <input
                    type="text"
                    name="sub_description5"
                    value={serviceData.sub_description5}
                    onChange={handleInputChange}
                    placeholder="Enter description Here"
                  />
                </div>
                <div className="name">
                  <label>Sub Title6</label>
                  <input
                    type="text"
                    name="sub_title6"
                    value={serviceData.sub_title6}
                    onChange={handleInputChange}
                    placeholder="Enter description Here"
                  />
                </div>
                <div className="name">
                  <label>Sub Description6</label>
                  <input
                    type="text"
                    name="sub_description6"
                    value={serviceData.sub_description6}
                    onChange={handleInputChange}
                    placeholder="Enter description Here"
                  />
                </div>
                <div className="name">
                  <label>Sub Title7</label>
                  <input
                    type="text"
                    name="sub_title7"
                    value={serviceData.sub_title7}
                    onChange={handleInputChange}
                    placeholder="Enter description Here"
                  />
                </div>
                <div className="name">
                  <label>Sub Description7</label>
                  <input
                    type="text"
                    name="sub_description7"
                    value={serviceData.sub_description7}
                    onChange={handleInputChange}
                    placeholder="Enter description Here"
                  />
                </div>
                <div className="name">
                  <label>Sub Title8</label>
                  <input
                    type="text"
                    name="sub_title8"
                    value={serviceData.sub_title8}
                    onChange={handleInputChange}
                    placeholder="Enter description Here"
                  />
                </div>
                <div className="name">
                  <label>Sub Description8</label>
                  <input
                    type="text"
                    name="sub_description8"
                    value={serviceData.sub_description8}
                    onChange={handleInputChange}
                    placeholder="Enter description Here"
                  />
                </div>
                <div className="name">
                  <label>Sub Title9</label>
                  <input
                    type="text"
                    name="sub_title9"
                    value={serviceData.sub_title9}
                    onChange={handleInputChange}
                    placeholder="Enter description Here"
                  />
                </div>
                <div className="name">
                  <label>Sub Description9</label>
                  <input
                    type="text"
                    name="sub_description9"
                    value={serviceData.sub_description9}
                    onChange={handleInputChange}
                    placeholder="Enter description Here"
                  />
                </div>

                {/* Type Select */}
                {/* <div className="name">
                            <label>TYPE</label>
                            <select
                                name="type"
                                value={serviceData?.type}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>
                                    Select Type
                                </option>
                                <option value="Image">Image</option>
                                <option value="Video">Video</option>
                            </select>
                        </div> */}


                <div className="main_image">
                  <p>Upload File</p>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
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
                        style={{ maxWidth: "50%", height: "50%" }}
                      />
                    )}
                    {/* {isVideo(file) && (
                      <video
                        controls
                        style={{ maxWidth: "100%", height: "50%" }}
                      >
                        <source src={URL.createObjectURL(file)} type={file.type} />
                        Your browser does not support the video tag.
                      </video>
                    )} */}
                  </div>
                </div>

                {/* </div> */}

              </div>
            </div>

          </div>
          {/* </div>
      </div> */}

          {/* Add Button */}
          <div className="add_reset_btn">
            <div className="add_prod">
              <button onClick={handlerAddService} disabled={isLoading}>
                {isLoading ? "Loading..." : "Add Service"}
              </button>
            </div>
          </div>
        </div >
      </div >
    </>
  );
};

export default AddPortfolioDetails;
