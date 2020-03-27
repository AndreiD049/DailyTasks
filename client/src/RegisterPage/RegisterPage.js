import React from "react";
import RegisterForm from "./RegisterForm";

class RegisterPage extends React.Component {
    render() {
        return (
            <div className="text-center reg-form">
                <RegisterForm />
            </div>
        );
    }
}

export default RegisterPage;