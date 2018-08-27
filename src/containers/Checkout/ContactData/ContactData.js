import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Aux from '../../../hoc/Aux/Aux';
import Input from '../../../components/UI/Input/Input';

import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import { validate } from '../../../utilities/utility';

import { connect } from 'react-redux';
import * as orderActions from '../../../store/actions/index';
import * as burgerBuilderActions from '../../../store/actions/burgerBuilder';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'zip code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'fastest' },
                        { value: 'cheapeast', displayValue: 'cheapeast' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    };

    handleInputChange = (event, inputIdentifier) => {
        const updatedFormEls = Object.assign({}, this.state.orderForm);
        const updatedInput = Object.assign({}, updatedFormEls[inputIdentifier]);

        updatedInput.value = event.target.value;
        updatedInput.valid = validate(
            event.target.value,
            updatedInput.validation
        );
        updatedFormEls[inputIdentifier] = updatedInput;

        // Checking overall form validation
        let formIsValid = true;
        for (let input in updatedFormEls) {
            formIsValid = updatedFormEls[input].valid && formIsValid;
        }

        this.setState({ orderForm: updatedFormEls, formIsValid });
    };

    orderHandler = event => {
        event.preventDefault();

        // Show spinner while sending data

        // Send data to database
        // 1. Gather form data from this.state
        const formData = {};
        for (let name in this.state.orderForm) {
            formData[name] = this.state.orderForm[name].value;
        }
        // 2. Gather burger info from props
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            orderData: formData,
            token: this.props.token,
            userId: this.props.userId
        };
        this.props.onOrderBurger(order);
        this.props.initIngredients();
    };

    handleBlur = identifier => {
        const form = { ...this.state.orderForm };
        const formEl = { ...form[identifier] };
        formEl.touched = true;
        form[identifier] = formEl;
        this.setState({ orderForm: form });
    };

    render = () => {
        // Render form Inputs
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                name: key,
                config: this.state.orderForm[key]
            });
        }
        const formElArr = formElements.map(el => (
            <Input
                key={el.name}
                name={el.name}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                handleChange={event => this.handleInputChange(event, el.name)}
                shouldValidate={el.config.validation}
                invalid={!el.config.valid}
                touched={el.config.touched}
                handleBlur={() => this.handleBlur(el.name)}
            />
        ));

        // Render form
        let form = (
            <div className={classes.ContactData}>
                <form onSubmit={this.orderHandler}>
                    <h4>Tell us about yourself:</h4>
                    {formElArr}

                    <Button
                        btnType="Success"
                        clicked={this.orderHandler}
                        disabled={!this.state.formIsValid}
                    >
                        ORDER
                    </Button>
                </form>
            </div>
        );

        // Show spinner while waiting for response
        if (this.props.loading) {
            form = <Spinner />;
        }

        return <Aux>{form}</Aux>;
    };
}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilderReducer.ingredients,
    price: state.burgerBuilderReducer.totalPrice,
    loading: state.orderReducer.loading,
    token: state.authReducer.token,
    userId: state.authReducer.userId
});

const mapDispatchToProps = dispatch => ({
    onOrderBurger: orderData => dispatch(orderActions.purchase(orderData)),
    initIngredients: () => dispatch(burgerBuilderActions.initIngredients())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(ContactData, axios));
