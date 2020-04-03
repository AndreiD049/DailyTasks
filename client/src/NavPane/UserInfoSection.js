import React from "react";
import { Link } from "react-router-dom";
import RedirectionManager from "../RedirectionManager/RedirectionManager";

class UserInfoSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirection: {
                redirect: false,
                to: "/"
            }
        }
        // bind methods
        this.onLogOut = this.onLogOut.bind(this);
    }

    async onLogOut(e) {
        let response = await fetch("/users/logout", {
            method: "POST"
        });
        if (response.ok) {
            this.props.loginContext.checkLogin();
            this.setState({
                redirection: {
                    redirect: true,
                    to: "/"
                }
            })
        } else {
            let responseBody = await response.json();
            console.error(responseBody.error);
        }
    }

    getLogin() {
        console.log(this.props.loginContext);
        if (this.props.loginContext && 
            this.props.loginContext.user_info && 
            this.props.loginContext.user_info.user_credential &&
            this.props.loginContext.user_info.user_credential.login) {
            return this.props.loginContext.user_info.user_credential.login;
        } else {
            return "Unknown username";
        }
    }

    render() {
        if (this.props.loginContext.logged === null) {
            // We didn't even check if the user is login yet (what were we doing?)
            // Don't display anything yet, we don't know for sure
            // But start checking
            this.props.loginContext.checkLogin();
            return null;
        }
        let displayItem;
        if (this.props.loginContext.logged) {
            displayItem = (<div className="dropdown">
                                <RedirectionManager redirection={this.state.redirection}>
                                    <button id="dropDownMenuButton" className="h4 btn btn-link linkStyle dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Hi {this.getLogin()}
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                                        <Link id="settingsButton" to="/settings" className="dropdown-item btn btn-link authButton">Settings</Link>
                                        <button id="logOutButton" className="dropdown-item btn btn-link authButton" onClick={this.onLogOut}>Log Out</button>
                                    </div>
                                </RedirectionManager>
                            </div>);
        } else {
            displayItem = (<form className="form-inline my-xs-3">
                                <RedirectionManager redirection={this.state.redirection}>
                                    <Link to="/login" className="linkStyle btn authButton mr-1 mr-xs-3">Log In</Link>
                                    <Link to="/register" className="linkStyle btn authButton">Sign Up</Link>
                                </RedirectionManager>
                            </form>);
        }
        return displayItem;
    }
}

export default UserInfoSection;