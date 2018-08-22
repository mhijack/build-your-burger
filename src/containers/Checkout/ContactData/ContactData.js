import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Aux from '../../../hoc/Aux/Aux';

import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: 'jack',
        email: 'jack@gmail.com',
        address: {
            street: 'yew',
            postalCode: 'V6P5V8',
        },
        loading: false,
    }

    orderHandler = event => {
        event.preventDefault();
        // Show spinner while sending data
        this.setState({ loading: true });

        // Send data to database

        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            customer: {
                name: 'Jianyuan Chen',
                address: {
                    street: 'teststreet',
                    city: 'Vancouver',
                    zipCode: 'V6P5V8',
                    country: 'Canada'
                },
                email: 'jack@gmail.com'
            },
            deliveryMethod: 'express'
        };

        // Firebase database requires suffix '.json'
        axios
            .post('/orders.json', order)
            .then(res => {
                this.props.history.push('/');

                // Remove loader
                this.setState({ loading: false });
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }

    render = () => {
        let form = (
            <div className={classes.ContactData}>
                <form>
                    <h4>Tell us about yourself:</h4>
                    <input type="text" name="name" className={classes.Input} placeholder="name" />
                    <input type="email" name="email" className={classes.Input} placeholder="email" />
                    <input type="text" name="street" className={classes.Input} placeholder="street" />
                    <input type="text" name="postalCode" className={classes.Input} placeholder="postal code" />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            </div>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <Aux>
                {form}
            </Aux>
        )
    }
}

export default ContactData;