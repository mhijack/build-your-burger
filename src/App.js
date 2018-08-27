import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import { asyncAuth, asyncBurgerBuilder, asyncCheckout, asyncLogout, asyncOrders } from './hoc/asyncLoadComponent/asyncComponent/asyncComponent';

import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {
    componentWillMount = () => {
        this.props.tryAutoSignup();
    }

    render() {
        // Route setup for UNauthenticated users
        let routes = (
            <Switch>
                <Route path="/auth" component={asyncAuth} />
                <Route path="/" exact component={asyncBurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={asyncCheckout} />
                    <Route path="/orders" component={asyncOrders} />
                    <Route path="/logout" component={asyncLogout} />
                    <Route path="/auth" component={asyncAuth} />
                    <Route path="/" exact component={asyncBurgerBuilder} />
                </Switch>
            )
        }

        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        tryAutoSignup: () => dispatch(actions.checkAuthState()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
