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
  border: 'none',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
  outline: 'none'

};


const AddCareer = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceData, setServiceData] = useState({
    category: "",
    // pageName: "",
  });

  const [data, setData] = useState({
    careerCategoryId: '',
    title: "",
    description: "",
    location: "",
    experience: "",
    employee_type: "",
    workplace_type: "",
    salary: "",
    job_specification: "",
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

  const handlerAddCategory = (e) => {

    e.preventDefault();
    // console.log("dataservice", serviceData);

    if (!serviceData.category) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append('category', serviceData.category);
    // formData.append('pageName', serviceData.pageName);

    const config = {
      url: ApiUrl.addCareer,
      method: 'POST',
      body: formData,
    };
    // console.log("configconfig", config);

    APIRequestWithFile(config,
      (res) => {
        console.log("response", res);
        toast.success(res.message);
        setServiceData({
          category: "",
          // pageName: "",
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

    // Validate form data
    const requiredFields = [
      "careerCategoryId",
      "title",
      "description",
      "location",
      "experience",
      "employee_type",
      "workplace_type",
      "salary",
      "job_specification",
    ];

    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    setIsLoading(true)



    const formData = new FormData();
    formData.append('careerCategoryId', data.careerCategoryId);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('location', data.location);
    formData.append('experience', data.experience);
    formData.append('employee_type', data.employee_type);
    formData.append('workplace_type', data.workplace_type);
    formData.append('salary', data.salary);
    formData.append('job_specification', data.job_specification);

    const config = {
      url: ApiUrl.addSubCareer,
      method: 'POST',
      body: formData,
    };
    console.log("configconfig", config);

    APIRequestWithFile(config,
      (res) => {
        console.log("handlerAddSubCategoryresponse", res);
        toast.success(res.message);
        setData({
          careerCategoryId: '',
          title: "",
          description: "",
          location: "",
          experience: "",
          employee_type: "",
          workplace_type: "",
          salary: "",
          job_specification: "",
        });
        handleClose();
        setIsLoading(false)
        // setFile(null);
      },
      (error) => {
        toast.error(error.message)
        setIsLoading(false)
      }
    )
  };

  return (
    <>
      <TitleChanger title="Add Career" />
      <BreadCrumb pageTitle="Add Career" />

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
                {/* <div className="name">
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
                </div> */}

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
              <label>Career CategoryId</label>
              <input
                type="text"
                name="careerCategoryId"
                value={data.careerCategoryId}
                onChange={handleInputChange}
                placeholder="Enter careerCategoryId Here"
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
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={data.location}
                onChange={handleInputChange}
                placeholder="Enter location Here"
              />
            </div>

            <div className="name">
              <label>Experience</label>
              <input
                type="text"
                name="experience"
                value={data.experience}
                onChange={handleInputChange}
                placeholder="Enter experience Here"
              />
            </div>

            <div className="name">
              <label>Employee type</label>
              <select
                name="employee_type"
                value={data.employee_type}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select Employee type
                </option>
                <option value="full_time">Full time</option>
                <option value="part_time">Part time</option>
              </select>
            </div>

            <div className="name">
              <label>Workplace type</label>
              <input
                type="text"
                name="workplace_type"
                value={data.workplace_type}
                onChange={handleInputChange}
                placeholder="Enter workplace_type Here"
              />

              <div className="name">
                <label>Salary</label>
                <input
                  type="text"
                  name="salary"
                  value={data.salary}
                  onChange={handleInputChange}
                  placeholder="Enter salary Here"
                />

                <div className="name">
                  <label>Job specification</label>
                  <input
                    type="text"
                    name="job_specification"
                    value={data.job_specification}
                    onChange={handleInputChange}
                    placeholder="Enter job_specification Here"
                  />

                </div>
              </div>

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
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default AddCareer;
