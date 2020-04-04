import React from "react";
import RedirectionManager from "../RedirectionManager/RedirectionManager";
import { formValidator, FormErrorComponent } from "../FormValidator";
import {Modal} from "react-bootstrap";

class NewOrgModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formdata: {
                name: {
                    value: "",
                    restrictions: {
                        pattern: /^.{3,}$/,
                    },
                    invalidMessage: "Name should be at least 3 characters long",
                    valid: true,
                },
            },
            redirection: {
                redirect: false,
                to: "/",
            }
        }
        this.formValidator = new formValidator();
        // Bind
        this.handleChange = this.handleChange.bind(this);
        this.validateAll = this.validateAll.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState(function(state, props) {
            state.formdata[name].value = value;
            return state;
        });
    }

    // validates all fields, returns true if all valid, false otherwise
    validateAll() {
        let arr = [];
        for (let key of Object.keys(this.state.formdata)) {
            arr.push(this.formValidator.validateField(key, this));
        }
        return arr.every(entry => entry);
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (!this.validateAll()) {
            return;
        }
        try {
            const formData = new FormData(document.getElementById("newOrgForm"));
            if (this.props.loginContext && this.props.loginContext.user_info && this.props.loginContext.user_info.id) {
                let response = await fetch("/organizations/add", {
                    method: "POST",
                    body: formData
                });
            if (response.ok) {
                // close the modal
                this.props.loginContext.checkLogin();
            }
            } else {
                throw new Error("No user context");
            }
        } catch (e) {
            console.error(e.message);
        }
    }

    render() {
        return (
            <RedirectionManager redirection={this.state.redirection}>
                {/* <Modal id={this.props.id} modalTitle={title} modalBody={body} modalFooter={footer}/> */}
                <Modal {...this.props} onHide={this.props.handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h5>Create new Organisation</h5>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form id="newOrgForm">
                            <div className="form-group">
                                <label htmlFor="newOrgName">Name</label>
                                <input required name="name" type="text" value={this.state.formdata.name.value} className="form-control" id="newOrgName" aria-describedby="New Organization name" onChange={this.handleChange}/>
                                <FormErrorComponent formdata={this.state.formdata}/>
                            </div>
                        </form>
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={this.props.handleClose}>Close</button>
                        <button type="button" className="btn btn-dark" onClick={this.handleSubmit}>Add</button>
                    </Modal.Footer>
                </Modal>
            </RedirectionManager>);
    }
}

export default NewOrgModal;
