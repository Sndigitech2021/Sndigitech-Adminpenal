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

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
        setServiceData((prev) => ({ ...prev, uploadedfile: uploadedFile }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setServiceData((prev) => ({ ...prev, [name]: value }));
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
        try {
            const formData = new FormData();
            Object.entries(serviceData).forEach(([key, value]) => {
                formData.append(key, value);
            });

            const config = {
                url: `${ApiUrl.updateServiceDetails}/?id=${serviceData._id}`,
                method: 'PUT',
                body: formData,
            };

            await APIRequestWithFile(config);
            toast.success('Service updated successfully');
            await refreshServices();
            handleEditModalClose();
        } catch (error) {
            console.error('Error updating service:', error);
            toast.error(error?.message || 'Error updating service');
        }
    };

    const handleDelete = async () => {
        try {
            const config = {
                url: `${ApiUrl.deleteServiceDetails}/?id=${selectedService}`,
                method: 'DELETE',
            };

            await APIRequest(config);
            toast.success('Service deleted successfully');
            await refreshServices();
            handleDeleteModalClose();
        } catch (error) {
            console.error('Error deleting service:', error);
            toast.error(error.message || 'Error deleting service');
        }
    };

    const refreshServices = async () => {
        await nullStateOverView();
        await callApi();
    };

    const isImage = (file) => file && file.type.startsWith('image/');

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
                                    <th>Image2</th>
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
                                            <td>
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
                                            </td>
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


                        {/* <div className="main_image">
                            <p>Upload File</p>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*,video/*" 
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
                                {isVideo(file) && (
                                    <video
                                        controls
                                        style={{ maxWidth: "100%", height: "50%" }}
                                    >
                                        <source src={URL.createObjectURL(file)} type={file.type} />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>
                        </div> */}

                    </div>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="error"
                            onClick={handleUpdate}
                        >
                            Update
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
