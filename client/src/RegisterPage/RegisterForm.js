import React from 'react';
import "./RegisterPage.css";

// Controlled form for logging in
class RegisterForm extends React.Component {
    
    constructor(props) {
        super(props);
        this._initialState = {
            formdata: {
                first_name: {
                    value: "",
                    restrictions: {}
                },
                last_name: {
                    value: "",
                    restrictions: {}
                },
                login: {
                    value: "",
                    restrictions: {}
                },
                password: {
                    value: "",
                    restrictions: {}
                },
                r_password: {
                    value: "",
                    restrictions: {}
                },
            }
        }
        this.state = this._initialState; 
        // binding
        this.handleChange = this.handleChange.bind(this);
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

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        fetch("/users/add", {
            method: "POST",
            body: formData,
        }).then(response => {
            return response.json();
        }).then(response => {
            this.setState(this._initialState);
        }).catch(err => {
            throw err;
        });
    }

    render() {
        return (
            <form className="form-signin" onSubmit={this.handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
                
                <label htmlFor="username" className="sr-only">First Name</label>
                <input name="first_name" type="text" id="first_name" className="form-control mb-1" value={this.state.first_name} placeholder="First Name" required autoFocus onChange={this.handleChange}/>

                <label htmlFor="username" className="sr-only">Last Name</label>
                <input name="last_name" type="text" id="last_name" className="form-control mb-1" value={this.state.last_name} placeholder="Last Name" required onChange={this.handleChange}/>

                <label htmlFor="username" className="sr-only">Login</label>
                <input name="login" type="text" id="username" className="form-control mb-1" value={this.state.login} placeholder="Login" required onChange={this.handleChange}/>
                
                <label htmlFor="password" className="sr-only">Password</label>
                <input name="password" type="password" id="password" className="form-control mb-1" value={this.state.password} placeholder="Password" required onChange={this.handleChange}/>
                
                <label htmlFor="r_password" className="sr-only">Repeat Password</label>
                <input name="r_password" type="password" id="r_password" className="form-control" value={this.state.r_password} placeholder="Repeat Password" required onChange={this.handleChange}/>

                <button className="btn btn-lg btn-dark btn-block mt-3">Sign up</button>
                <p className="mt-3 mb-3 text-muted">© Andrei Dimitrascu 2020</p>
            </form>
        );
    }
}

export default RegisterForm;