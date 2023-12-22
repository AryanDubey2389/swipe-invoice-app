import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";

const ProductModal = (props) => {
  return (
    <>
      <Modal show={props.showModal} onHide={props.closeModal} size="lg" centered>
        <div id="productCapture">
          <div className="d-flex flex-row bg-light w-100 p-4 justify-content-between align-items-start">
            <div className="w-100">
              <h6 className="fw-bold text-secondary mb-1">Product ID: {props.info.id || ""}</h6>
              <h4 className="fw-bold my-2"> {props.info.name || "John Uberbacher"}</h4>
              <h6 className="fw-bold text-secondary mb-1">
                Price: {props.info.currency} {props.info.price || ""}
              </h6>
            </div>
            <div className="ms-4">
              <h4 className="fw-bold mt-1 mb-20">Category:</h4>
              <h6 className="fw-bold text-secondary">{props.info.category}</h6>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductModal;
