export const updateObject = (oldObject, newProps) => {
    return {
        ...oldObject,
        ...newProps
    }
}

// value: input value
export const validate = (value, rules) => {
    // Set isValid initially to true. Then check both rule and isValid
    let isValid = true;
    value = value.trim();

    if (rules.required) {
        isValid = value !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
};