import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Aux from '../../../hoc/Aux/Aux';
import Input from '../../../components/UI/Input/Input';

import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

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
                valid: false
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
                valid: false
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
                    maxLength: 6,
                },
                valid: false
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
                valid: false
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
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'fastest' },
                        { value: 'cheapeast', displayValue: 'cheapeast' }
                    ]
                },
                value: 'fastest'
            }
        },
        loading: false
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
    }

    handleInputChange = (event, inputIdentifier) => {
        const updatedFormEls = Object.assign({}, this.state.orderForm);
        const updatedInput = Object.assign({}, updatedFormEls[inputIdentifier]);

        updatedInput.value = event.target.value;
        updatedInput.valid = this.validate(event.target.value, updatedInput.validation);
        console.log(updatedFormEls);
        updatedFormEls[inputIdentifier] = updatedInput;

        this.setState({ orderForm: updatedFormEls });
    };

    orderHandler = event => {
        event.preventDefault();

        // Show spinner while sending data
        this.setState({ loading: true });

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
            userData: formData
        };

        // Firebase database requires suffix '.json'
        axios
            .post('/orders.json', order)
            .then(res => {
                // Remove loader
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false });
            });
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
            />
        ));

        // Render form
        let form = (
            <div className={classes.ContactData}>
                <form onSubmit={this.orderHandler}>
                    <h4>Tell us about yourself:</h4>
                    {formElArr}

                    <Button btnType="Success" clicked={this.orderHandler}>
                        ORDER
                    </Button>
                </form>
            </div>
        );

        // Show spinner while waiting for response
        if (this.state.loading) {
            form = <Spinner />;
        }

        return <Aux>{form}</Aux>;
    };
}

export default ContactData;
