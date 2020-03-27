import React from 'react';
import { formValidator, FormErrorComponent } from "../FormValidator";
import RedirectionManager from "../RedirectionManager/RedirectionManager";
import "./RegisterPage.css";


// Controlled form for logging in
class RegisterForm extends React.Component {
    
    constructor(props) {
        super(props);
        this._initialState = {
            redirection: {
                redirect: false,
                to: ""
            },
            formdata: {
                first_name: {
                    value: "",
                    restrictions: {
                        pattern: /^[a-zA-Z]{3,}$/,
                    },
                    invalidMessage: "First Name Should be at least 3 characters long. Special characters or numbers not allowed",
                    valid: true,
                },
                last_name: {
                    value: "",
                    restrictions: {
                        pattern: /^[a-zA-Z]{3,}$/,
                    },
                    invalidMessage: "Last Name Should be at least 3 characters long. Special characters or numbers not allowed",
                    valid: true,
                },
                login: {
                    value: "",
                    restrictions: {
                        pattern: /^[a-zA-Z0-9]{3,}$/,
                    },
                    invalidMessage: "Login should be at least 3 charaters long. No special characters allowed.",
                    valid: true,
                },
                password: {
                    value: "",
                    restrictions: {
                        // TODO: add better restrictions for password (at least one uppercase, lowercase character etc)
                        pattern: /^[a-zA-Z0-9]{6,}$/,
                    },
                    invalidMessage: "Password should be at least 6 charaters long. No special characters allowed.",
                    valid: true,
                },
                r_password: {
                    value: "",
                    restrictions: {
                        match: "password",
                    },
                    invalidMessage: "Passwords should match.",
                    valid: true,
                },
            }
        }
        this.state = this._initialState; 
        this.formValidator = new formValidator();
        // binding
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLostFocus = this.handleLostFocus.bind(this);
        this.validateAll = this.validateAll.bind(this);
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
            const formData = new FormData(e.target);
            let response = await fetch("/users/add", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                let data = await response.json();
                if (data.message) {
                    // TODO: show pop-up that user successfully created
                    console.log(data.message);
                }
                // redirect
                this.setState({
                    redirection: {
                        redirect: true,
                        to:"/login"
                    }
                });
            }
        } catch (e) {
            // TODO: show pop-up that error occured
            console.error(e.message);
        }
    }

    handleLostFocus(e) {
        if (e.relatedTarget && e.relatedTarget.tagName === "BUTTON") {
            this.validateAll();
        }
        const target = e.target || {};
        const name = target.name || "";
        this.formValidator.validateField(name, this);
    }

    render() {
        return (
            <RedirectionManager redirection={this.state.redirection}>
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
                    
                    <label htmlFor="username" className="sr-only">First Name</label>
                    <input name="first_name" type="text" id="first_name" className="form-control mb-1" value={this.state.first_name} placeholder="First Name" autoFocus onBlur={this.handleLostFocus} onChange={this.handleChange}/>

                    <label htmlFor="username" className="sr-only">Last Name</label>
                    <input name="last_name" type="text" id="last_name" className="form-control mb-1" value={this.state.last_name} placeholder="Last Name" onBlur={this.handleLostFocus} onChange={this.handleChange}/>

                    <label htmlFor="username" className="sr-only">Login</label>
                    <input name="login" type="text" id="username" className="form-control mb-1" value={this.state.login} placeholder="Login" onBlur={this.handleLostFocus} onChange={this.handleChange}/>
                    
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input name="password" type="password" id="password" className="form-control mb-1" value={this.state.password} placeholder="Password" onBlur={this.handleLostFocus} onChange={this.handleChange}/>
                    
                    <label htmlFor="r_password" className="sr-only">Repeat Password</label>
                    <input name="r_password" type="password" id="r_password" className="form-control" value={this.state.r_password} placeholder="Repeat Password" onBlur={this.handleLostFocus} onChange={this.handleChange}/>

                    <FormErrorComponent formdata={this.state.formdata}/>

                    <button className="btn btn-lg btn-dark btn-block mt-3">Sign up</button>
                    <p className="mt-3 mb-3 text-muted">© Andrei Dimitrascu 2020</p>
                </form>
            </RedirectionManager>
        );
    }
}

export default RegisterForm;