import React from "react";
import { Redirect } from "react-router-dom";

class RedirectionManager extends React.Component {
    render() {
        if (this.props.redirection.redirect && this.props.redirection.to) {
            return (<div><Redirect to={this.props.redirection.to} />
                        <div>
                            {this.props.children}
                        </div>
                    </div>)
        } else {
            return this.props.children || null;
        }
    }
}

export default RedirectionManager;