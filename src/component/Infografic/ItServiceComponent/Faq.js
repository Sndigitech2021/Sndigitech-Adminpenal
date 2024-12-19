import React, { useState } from 'react'
import { RiTimelineView } from "react-icons/ri";
import { Modal, Backdrop, Typography, Button, Box } from "@mui/material";
import { APIRequestWithFile, ApiUrl, APIRequest } from '../../../utils/api';
import { toast } from 'react-toastify';
import { DescriptionCell } from '../../Description/DescriptionCell';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    backgroundColor: "background.paper",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    p: 4,
    border: "none !important",
    outline: "none",
    // overflow: "auto",
    scrollbarWidth: "none",
    zIndex: "1100",
    height: "33%",
};

const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    backgroundColor: "background.paper",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    p: 4,
    border: "none !important",
    outline: "none",
    overflow: "auto",
    scrollbarWidth: "none",
    zIndex: "1100",
    height: "70%",
};

const Faq = ({ data, callApi, nullStateOverView }) => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedData, setSelectedData] = useState('');
    const handleOpen = (id) => {
        setOpen(true);
        setSelectedData(id)
    }
    const handleClose = () => setOpen(false);
    const [open1, setOpen1] = useState(false);
    const [serviceData, setServiceData] = useState({});
    const handleOpen1 = (data) => {
        setOpen1(true);
        setServiceData(data)
    }
    const handleClose1 = () => setOpen1(false);

    const isImage = (file) => {
        return file && file.type.startsWith("image/");
    };

    // const isVideo = (file) => {
    //     return file && file.type.startsWith("video/");
    // };
    // console.log("OverviewService", data);

    // const service = data && data.length > 0 ? data : [];
    const [service, setservice] = useState(data && data.length > 0 ? data : []);
    const handleFileChange = (e) => {
        const uploadedfile = e.target.files[0];
        setFile(uploadedfile);
        setServiceData((prev) => ({ ...prev, uploadedfile: uploadedfile }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setServiceData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {

        // console.log("service56789data", serviceData);

        // callApi()
        const formData = new FormData();
        formData.append('sub_category', serviceData.sub_category)
        formData.append('main_title', serviceData.main_title)
        formData.append('main_description', serviceData.main_description)
        // formData.append('sub_title1', serviceData.sub_title1)
        // formData.append('sub_description1', serviceData.sub_description1)
        // formData.append('sub_title2', serviceData.sub_title2)
        // formData.append('sub_description2', serviceData.sub_description2)
        formData.append('type', serviceData.type)
        formData.append('uploadedfile', serviceData.uploadedfile)
        const config = {
            url: `${ApiUrl.updateServiceDetails}/?id=${serviceData._id}`,
            method: "PUT",
            body: formData
        };
        console.log("config", config);

        APIRequestWithFile(
            config,
            (res) => {
                // console.log(res.data, "updated Successfully");
                toast.success(res.message);
                // getAllServices();
                // callApi()
                setFile(null)
                setServiceData({})
                handleClose1();

                CallApiFucntion()
                // callApi()
            },
            (error) => {
                // console.log(error, "Error in deletion");
                toast.error(error?.message || "Error updating service");
                handleClose();
            }
        );
    };

    const CallApiFucntion = async () => {
        await nullStateOverView()
        await callApi()
    }

    const handleDelete = (id) => {
        const config = {
            url: `${ApiUrl.deleteServiceDetails}/?id=${id}`,
            method: "DELETE",
        };

        APIRequest(
            config,
            (res) => {
                // console.log(res.data, "Deleted Successfully");
                toast.success(res.message);
                handleClose();
                setSelectedData('');
                // getAllServices("hero"); // Refresh data after deletion
            },
            (error) => {
                console.log(error, "Error in deletion");
                toast.error(error.message);
            }
        );
    };

    return (
        <>

            <div>
                <h1 style={{ textAlign: "center" }}>Faq</h1>

                <div className="table_container">
                    <div className="table_info">
                        <table>
                            <thead>
                                <tr>
                                    <th>S. no</th>
                                    <th>Sub Category</th>
                                    <th>Main Title</th>
                                    <th>Main Description</th>
                                    {/* <th>Sub Title1</th>
                                    <th>Sub Description1</th>
                                    <th>Sub Title2</th>
                                    <th>Sub Description2</th> */}
                                    <th>Type</th>
                                    <th>Image</th>
                                    {/* <th>View</th> */}
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

                                        service.map((service, index) => (
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <td>{service.sub_category}</td>
                                                <td>{service.main_title}</td>
                                                <td><DescriptionCell description={service.main_description} /></td>
                                                {/* <td>{service.sub_title1}</td>
                                                <td>{service.sub_description1}</td>
                                                <td>{service.sub_title2}</td>
                                                <td>{service.sub_description2}</td> */}
                                                <td>{service.type}</td>
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
                                                        onClick={() => handleOpen1(service)}
                                                    >
                                                        <i class="fa-solid fa-pen-to-square"></i>
                                                    </div>
                                                </td>
                                                <td>
                                                    <td>
                                                        <div
                                                            className="delet_button"
                                                            onClick={() => handleOpen(service._id)}
                                                        >
                                                            <i class="fa-solid fa-trash"></i>
                                                        </div>
                                                    </td>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table >
                    </div>
                </div >
            </div>

            <Modal
                open={open1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style1}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit
                    </Typography>
                    <div className="basic_info_con1">

                        {/* Title Input */}
                        <div className="name">
                            <label>Sub Category</label>
                            <input
                                type="text"
                                name="sub_category"
                                value={serviceData.sub_category}
                                onChange={handleInputChange}
                                placeholder="Enter Title Here"
                            />
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
                        {/* <div className="name">
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
                        </div> */}

                        {/* Type Select */}
                        <div className="name">
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
                                {/* <option value="Video">Video</option> */}
                            </select>
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

                    </div>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="error"
                            onClick={handleUpdate}
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
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirm Deletion
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete this section data? This action cannot be undone.
                    </Typography>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="error"
                            onClick={() => handleDelete(selectedData)}
                        >
                            Confirm
                        </Button>
                        <Button variant="outlined" onClick={() => handleClose()}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>

    );

}

export default Faq
