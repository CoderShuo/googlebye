import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React, {Component} from 'react';

export function ModalTip(show,onHide,title,body) {
     return (
      <Modal
        show={show}
        onHide = {onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h4>{title}</h4>
          <p>
            {body}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export function ModalConfirm(show,handleClose,title,body,flag) {
    return (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>{                  
                  handleClose()
                  flag = false
                }}
                  >
                Cancel
              </Button>
              <Button variant="primary" onClick={
                  ()=>{
                    handleClose()
                    flag = true
                  }}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
  }