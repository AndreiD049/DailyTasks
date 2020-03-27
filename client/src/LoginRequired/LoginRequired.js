import React from "react";
import { Redirect } from "react-router-dom";

class LoginRequired extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            logged: null
        }
    }

    async componentDidMount() {
        if (this.props.loginContext.logged === null) {
            await this.props.loginContext.checkLogin();
        }
        if (!this.props.loginContext.logged) {
            this.setState({
                logged: false
            });
        } else {
            this.setState({
                logged: true
            })
        }
    }

    render() {
        if (this.state.logged === false) {
            return <Redirect to="/login"/>
        } else if (this.state.logged === true) {
            return this.props.children;
        }
        return null;
    }
}

export default LoginRequired;