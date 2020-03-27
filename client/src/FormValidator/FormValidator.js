
class formValidator {

    constructor() {
        this.restrictionMap = this.initRestrictionMap();
    }

    initRestrictionMap() {
        let map = {
            "minLength": function(restriction, formValue) {
                if (typeof restriction == "number") {
                    return formValue.length >= restriction;
                }
                return false;
            },
            "pattern": function(restriction, formValue) {
                if (restriction instanceof RegExp) {
                    let result = restriction.test(formValue);
                    return result;
                }
                return false;
            },
            "match": function(restriction, formValue, thisCtx) {
                return thisCtx && thisCtx.state && thisCtx.state.formdata && thisCtx.state.formdata[restriction].value === formValue;
            }
        }
        return map;
    }

    // receive one field and this context and checks with the validator if this field is valid
    validateField(fieldName, thisCtx) {
        let result = this.validate(thisCtx.state.formdata[fieldName], thisCtx);
        if (result.changed && result.data) {
            // if field validation data changed, set it's state again
            thisCtx.setState(function(state, props) {
                let newState = state;
                newState.formdata[fieldName] = result.data;
                return newState;
            });
            return Boolean(result.data.valid);
        }
        return Boolean(result.data.valid);
    }

    /*
        Receives fieldSettings: object
        {
            value: string
            restrictions: object {string: any, string: any}
            invalidMessage: string,
            valid: bool
        }
    */
    validate(fieldSettings, thisCtx) {
        let changed = false;
        
        // make a copy of fieldSettings
        let settingsCopy = Object.assign({}, fieldSettings);
        if (settingsCopy.restrictions) {
            // iterate over each restriction and see if it's valid
            for(let [key, value] of Object.entries(settingsCopy.restrictions)) {
                // if we have that key and it's a function
                if (this.restrictionMap[key] && typeof this.restrictionMap[key] === "function") {
                    let result = this.restrictionMap[key](value, settingsCopy.value, thisCtx);
                    // if the result is different from what we have now
                    // we can set changed to true 
                    if (result !== settingsCopy.valid) {
                        changed = true;
                        settingsCopy.valid = result;
                    }
                    // if result is false, no need to check further
                    if (!result) {
                        break;
                    }
                } else {
                    // there is no such validator in our map, we clearly did something wrong
                    // set the form as not valid, as this should be investigated
                    changed = true;
                    settingsCopy.valid = false;
                    break;
                }
            }
        }
        return {
            changed: changed,
            data: settingsCopy
        }
    }
}

export default formValidator;