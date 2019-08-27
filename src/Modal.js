import React, { Component } from "react";
import "./Modal.scss";

const Modal = ({ handleClose, show, children, profileTitle, profileImage }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="modal-header">
          <img
            className="profilePicture"
            src={profileImage.picture ? profileImage.picture.medium : ""}
          />
          <h3>{profileTitle}</h3>
        <button className="closeBtn" onClick={handleClose}>X</button>
        </div>
        <div className="modal-content">{children}</div>
      </section>
    </div>
  );
};

export default Modal;
