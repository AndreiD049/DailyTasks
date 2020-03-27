import React from "react";

class FormErrorComponent extends React.Component {
    render() {
        return (
        <ul className="mt-3 text-danger text-left">
            {Object.entries(this.props.formdata).map(field => {
                if (field[1].valid === false) {
                    return (<li key={field[0]}><small>{field[1].invalidMessage}</small></li>);
                }
                return null;
            })}
        </ul>);
    }
}

export default FormErrorComponent;