import React from "react";
import { Link } from "react-router-dom";
import "./NavPane.css";
import UserInfoSection from "./UserInfoSection";

class NavPane extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <button id="brandLogo" className="navbar-brand btn btn-link"><Link className="linkStyle" to="/">DailyTasks</Link></button>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarDefault" aria-controls="navbarsExampleDefault"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarDefault">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link linkStyle" to="/">Home<span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link linkStyle" to="/login">FREE<span className="sr-only">(Login)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link linkStyle" to="/register">FREE</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <button className="nav-link dropdown-toggle btn btn-link" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
                        <div className="dropdown-menu" aria-labelledby="dropdown01">
                        <Link to="/" className="dropdown-item btn btn-link">Action</Link>
                        <Link to="/" className="dropdown-item btn btn-link">Another action</Link>
                        <Link to="/" className="dropdown-item btn btn-link">Something else here</Link>
                        </div>
                    </li>
                    </ul>
                    <UserInfoSection loginContext={this.props.loginContext}/>
                </div>
            </nav>
        );
    }
}

export default NavPane;