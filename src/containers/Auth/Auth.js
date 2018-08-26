import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.css';

import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    };

    componentDidMount = () => {
        // if not building a burger and not signed in, redirect to home page after signing in
        // otherwise, if building a burger, redirect to /checkout
        if (!this.props.building && this.props.autoRedirectPath) {
            this.onSetAuthRedirectPath();
        }
    }

    // value: input value
    validate = (value, rules) => {
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

    // value: input value
    validate = (value, rules) => {
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

    handleInputChange = (event, ctrlName) => {
        const updatedCtrls = {
            ...this.state.controls,
            [ctrlName]: {
                ...this.state.controls[ctrlName],
                value: event.target.value,
                valid: this.validate(
                    event.target.value,
                    this.state.controls[ctrlName].validation
                ),
                touched: true
            }
        };
        this.setState({ controls: updatedCtrls });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignUp,
        );
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            };
        });
    };

    render() {
        const formElements = [];
        for (let el in this.state.controls) {
            formElements.push({
                name: el,
                config: this.state.controls[el]
            });
        }
        let form = formElements.map(el => (
            <Input
                key={el.name}
                name={el.elementType}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                handleChange={event => this.handleInputChange(event, el.name)}
                shouldValidate={el.config.validation}
                invalid={!el.config.valid}
                touched={el.config.touched}
                // handleBlur={() => this.handleBlur(el.name)}
            />
        ));
        if (this.props.loading) {
            form = <Spinner />;
        }

        let errorMsg = null;
        if (this.props.error) {
            errorMsg = <p>{this.props.error.message}</p>;
        }

        let autoRedirect = null;
        if (this.props.isAuthenticated) {
            autoRedirect = <Redirect to={this.props.authRedirectPath} />;
        }

        return (
            <div className={classes.Auth}>
                {autoRedirect}

                {errorMsg}
                <form onSubmit={this.handleSubmit}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                    Switch to {this.state.isSignUp ? 'Sign In' : 'Sign Up'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isAuthenticated: state.authReducer.token !== null,
        building: state.burgerBuilderReducer.building,
        authRedirectPath: state.authReducer.redirectPath,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (...args) => dispatch(actions.auth(...args)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);
