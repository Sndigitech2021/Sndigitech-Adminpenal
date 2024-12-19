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
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
  outline: 'none'

};


const AddStacks = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setcategory] = useState("");

  const [data, setData] = useState({
    stackCategoryId: "",
    title: "",
    description: "",
    uploadedfile: null,
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
      setData((prev) => ({
        ...prev,
        uploadedfile: uploadedFile,
      }));
    }
  };

  const isImage = (file) => {
    return file && file.type.startsWith("image/");
  };

  const handlerAddStack = (e) => {
    e.preventDefault();


    // console.log("sanitizedDatasanitizedData", category);

    const formData = new FormData();
    formData.append('category', category);

    // console.log("formDataformData", data);


    const config = {
      url: ApiUrl.AddStacks,
      method: "POST",
      body: formData,
    };

    // console.log("configconfig", config);

    // setIsLoading(true);
    APIRequestWithFile(
      config,
      (res) => {
        console.log("response", res);
        setIsLoading(false)
        toast.success(res.message);
        setcategory('');
      },
      (error) => {
        console.error("Error:", error);
        toast.error(error.message || "Failed to add service.");
      }
    )


  }

  const handlerAddSubStack = (e) => {
    e.preventDefault();

    console.log("handlerAddSubStackhandlerAddSubStack", data);


    if (!data.stackCategoryId || !data.title || !data.description || !data.uploadedfile) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true); // Set loading state

    const formData = new FormData();
    formData.append("stackCategoryId", data.stackCategoryId);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("uploadedfile", data.uploadedfile);

    const config = {
      url: ApiUrl.AddSubStacks,
      method: "POST",
      body: formData,
    };

    APIRequestWithFile(
      config,
      (res) => {
        toast.success(res.message);
        setIsLoading(false);
        setData({
          stackCategoryId: "",
          title: "",
          description: "",
          uploadedfile: null,
        });
        handleClose();
        setFile(null);
      },
      (error) => {
        toast.error(error.message);
        setIsLoading(false); // Set loading state
      }
    )
  };


  return (
    <>
      <TitleChanger title="Add Stacks" />
      <BreadCrumb pageTitle="Add Stacks" />

      <div className="add_buttn">
        <div
          className="add_reset_bt"
        >
          <div className="add_prod">
            <button onClick={handleOpen} disabled={isLoading}>
              Add Sub-Stack
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

                {/* Title Input */}
                <div className="name">
                  <label>Stack</label>
                  <input
                    type="text"
                    // name="category"
                    value={category}
                    onChange={(e) => setcategory(e.target.value)}
                    placeholder="Enter  Stack Here"
                  />
                </div>

              </div>
            </div>
          </div>

          {/* Add Button */}
          <div className="add_reset_btn">
            <div className="add_prod">
              <button onClick={handlerAddStack} disabled={isLoading}>
                {isLoading ? "Loading..." : "Add Stack"}
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
            <h3>Add Sub Stack</h3>
            {/* Title Input */}
            <div className="name">
              <label>Stack Category Id</label>
              <input
                type="text"
                name="stackCategoryId"
                value={data.stackCategoryId}
                onChange={handleInputChange}
                placeholder="Enter stackCategoryId Here"
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
                onClick={handlerAddSubStack}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "save"}
              </button>
            </div>
            {/* </div> */}
            {/* </div> */}

          </div>
        </Box>
      </Modal >
    </>
  );
};

export default AddStacks;
