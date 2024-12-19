import React, { useState } from "react";
import { toast } from "react-toastify";
import TitleChanger from "../../TitleChanger/TitleChanger";
import BreadCrumb from "../Breadcrumb/index";
import { APIRequest, APIRequestWithFile, ApiUrl } from "../../utils/api";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: '425px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
  outline: 'none'

};


const AddPortfolioProjects = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceData, setServiceData] = useState({
    category: "",
    pageName: "",
  });

  const [data, setData] = useState({
    portfolioCategoryId: '',
    title: "",
    description: "",
    uploadedfile: "",
    sub_title: "",
    type: "",
    date: "",
    technology: "",
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
    setData((prev) => ({
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


  const handlerAddCategory = (e) => {

    e.preventDefault();
    console.log("dataservice", serviceData);

    if (!serviceData.category || !serviceData.pageName) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append('category', serviceData.category);
    formData.append('pageName', serviceData.pageName);

    const config = {
      url: ApiUrl.AddAllCategory,
      method: 'POST',
      body: formData,
    };
    console.log("configconfig", config);

    APIRequestWithFile(config,
      (res) => {
        console.log("response", res);
        toast.success(res.message);
        setServiceData({
          category: "",
          pageName: "",
        });
        // setFile(null);
      },
      (error) => {
        toast.error(error.message)
      }
    )
  };



  const handlerAddSubCategory = (e) => {
    e.preventDefault();
    console.log("handlerAddCategoryhandlerAddCategory", data);

    // if (!data.portfolioCategoryId || !data.title || !data.description || !data.uploadedfile || !data.sub_title || !data.type) {
    //   toast.error("Please fill in all required fields.");
    //   return;
    // }

    const formData = new FormData();
    formData.append('portfolioCategoryId', data.portfolioCategoryId);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('uploadedfile', data.uploadedfile);
    formData.append('sub_title', data.sub_title);
    formData.append('type', data.type);
    formData.append('date', data.date);
    formData.append('technology', data.technology);

    const config = {
      url: ApiUrl.AddAllSubCategory,
      method: 'POST',
      body: formData,
    };
    console.log("configconfig", config);

    APIRequestWithFile(config,
      (res) => {
        console.log("handlerAddSubCategoryresponse", res);
        toast.success(res.message);
        setData({
          portfolioCategoryId: "",
          title: "",
          description: "",
          uploadedfile: "",
          sub_title: "",
          type: "",
          date: "",
          technology: "",
        });
        setFile(null);
      },
      (error) => {
        toast.error(error.message)
      }
    )
  };

  return (
    <>
      <TitleChanger title="Add Portfolio Projects" />
      <BreadCrumb pageTitle="Add Portfolio Projects" />

      <div className="add_buttn">
        <div
          className="add_reset_bt"
        >
          <div className="add_prod">
            <button onClick={handleOpen} disabled={isLoading}>
              Add Sub-Category
            </button>
          </div>
        </div>
      </div>


      <div>
        <div
          className="product_page"
        >

          <div className="basic_info">
            <div className="basic_info_con">

              <div className="basic_info_con1">

                {/* Category Select */}
                <div className="name">
                  <label>Page Name</label>
                  <select
                    name="pageName"
                    value={serviceData.pageName} // Bind the selected value to state
                    onChange={(e) => setServiceData({ ...serviceData, pageName: e.target.value })}
                  > // Update the state on selection change
                    <option value="" disabled>
                      Select Page Name
                    </option>
                    <option value="portfolio_list">portfolio list</option>
                    <option value="industry_list">industry list</option>
                    <option value="blog_list">blog list</option>
                    <option value="new_list">new list</option>
                  </select>
                </div>

                {/* Title Input */}
                <div className="name">
                  <label>CATEGORY</label>
                  <input
                    type="text"
                    name="category"
                    value={serviceData.category}
                    onChange={(e) => setServiceData({ ...serviceData, category: e.target.value })}
                    placeholder="Enter category Here"
                  />
                </div>

              </div>
            </div>
          </div>

          {/* Add Button */}
          <div className="add_reset_btn">
            <div className="add_prod">
              <button onClick={handlerAddCategory} disabled={isLoading}>
                {isLoading ? "Loading..." : "Add Service"}
              </button>
            </div>
          </div>
        </div>
      </div >

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            className="basic_info_con1"
          >
            {/* Title Input */}
            <div className="name">
              <label>portfolioCategoryId</label>
              <input
                type="text"
                name="portfolioCategoryId"
                value={data.portfolioCategoryId}
                onChange={handleInputChange}
                placeholder="Enter portfolioCategoryId Here"
              />
            </div>
            <div className="name">
              <label>TITLE</label>
              <input
                type="text"
                name="title"
                value={data.title}
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
                value={data.description}
                onChange={handleInputChange}
                placeholder="Enter description Here"
              />
            </div>

            <div className="name">
              <label>DATE</label>
              <input
                type="text"
                name="date"
                value={data.date}
                onChange={handleInputChange}
                placeholder="Enter date Here"
              />
            </div>
            <div className="name">
              <label>TECHNOLOGY</label>
              <input
                type="text"
                name="technology"
                value={data.technology}
                onChange={handleInputChange}
                placeholder="Enter technology Here"
              />
            </div>

            {/* Type Select */}
            <div className="name">
              <label>TYPE</label>
              <select
                name="type"
                value={data.type}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="Image">Image</option>
                {/* <option value="Video">Video</option> */}
              </select>
            </div>

            <div className="name">
              <label>Sub title</label>
              <input
                type="text"
                name="sub_title"
                value={data.sub_title}
                onChange={handleInputChange}
                placeholder="Enter sub_title Here"
              />
              {/* <select name="sub_category" // Ensure the name matches the field in the state
                value={data.sub_title} // Bind the selected value to the `sub_category` field in the state
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
              </select> */}
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

            {/* <div className="add_buttn"> */}

            <div
              className="add_reset_bt"
            >
              {/* <div className="add_prod"> */}
              <button
                style={{ marginTop: "10px", marginLeft: '0px' }}
                onClick={handlerAddSubCategory}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "save"}
              </button>
            </div>
            {/* </div> */}
            {/* </div> */}

          </div>
        </Box>
      </Modal>
    </>
  );
};

export default AddPortfolioProjects;
