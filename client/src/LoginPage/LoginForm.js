import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import FormValidator from "../FormValidator/FormValidator";
import "./LoginPage.css";


// Controlled form for logging in
class LoginForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            formdata: {
                username: {
                    value: "",
                    restrictions: {},
                    invalidMessage: "Username is not valid"
                },
                password: {
                    value: "",
                    restrictions: {},
                    invalidMessage: "Password is not valid"
                }
            },
            _submitable: true,
        }
        // binding
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSetSubmitable = this.onSetSubmitable.bind(this);
    }

    // function passed as callback to FormValidator that will set the form submitable or not
    onSetSubmitable(value) {
        this.setState({
            _submitable: value,
        });
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

    async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        // send data to the server
        try {
            let response = await fetch("/login", {
                method: "POST",
                body: formData,
            })
            if(response.ok) {
                // login successfull
                this.props.loginContext.onLogin(await response.json());
                this.props.history.push("/");
            } else {
                this.props.history.push("/login");
            }
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <form className="form-signin" onSubmit={this.handleSubmit}>
                <FormValidator formdata={this.state.formdata} setSubmitable={this.onSetSubmitable}>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    
                    <label htmlFor="username" className="sr-only">Login</label>
                    <input name="username" type="text" id="username" className="form-control mb-1" value={this.state.login} placeholder="Login" required autoFocus onChange={this.handleChange}/>
                    
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input name="password" type="password" id="password" className="form-control" value={this.state.password} placeholder="Password" required onChange={this.handleChange}/>
                </FormValidator>

                <button type="submit" disabled={!this.state._submitable} className="btn btn-lg btn-dark btn-block mt-3">Sign in</button>
                <Link to="/register" style={{textDecoration: "none"}}><button type="button" className="btn btn-lg btn-dark btn-block mt-3">Sign up</button></Link>
                <p className="mt-3 mb-3 text-muted">© Andrei Dimitrascu 2020</p>
            </form>
        );
    }
}

export default withRouter(LoginForm);