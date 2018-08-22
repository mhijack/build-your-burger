import React from 'react';

import classes from './Input.css';

// Input element's properties are passed from parent component
const Input = props => {
    let inputElement = null;

    switch (props.elementType) {
        case 'input':
            inputElement = (
                <input
                    className={classes.InputElement}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.handleChange}
                />
            );
            break;
        case 'textarea':
            inputElement = (
                <textarea
                    className={classes.InputElement}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.handleChange}
                />
            );
            break;
        case 'select':
            inputElement = (
                <select
                    className={classes.InputElement}
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
                    className={classes.InputElement}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.handleChange}
                />
            );
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;
