import React from "react";
import {Link} from "react-router-dom";
import "./MainPage.css";

class MainPageNonLogged extends React.Component {
    render() {
        return (
            <div className="container mainPageLoggedHeader d-flex">
                <div className="container-fluid d-flex justify-content-end align-self-stretch">
                    <div className="card productDescriptionCard my-2 w-50">
                        <div className="card-body text-white d-flex flex-column">
                            <span className="h3">Sample description of application:</span>
                            <div className="container d-flex justify-content-center mt-auto p-5">
                                <Link to="/login"><button className="btn btn-dark" onClick={this.onLogOut}>Log In</button></Link>
                                <Link to="/register"><button className="btn btn-dark ml-2" onClick={this.onLogOut}>Sign Up</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPageNonLogged;