import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { APIRequestWithFile, ApiUrl, APIRequest } from '../../../utils/api';
import { toast } from 'react-toastify';
import { DescriptionCell } from '../../Description/DescriptionCell';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    backgroundColor: 'background.paper',
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    p: 4,
    border: 'none',
    outline: 'none',
    zIndex: 1100,
};

const editModalStyle = { ...modalStyle, height: '70%', overflow: 'auto' };
const deleteModalStyle = { ...modalStyle, height: '33%' };

const PortfolioService = ({ data, callApi, nullStateOverView }) => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedService, setSelectedService] = useState({});
    const [serviceData, setServiceData] = useState({});

    const handleFileChange = (e, fileKey) => {
        const uploadedFile = e.target.files[0]; // Get the first selected file
        setFile(uploadedFile); // Update the local file state (optional)

        setServiceData((prev) => ({
            ...prev,
            [fileKey]: uploadedFile || null, // Dynamically update the specific file key
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setServiceData((prev) => ({ ...prev, [name]: value }));
    };

    const isImage = (file) => {
        return file && file?.type?.startsWith("image/");
    };

    const handleEditModalOpen = (service) => {
        setServiceData(service);
        setFile(null);
        setOpenEditModal(true);
    };

    const handleEditModalClose = () => {
        setOpenEditModal(false);
        setServiceData({});
    };

    const handleDeleteModalOpen = (id) => {
        setSelectedService(id);
        setOpenDeleteModal(true);
    };

    const handleDeleteModalClose = () => {
        setOpenDeleteModal(false);
        setSelectedService({});
    };




    const handleUpdate = async () => {
        setIsLoading(true)

        const formData = new FormData();
        formData.append('sub_category', serviceData.sub_category)
        formData.append('main_title', serviceData.main_title)
        formData.append('main_description', serviceData.main_description)
        formData.append('sub_title1', serviceData.sub_title1)
        formData.append('sub_description1', serviceData.sub_description1)
        // formData.append('sub_title2', serviceData.sub_title2)
        // formData.append('sub_description2', serviceData.sub_description2)
        formData.append('type', serviceData.type)
        formData.append('uploadedfile1', serviceData.uploadedfile1)
        formData.append('uploadedfile3', serviceData.uploadedfile3)
        formData.append('uploadedfile4', serviceData.uploadedfile4)
        formData.append('uploadedfile5', serviceData.uploadedfile5)

        const config = {
            url: `${ApiUrl.updateServiceDetails}/?id=${serviceData._id}`,
            method: 'PUT',
            body: formData,
        };

        APIRequestWithFile(config,
            (res) => {
                setIsLoading(false)
                toast.success(res.message || 'Service updated successfully');
                refreshServices();
                handleEditModalClose();
            },
            (err) => {
                // console.error('Error updating service:', err);
                setIsLoading(false)
                toast.error(err?.message || 'Error updating service');
            },
        )

    };

    const handleDelete = async () => {
        isLoading(true)
        try {
            const config = {
                url: `${ApiUrl.deleteServiceDetails}/?id=${selectedService}`,
                method: 'DELETE',
            };

            await APIRequest(config);
            isLoading(false)
            toast.success('Service deleted successfully');
            await refreshServices();
            handleDeleteModalClose();
        } catch (error) {
            console.error('Error deleting service:', error);
            setIsLoading(false)
            toast.error(error.message || 'Error deleting service');

        }
    };

    const refreshServices = async () => {
        await nullStateOverView();
        await callApi();
    };


    return (
        <>
            <div>
                <h1 style={{ textAlign: 'center' }}>Portfolio Service</h1>
                <div className="table_container">
                    <div className="table_info">
                        <table>
                            <thead>
                                <tr>
                                    <th>S. No</th>
                                    <th>Sub Category</th>
                                    <th>Main Title</th>
                                    <th>Main Description</th>
                                    <th>Type</th>
                                    <th>Image1</th>
                                    <th>Image3</th>
                                    <th>Image4</th>
                                    <th>Image5</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            Loading...
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((service, index) => (
                                        <tr key={service._id || index}>
                                            <td>{index + 1}</td>
                                            <td>{service.sub_category}</td>
                                            <td>{service.main_title}</td>
                                            <td>
                                                <DescriptionCell description={service.main_description} />
                                            </td>
                                            <td>{service.type}</td>
                                            <td>
                                                {service.uploadedfile1 ? (
                                                    <img
                                                        src={service.uploadedfile1}
                                                        alt="Uploaded"
                                                        width="50"
                                                        height="50"
                                                    />
                                                ) : (
                                                    'No Image'
                                                )}
                                            </td>
                                            {/* <td>
                                                {service.uploadedfile2 ? (
                                                    <img
                                                        src={service.uploadedfile2}
                                                        alt="Uploaded"
                                                        width="50"
                                                        height="50"
                                                    />
                                                ) : (
                                                    'No Image'
                                                )}
                                            </td> */}
                                            <td>
                                                {service.uploadedfile3 ? (
                                                    <img
                                                        src={service.uploadedfile3}
                                                        alt="Uploaded"
                                                        width="50"
                                                        height="50"
                                                    />
                                                ) : (
                                                    'No Image'
                                                )}
                                            </td>
                                            <td>
                                                {service.uploadedfile4 ? (
                                                    <img
                                                        src={service.uploadedfile4}
                                                        alt="Uploaded"
                                                        width="50"
                                                        height="50"
                                                    />
                                                ) : (
                                                    'No Image'
                                                )}
                                            </td>
                                            <td>
                                                {service.uploadedfile5 ? (
                                                    <img
                                                        src={service.uploadedfile5}
                                                        alt="Uploaded"
                                                        width="50"
                                                        height="50"
                                                    />
                                                ) : (
                                                    'No Image'
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    className="edit_button"
                                                    onClick={() => handleEditModalOpen(service)}
                                                >
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="delete_button"
                                                    onClick={() => handleDeleteModalOpen(service._id)}
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <Modal
                open={openEditModal}
                onClose={handleEditModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={editModalStyle}>
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
                                <option value="Video">Video</option>
                            </select>
                        </div>


                        <div className="main_image">
                            <p>Upload File1</p>
                            <input
                                id="file-upload-1"
                                type="file"
                                accept="image/*,video/*"
                                onChange={(e) => handleFileChange(e, "uploadedfile1")}
                                style={{ display: "none" }}
                            />
                            <label htmlFor="file-upload-1" className="custom-file-upload">
                                Upload Image
                            </label>
                            <p>{serviceData.uploadedfile1?.name}</p>
                            <div className="preview">
                                {serviceData.uploadedfile1 && isImage(serviceData.uploadedfile1) && (
                                    <img
                                        src={URL.createObjectURL(serviceData.uploadedfile1)}
                                        alt="Uploaded Preview 1"
                                        style={{ maxWidth: "50%", height: "50%" }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="main_image">
                            <p>Upload File3</p>
                            <input
                                id="file-upload-2"
                                type="file"
                                accept="image/*,video/*"
                                onChange={(e) => handleFileChange(e, "uploadedfile3")}
                                style={{ display: "none" }}
                            />
                            <label htmlFor="file-upload-2" className="custom-file-upload">
                                Upload Image
                            </label>
                            <p>{serviceData.uploadedfile3?.name}</p>
                            <div className="preview">
                                {serviceData.uploadedfile3 && isImage(serviceData.uploadedfile3) && (
                                    <img
                                        src={URL.createObjectURL(serviceData.uploadedfile3)}
                                        alt="Uploaded Preview 1"
                                        style={{ maxWidth: "50%", height: "50%" }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="main_image">
                            <p>Upload File4</p>
                            <input
                                id="file-upload-3"
                                type="file"
                                accept="image/*,video/*"
                                onChange={(e) => handleFileChange(e, "uploadedfile4")}
                                style={{ display: "none" }}
                            />
                            <label htmlFor="file-upload-3" className="custom-file-upload">
                                Upload Image
                            </label>
                            <p>{serviceData.uploadedfile4?.name}</p>
                            <div className="preview">
                                {serviceData.uploadedfile4 && isImage(serviceData.uploadedfile4) && (
                                    <img
                                        src={URL.createObjectURL(serviceData.uploadedfile4)}
                                        alt="Uploaded Preview 1"
                                        style={{ maxWidth: "50%", height: "50%" }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="main_image">
                            <p>Upload File5</p>
                            <input
                                id="file-upload-4"
                                type="file"
                                accept="image/*,video/*"
                                onChange={(e) => handleFileChange(e, "uploadedfile5")}
                                style={{ display: "none" }}
                            />
                            <label htmlFor="file-upload-4" className="custom-file-upload">
                                Upload Image
                            </label>
                            <p>{serviceData.uploadedfile5?.name}</p>
                            <div className="preview">
                                {serviceData.uploadedfile5 && isImage(serviceData.uploadedfile5) && (
                                    <img
                                        src={URL.createObjectURL(serviceData.uploadedfile5)}
                                        alt="Uploaded Preview 1"
                                        style={{ maxWidth: "50%", height: "50%" }}
                                    />
                                )}
                            </div>
                        </div>

                    </div>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="error"
                            onClick={handleUpdate}
                        >
                            {isLoading ? 'Updating...' : 'Update'}
                        </Button>
                        <Button variant="outlined" onClick={handleEditModalClose}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Delete Modal */}
            <Modal open={openDeleteModal} onClose={handleDeleteModalClose}>
                <Box sx={deleteModalStyle}>
                    <Typography variant="h6">Confirm Deletion</Typography>
                    <Typography>
                        Are you sure you want to delete this service? This action cannot be undone.
                    </Typography>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="error" onClick={handleDelete}>
                            Confirm
                        </Button>
                        <Button variant="outlined" onClick={handleDeleteModalClose}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default PortfolioService;
