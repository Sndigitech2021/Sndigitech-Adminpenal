import React, { useState } from "react";
import { Modal, Box, Backdrop, Button, Typography } from "@mui/material";
import { APIRequest, APIRequestWithFile, ApiUrl } from "../../utils/api";
import { useEffect } from "react";
import { RiTimelineView } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
// import { toast } from "react-toastify";
import TitleChanger from "../../TitleChanger/TitleChanger";
import BreadCrumb from "../Breadcrumb/index";
import { DescriptionCell } from "../Description/DescriptionCell";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  backgroundColor: "background.paper",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  p: 4,
  border: "none !important",
  outline: "none",
  overflow: "auto",
  scrollbarWidth: "none",
  zIndex: "1100",
  height: "90%",
};
const style1 = {
  ...style,
  width: "40%",
  height: "40%",
};
const style2 = {
  ...style,
  width: "40%",
  height: "80%",
};

const AllStacks = () => {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [subId, setSubId] = useState("");
  const handleOpen = (id) => {
    setOpen(true);
    setSubId(id);
  }
  const handleClose = () => setOpen(false);

  const [stacks, setStacks] = useState({
    id: "",
    category: "",
  });
  const [updateSubStack, setUpdateSubStack] = useState();

  const [open1, setOpen1] = useState(false);
  const handleOpen1 = (category) => {
    setOpen1(true);
    setStacks(category);
  };
  const handleClose1 = () => setOpen1(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = (substack) => {
    setOpen2(true);
    setUpdateSubStack({
      ...substack,
      uploadedfile: null, // Reset file input initially
    });
  };
  const handleClose2 = () => setOpen2(false);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const [data, setData] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const isImage = (file) => {
    return file && file.type.startsWith("image/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateSubStack((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const uploadedfile = e.target.files[0];
    setFile(uploadedfile); // Update file state for preview
    setUpdateSubStack((prev) => ({
      ...prev,
      uploadedfile: uploadedfile,
    }));
  };

  const getAllServices = () => {
    setIsLoading(true);
    const config = {
      url: `${ApiUrl.getStacks}?page=${currentPage}&limit=${limit}`,
      method: "GET",
    };

    APIRequest(
      config,
      (res) => {
        console.log(res.data, "resresrestr");
        setIsLoading(false);
        setData(res?.data || []);
        const totalCount = res?.count || 0;
        setTotalPages(Math.ceil(totalCount / limit));
        getAllSubStacks();
      },
      (error) => {
        console.error(error);
        setIsLoading(false);
      }
    );
  };

  const getAllSubStacks = () => {

    // console.log("getAllSubStacksgetAllSubStacks", subId);

    setIsLoading(true);
    const config = {
      url: `${ApiUrl.getSubStacks}?stackCategoryId=${subId}`,
      method: "GET",
    };

    APIRequest(
      config,
      (res) => {
        console.log(res.data, "resresrestr");
        setIsLoading(false);
        setSubCategory(res?.data);
        const totalCount = res?.count || 0;
        setTotalPages(Math.ceil(totalCount / limit));

      },
      (error) => {
        console.error(error);
        setIsLoading(false);
      }
    );
  };


  const updateStackHandler = (id) => {

    console.log("stacksctegory", stacks.category);
    setIsLoading(true);

    if (!stacks.category) {
      toast.error("Stack name cannot be empty.");
      return;
    }

    const formdata = new FormData();
    formdata.append("category", stacks.category);

    const config = {
      url: `${ApiUrl.updateStacks}?id=${id}`,
      method: "PUT",
      body: formdata,
    };

    APIRequestWithFile(config,
      (res) => {
        console.log("stack", res);

        toast.success(res?.message || "Stack updated successfully.");
        setStacks({ category: "", id: "" });
        // setOpen1(false);
        handleClose1();
        getAllServices();
        setIsLoading(false);

      },
      (err) => {
        console.error("Update stack error:", err);
        toast.error(err?.message || "Failed to update stack.");
        setIsLoading(false);

      }
    );
  };

  const updateSubStackHandler = async () => {
    if (!updateSubStack.title || !updateSubStack.description || !updateSubStack.uploadedfile) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true); // Start loading state

    const formdata = new FormData();
    formdata.append("title", updateSubStack.title);
    formdata.append("description", updateSubStack.description);
    formdata.append("uploadedfile", updateSubStack.uploadedfile);

    const config = {
      url: `${ApiUrl.updateSubStacks}?id=${updateSubStack._id}`, // Ensure correct substack ID is used
      method: "PUT",
      body: formdata,
    };

    APIRequestWithFile(config,
      (res) => {
        console.log("Update response:", res);

        toast.success(res?.message || "Sub Stack updated successfully.");

        // Reset update state and close modal
        setUpdateSubStack({ title: "", description: "", uploadedfile: null });
        handleClose2();

        // Fetch updated substack data
        getAllSubStacks();
        setIsLoading(false); // Stop loading state

      },
      (err) => {
        console.error("Update substack error:", err);
        toast.error(err?.message || "Failed to update substack.");
        setIsLoading(err); // Stop loading state

      },
    );
  };



  const handleDeleteStack = (id) => {
    const config = {
      url: `${ApiUrl.deleteStacks}?id=${id}`,
      method: "DELETE",
    };

    APIRequest(
      config,
      (res) => {
        console.log(res.data, "Deleted Successfully");
        toast.success(res.message);
        getAllServices(); // Refresh data after deletion
      },
      (error) => {
        console.log(error, "Error in deletion");
        toast.error(error.message);
      }
    );
  };

  const handleDeleteSubStack = (id) => {
    const config = {
      url: `${ApiUrl.deleteSubStacks}?id=${id}`,
      method: "DELETE",
    };

    APIRequest(
      config,
      (res) => {
        console.log(res.data, "Deleted Successfully");
        toast.success(res.message);
        getAllSubStacks(); // Refresh data after deletion
        handleClose2();
      },
      (error) => {
        // console.error("Error in deletion:", error);
        toast.error(error.message);
        handleClose2();
      }
    );
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (pageNumber === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    getAllServices();
  }, [currentPage]);

  return (
    <>
      <TitleChanger title="All Stacks " />
      <BreadCrumb pageTitle="All Stacks" />

      <div className="table_container">
        <div className="table_info">
          <table>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Category ID</th>
                <th>Category</th>
                {/* <th>Sub-Category Title</th>
                <th>Sub-Category Sub-title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Type</th> */}
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                data.length > 0 ? (
                  data.map((category, index) => (
                    <tr key={category._id}>
                      <td>{(currentPage - 1) * limit + index + 1}</td>
                      <td>{category._id}</td>
                      <td>{category.category}</td>
                      <td>
                        <div
                          onClick={() => handleOpen(category._id)}
                          className="delet_button"
                        >
                          <RiTimelineView size={22} />
                        </div>
                      </td>
                      <td>
                        <div
                          className="delet_button"
                          onClick={() => handleOpen1(category)}
                        >
                          <i class="fa-solid fa-pen-to-square"></i>
                        </div>
                      </td>
                      <td>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteStack(category._id)}  // Add delete handler here
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No Data Found
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

        </div>
      </div >

      <div className="tabel_button">
        <button
          onClick={handlePageChange}
        >Previous</button>
        <p>Page 1 of 1</p>
        <button
          onClick={handlePageChange}
        >Next</button>
      </div>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <div className="table_container">
            <h3>ALL SUB STACKS</h3>
            <div className="table_info">
              <table>
                <thead>
                  <tr>
                    <th>S. no</th>
                    <th>Stack CategoryId</th>
                    <th>Sub Stack CategoryId</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    isLoading ? (
                      <tr >
                        <td colSpan='8' className="text-center">
                          Loading...
                        </td>
                      </tr>
                    ) : (

                      subCategory.map((service, index) => (
                        <tr key={index}>
                          <td>{(currentPage - 1) * limit + index + 1}</td>
                          <td>{service.stackCategoryId}</td>
                          <td>{service._id}</td>
                          <td>{service.title}</td>
                          {/* <td>{service.description}</td> */}
                          <td>
                            <DescriptionCell description={service?.description} />
                          </td>
                          <td>
                            <img
                              src={service.uploadedfile}
                              alt="Image"
                              width="50"
                              height="50"
                            />
                          </td>
                          <td>
                            <div
                              className="delet_button"
                              onClick={() => handleOpen2(service)}
                            >
                              <i class="fa-solid fa-pen-to-square"></i>
                            </div>
                          </td>
                          <td>
                            <td>
                              <div
                                className="delet_button"
                                onClick={() => handleDeleteSubStack(service._id)}
                              >
                                <i class="fa-solid fa-trash"></i>
                              </div>
                            </td>
                            {/* <td>
                              <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleDeleteSubStack(service._id)}  // Add delete handler here
                              >
                                Delete
                              </Button>
                            </td> */}
                          </td>
                        </tr>
                      ))
                    )
                  }
                </tbody>
              </table >
            </div >
          </div >
          <div className="tabel_button">
            <button
              onClick={handlePageChange}
            >Previous</button>
            <p>Page 1 of 1</p>
            <button
              onClick={handlePageChange}
            >Next</button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Stack
          </Typography>
          <div className="basic_info_con1">

            {/* Title Input */}
            <div className="name">
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={stacks.category}
                onChange={(e) => setStacks((prev) => ({ ...prev, category: e.target.value }))}
                placeholder="Enter category Here"
              />
            </div>


          </div>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="error"
              onClick={() => updateStackHandler(stacks._id)}
            >
              Update
            </Button>
            <Button variant="outlined" onClick={() => handleClose1()}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit SUB STACKS
          </Typography>
          <div className="basic_info_con1">
            <div className="name">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={updateSubStack?.title || ""}
                onChange={handleChange}
                placeholder="Enter Title Here"
              />
            </div>
            <div className="name">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={updateSubStack?.description || ""}
                onChange={handleChange}
                placeholder="Enter Description Here"
              />
            </div>

            <div className="main_image">
              <p>Upload File</p>
              <input
                id="file-upload"
                type="file"
                accept="image/*,video/*" // Allows only images and videos
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="file-upload" className="custom-file-upload">
                Upload Image
              </label>
              <div className="preview">
                {isImage(file) && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Uploaded Preview"
                    style={{ maxWidth: "50%", height: "50%" }}
                  />
                )}
              </div>
            </div>
          </div>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="error" onClick={updateSubStackHandler}>
              Update
            </Button>
            <Button variant="outlined" onClick={handleClose2}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>;


    </>
  );
};

export default AllStacks;
