import React from "react";
import LoginForm from "./LoginForm";
import {Redirect} from "react-router-dom";

class LoginPage extends React.Component {

    render() {
        return (
            <div className="text-center log-form">
                {this.props.loginContext.logged && <Redirect to="/"/> /* if user is logged he desn't need this page */}
                <LoginForm loginContext={this.props.loginContext}/>
            </div>
        );
    }
}

export default LoginPage;