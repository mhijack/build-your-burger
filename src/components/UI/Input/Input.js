import React from 'react';

import classes from './Input.css';

// Input element's properties are passed from parent component
const Input = props => {
    let inputElement = null;
    let errorMessage = null;

    const inputClasses = [classes.InputElement];

    if (props.shouldValidate && props.invalid && props.touched) {
        inputClasses.push(classes.Invalid);
        // Display error message if validation fails
        errorMessage = <p className={classes.ErrorMessage}>Please enter a valid value.</p>
    }

    switch (props.elementType) {
        case 'input':
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                />
            );
            break;
        case 'textarea':
            inputElement = (
                <textarea
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                />
            );
            break;
        case 'select':
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.handleChange}
                >
                    {props.elementConfig.options.map(input => (
                        <option value={input.value} key={input.value}>
                            {input.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                />
            );
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {errorMessage}
        </div>
    );
};

export default Input;
