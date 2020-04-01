import React from "react";
import {Link} from "react-router-dom";
import "./MainPage.css";

class MainPageNonLogged extends React.Component {
    render() {
        return (
            <div className="container mainPageLoggedHeader">
                <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm p-1">
                        <div className="card productDescriptionCard">
                            <div className="card-body text-white">
                                Sample description of application:
                                <div className="container mt-5">
                                    <Link to="/login"><button className="btn btn-dark" onClick={this.onLogOut}>Log In</button></Link>
                                    <Link to="/register"><button className="btn btn-dark ml-2" onClick={this.onLogOut}>Sign In</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPageNonLogged;