import React, { useState } from "react";
import { Modal, Backdrop } from "@mui/material";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import { RxCross1 } from "react-icons/rx";
import { Height } from "@mui/icons-material";
import { APIRequest, ApiUrl } from "../../utils/api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { RiTimelineView } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { PiShoppingCart } from "react-icons/pi";
import { IoPeopleOutline, IoPersonAddOutline } from "react-icons/io5";
import { FaHamburger } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import TitleChanger from "../../TitleChanger/TitleChanger";
import BreadCrumb from "../Breadcrumb/index";

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
  overflow: "auto",
  scrollbarWidth: "none",
  zIndex: "1100",
  height: "90%",
};

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [allCounts, setAllCounts] = useState("");

  const limit = 10;

  const [open, setOpen] = useState(false);
  const handleOpen = (transaction) => {
    setSelectedTransaction(transaction);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const getTransactions = () => {
    setIsLoading(true);
    let config = {
      url: `${ApiUrl?.getTransaction}?limit=${limit}&page=${currentPage}&status=All`,
      method: "GET",
    };
    APIRequest(
      config,
      (res) => {
        if (!res?.error) {
          console.log("Transactions response:", res?.data);
          setTransactions(res?.data);

          const totalCount = res?.count;
          setTotalPages(Math.ceil(totalCount / limit));
          setIsLoading(false);
        }
      },
      (err) => {
        // console.log("Error fetching transaction details:", err?.message);
        setIsLoading(false);
      }
    );
  };

  const getCountDetails = () => {
    setIsLoading(true);
    let config = {
      url: ApiUrl?.getAllCount,
      method: "GET",
    };
    APIRequest(
      config,
      (res) => {
        if (!res?.error) {
          // console.log("res", res);
          setIsLoading(false);
          setAllCounts(res);
        }
      },
      (err) => {
        // console.log("Error fetching count details:", err?.message);
        setIsLoading(false);
      }
    );
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    getTransactions();
    getCountDetails();
  }, [currentPage]);

  return (
    <>
      <TitleChanger title="Dashboard" />
      <BreadCrumb pageTitle="Transaction" />
      <div>
        <div className="order_info">
          <div className="orders">
            <div className="icon">
              <GrTransaction />
            </div>
            <div className="content">
              <p>Total Transactions</p>
              <span>₹ {(allCounts?.transactionAmount / 100).toFixed(2)}</span>
            </div>
          </div>

          <div className="orders">
            <div className="icon">
              <IoPersonAddOutline />
            </div>
            <div className="content">
              <p>All Student</p>
              <span>{allCounts?.studentCount}</span>
            </div>
          </div>
          <div className="orders">
            <div className="icon">
              <IoPeopleOutline />
            </div>
            <div className="content">
              <p>All Teacher</p>
              <span>{allCounts?.teacherCount}</span>
            </div>
          </div>
        </div>
        <div className="table_info">
          <table>
            <thead>
              <tr>
                <th>S no.</th>
                <th>Invoice No.</th>
                <th>Amount</th>
                <th>Order ID</th>
                <th>Status</th>
                <th>Payment ID</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={transaction?._id || index}>
                    <td>{(currentPage - 1) * limit + index + 1}.</td>
                    <td>{transaction?.invoiceNo || ""}</td>
                    <td>₹ {(transaction?.amount / 100).toFixed(2)}</td>
                    <td>{transaction?.orderId || ""}</td>
                    <td>{transaction?.status || ""}</td>
                    <td>{transaction?.paymentId || ""}</td>
                    <td>
                      <div className="actions">
                        <div
                          className="delete"
                          onClick={() => handleOpen(transaction)}
                        >
                          <RiTimelineView />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No transaction data available</td>
                </tr>
              )}
            </tbody>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form>
                  <div className="main-client">
                    <div className="subclient1">
                      <h2>Transaction Details</h2>
                      <strong onClick={handleClose}>
                        <RxCross1 />
                      </strong>
                    </div>

                    <div className="subclient2">
                      {selectedTransaction && (
                        <>
                          <div className="subclient21">
                            <label>Invoice No.</label>
                            <input
                              type="text"
                              value={selectedTransaction.invoiceNo}
                              disabled
                            />
                          </div>
                          <div className="subclient21">
                            <label>Amount</label>
                            <input
                              type="text"
                              value={selectedTransaction.amount}
                              disabled
                            />
                          </div>
                          <div className="subclient21">
                            <label>Order ID</label>
                            <input
                              type="text"
                              value={selectedTransaction.orderId}
                              disabled
                            />
                          </div>
                          <div className="subclient21">
                            <label>Status</label>
                            <input
                              type="text"
                              value={selectedTransaction.status}
                              disabled
                            />
                          </div>
                          <div className="subclient21">
                            <label>Payment ID</label>
                            <input
                              type="text"
                              value={selectedTransaction.paymentId}
                              disabled
                            />
                          </div>
                          {/* <div className="subclient21">
                            <label>Created At</label>
                            <input
                              type="text"
                              value={new Date(
                                selectedTransaction.createdAt
                              ).toLocaleString()}
                              disabled
                            />
                          </div> */}
                        </>
                      )}
                    </div>
                  </div>
                </form>
              </Box>
            </Modal>
          </table>
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
