import asyncLoadComponent from '../asynLoadComponent';

export const asyncAuth = asyncLoadComponent(() => {
    return import('../../../containers/Auth/Auth');
});

export const asyncBurgerBuilder = asyncLoadComponent(() => {
    return import('../../../containers/BurgerBuilder/BurgerBuilder');
});

export const asyncCheckout = asyncLoadComponent(() => {
    return import('../../../containers/Checkout/Checkout');
});

export const asyncLogout = asyncLoadComponent(() => {
    return import('../../../containers/Auth/Logout/Logout');
});

export const asyncOrders = asyncLoadComponent(() => {
    return import('../../../containers/Orders/Orders');
});
