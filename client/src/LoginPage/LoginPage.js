import React from "react";
import LoginForm from "./LoginForm";

class LoginPage extends React.Component {

    render() {
        return (
            <div className="text-center log-form">
                <LoginForm loginContext={this.props.loginContext}/>
            </div>
        );
    }
}

export default LoginPage;