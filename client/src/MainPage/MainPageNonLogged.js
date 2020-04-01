import React from "react";
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
                                <div className="mt-5">
                                    <button className="btn btn-dark" onClick={this.onLogOut}>Log Out</button>
                                    <button className="btn btn-dark ml-2" onClick={this.onLogOut}>Log Out</button>
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