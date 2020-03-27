import React from "react";

class FormValidator extends React.Component {
    /* pass the form fields as this.props.children
       it will save some room under the form to display the validation errors 
       the formdata will pe passed as a prop (formdata).
       * setSubmitable a function is also passed as a callback, this function will be called and will disable/enable form submition (function(bool state))
       * Format is the following:
       formdata: {
           fieldname1: {
               value: string
               restrictions: object,
               invalidMessage: string
           }
       }

       * state should be of following format:
         It will dynamically set the bool value to true or false depending
         on whether the field is valid or not. If field is invalid, error message is displayed 
        {
            fieldname1: bool,
            fieldname2: bool,
            fieldname3: bool
        }

       * restrictions has the following format example:
       restrictions {
           minLength: 2,
           pattern: /\d+/g
       }
    */

    constructor(props) {
        super(props);
        this.restrictionMap = this.initRestrictionMap();
        this.state = this.initState();
    }

    /* 
        Restrictions map returns a object of following format:
        {
            key(string): value(function(restriction_value, form_value) => bool)
        }

        each function should check the current form_value agains the restriction_value and will report to the parent
    */
    initRestrictionMap() {
        let map = {
            "minLen": function(restriction, formValue) {
                if (typeof restriction == "number") {
                    return formValue.length >= restriction;
                }
                return false;
            },
            "pattern": function(restriction, formValue) {
                return true;
            }
        }
    }

    initState() {
        let result = {};
        for(let key of Object.keys(this.props.formdata)) {
            // if field is valid - true
            result[key] = true;
        }
        return result;
    }

    validate() {
        let result = {}
    }

    componentDidUpdate() {
        console.log("updated");
    }

    render() {
        return this.props.children;
    }
}

export default FormValidator;