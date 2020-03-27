import React from "react";
import LoginRequired from "../LoginRequired/LoginRequired";

class SettingsPage extends React.Component {
    
    render() {
        return (
            <div>
                <LoginRequired loginContext={this.props.loginContext}>
                    <h1>I am settings page 2</h1>
                </LoginRequired>
            </div>
        );
    }
}

export default SettingsPage;