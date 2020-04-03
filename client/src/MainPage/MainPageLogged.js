import React from "react";
import {Redirect} from "react-router-dom";

class MainPageLogged extends React.Component {


    render() {
        let teamContent;
        let showTasks = true; // show tasks by default
        // make sure user is logged
        if (!this.props.loginContext.logged) {
            teamContent = <Redirect to="/login"/>            
        } else {
            // user is logged in
            // if user is not a part of an organization, propose to create or to ask invitation
            if (!this.props.loginContext.user_info.organization) {
                showTasks = false;
                teamContent = (
                    <div className="card-body">
                        <h5 className="card-title text-danger">Missing Organisation</h5>
                        <p className="card-text py-3">You are not a part of an organization yet. You can create your own organization and add other people to it. People within an organization 
                        can create different teams and collaborate more efficiently. If you know your organization is already created you can ask for invitation (you should know the username of the organization owner).</p>
                        <button className="btn btn-dark mr-3">Create your own</button>
                        <span>or</span>
                        <button className="btn btn-dark ml-3">Ask for invitation</button>
                    </div>
                );
            }
            // if user doesn't have a team, propose to create one, or to ask invitation
            else if (!this.props.loginContext.user_info.team) {
                showTasks = false;
                teamContent = (
                    <div className="card-body">
                        <h5 className="card-title text-danger">Missing Team</h5>
                        <p className="card-text py-3">You don't have a team yet. You can create a team and add other people to it. People within a team can exchange tasks and collaborate 
                        more efficiently. If you know your team is already created you can ask for invitation (you should know the username of the team owner).</p>
                        <button className="btn btn-dark mr-3">Create your own</button>
                        <span>or</span>
                        <button className="btn btn-dark ml-3">Ask for invitation</button>
                    </div>
                );
            } 
            // User has an organization and a team, show his team members
            else {
                // TODO: Show team members
            }
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <div className="card">
                            <img className="card-img-top" src="https://via.placeholder.com/150x50" alt="logo of teams"/>
                            {teamContent}
                        </div>
                    </div>
                    {showTasks === true && // show below block onlt if showTasks is true
                    <div className="col-sm">
                        <div className="card">
                            <img className="card-img-top" src="https://via.placeholder.com/150x50" alt="logo of teams"/>
                            <div className="card-body">
                                <h5 className="card-title">Your tasks</h5>
                            </div>
                        </div>
                    </div> }
                </div>
            </div>
        );
    }
}

export default MainPageLogged;