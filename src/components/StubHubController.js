import React from 'react'

import StubHubService from '../stubhub-service/StubHubService';

import orderData from '../data/orders_stubhub.json'
import paymentData from '../data/payments.json'
import saleData from '../data/sales.json'

let stubHubService = StubHubService.getInstance();

export default class StubHubController extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userInput: {
                username: '',
                password: '',
            },
            api_key_response: null,
            api_key: null,
            listings: null,
            orders: null,
            payments: null,
            sales: null

        }
        this.getAPIkey = this.getAPIkey.bind(this);
        this.getAllListings = this.getAllListings.bind(this)
        this.getAllOrders = this.getAllOrders.bind(this)
        this.getAllPayments = this.getAllPayments.bind(this)
        this.getAllSales = this.getAllSales.bind(this)
    }

    async getAPIkey() {
        let response = await stubHubService.getAPItoken(this.state.userInput.username, this.state.userInput.password);
        stubHubService.setAccessToken(response.access_token)
        this.setState(({
            userInput: {
                username: '',
                password: ''
            },
            api_key_response: response,
            api_key: response.access_token,
            listings: null,
            listingArray: null,
            currentListing: null,
            orders: null,
            currentOrder: null,
            payments: null,
            currentPayment: null,
            sales: null,
            currentSale: null,
            isJsonData: false
        }))
    }

    async getAllListings() {
        if (this.state.isJsonData) {
            this.setState(prevState => ({
                userInput: {
                    username: '',
                    password: ''
                },
                api_key_response: prevState.api_key_response,
                api_key: prevState.api_key,
                listings: prevState.listings,
                listingArray: orderData,
                currentListing: prevState.currentListing,
                orders: prevState.orders,
                currentOrder: prevState.currentOrder,
                payments: prevState.payments,
                currentPayment: prevState.currentPayment,
                sales: prevState.sales,
                currentSale: prevState.currentSale,
                isJsonData: prevState.isJsonData
            }))
        }
        else {
            let response = await stubHubService.getAllListings();
            this.setState(prevState => ({
                userInput: {
                    username: '',
                    password: ''
                },
                api_key_response: prevState.api_key_response,
                api_key: prevState.api_key,
                listings: response,
                listingArray: response.listings.listing,
                currentListing: prevState.currentListing,
                orders: prevState.orders,
                currentOrder: prevState.currentOrder,
                payments: prevState.payments,
                currentPayment: prevState.currentPayment,
                sales: prevState.sales,
                currentSale: prevState.currentSale,
                isJsonData: prevState.isJsonData
            }))
        }
    }

    async getAllOrders() {
        if (this.state.isJsonData) {
            this.setState(prevState => ({
                userInput: {
                    username: '',
                    password: ''
                },
                api_key_response: prevState.api_key_response,
                api_key: prevState.api_key,
                listings: prevState.listings,
                listingArray: prevState.listingArray,
                currentListing: prevState.currentListing,
                orders: prevState.orders,
                currentOrder: prevState.currentOrder,
                payments: prevState.payments,
                currentPayment: prevState.currentPayment,
                sales: prevState.sales,
                currentSale: prevState.currentSale,
                isJsonData: prevState.isJsonData
            }))
        }
        else {
            let response = await stubHubService.getAllOrders();
            this.setState(prevState => ({
                userInput: {
                    username: '',
                    password: ''
                },
                api_key_response: prevState.api_key_response,
                api_key: prevState.api_key,
                listings: prevState.listings,
                listingArray: prevState.listingArray,
                currentListing: prevState.currentListing,
                orders: response,
                currentOrder: prevState.currentOrder,
                payments: prevState.payments,
                currentPayment: prevState.currentPayment,
                sales: prevState.sales,
                currentSale: prevState.currentSale,
                isJsonData: prevState.isJsonData
            }))
        }
    }

    async getAllPayments() {
        if (this.state.isJsonData) {
            this.setState(prevState => ({
                userInput: {
                    username: '',
                    password: ''
                },
                api_key_response: prevState.api_key_response,
                api_key: prevState.api_key,
                listings: prevState.listings,
                listingArray: prevState.listingArray,
                currentListing: prevState.currentListing,
                orders: prevState.orders,
                currentOrder: prevState.currentOrder,
                payments: paymentData,
                currentPayment: prevState.currentPayment,
                sales: prevState.sales,
                currentSale: prevState.currentSale,
                isJsonData: prevState.isJsonData
            }))
        }
        else {
            let response = await stubHubService.getAllPayments();
            this.setState(prevState => ({
                userInput: {
                    username: '',
                    password: ''
                },
                api_key_response: prevState.api_key_response,
                api_key: prevState.api_key,
                listings: prevState.listings,
                listingArray: prevState.listingArray,
                currentListing: prevState.currentListing,
                orders: prevState.orders,
                currentOrder: prevState.currentOrder,
                payments: response.payments,
                currentPayment: prevState.currentPayment,
                sales: prevState.sales,
                currentSale: prevState.currentSale,
                isJsonData: prevState.isJsonData
            }))
        }
    }

    async getAllSales() {
        if (this.state.isJsonData) {
            this.setState(prevState => ({
                userInput: {
                    username: '',
                    password: ''
                },
                api_key_response: prevState.api_key_response,
                api_key: prevState.api_key,
                listings: prevState.listings,
                listingArray: prevState.listingArray,
                currentListing: prevState.currentListing,
                orders: prevState.orders,
                currentOrder: prevState.currentOrder,
                payments: prevState.payments,
                currentPayment: prevState.currentPayment,
                sales: saleData,
                currentSale: prevState.currentSale,
                isJsonData: prevState.isJsonData
            }))
        }
        else {
            let response = await stubHubService.getAllSales();
            this.setState(prevState => ({
                userInput: {
                    username: '',
                    password: ''
                },
                api_key_response: prevState.api_key_response,
                api_key: prevState.api_key,
                listings: prevState.listings,
                listingArray: prevState.listingArray,
                currentListing: prevState.currentListing,
                orders: prevState.orders,
                currentOrder: prevState.currentOrder,
                payments: prevState.payments,
                currentPayment: prevState.currentPayment,
                sales: response.sales,
                currentSale: prevState.currentSale,
                isJsonData: prevState.isJsonData
            }))
        }
    }


    setCurrentListing = (json) => {
        this.setState(prevState => ({
            userInput: {
                username: '',
                password: ''
            },
            api_key_response: prevState.api_key_response,
            api_key: prevState.api_key,
            listings: prevState.listings,
            listingArray: prevState.listingArray,
            currentListing: json,
            orders: prevState.orders,
            currentOrder: prevState.currentOrder,
            payments: prevState.payments,
            currentPayment: prevState.currentPayment,
            sales: prevState.sales,
            currentSale: prevState.currentSale,
            isJsonData: prevState.isJsonData
        }))
    }

    setCurrentOrder = (json) => {
        this.setState(prevState => ({
            userInput: {
                username: '',
                password: ''
            },
            api_key_response: prevState.api_key_response,
            api_key: prevState.api_key,
            listings: prevState.listings,
            listingArray: prevState.listingArray,
            currentListing: prevState.currentListing,
            orders: prevState.orders,
            currentOrder: json,
            payments: prevState.payments,
            currentPayment: prevState.currentPayment,
            sales: prevState.sales,
            currentSale: prevState.currentSale,
            isJsonData: prevState.isJsonData
        }))
    }

    setCurrentPayment = (json) => {
        this.setState(prevState => ({
            userInput: {
                username: '',
                password: ''
            },
            api_key_response: prevState.api_key_response,
            api_key: prevState.api_key,
            listings: prevState.listings,
            listingArray: prevState.listingArray,
            currentListing: prevState.currentListing,
            orders: prevState.orders,
            currentOrder: prevState.currentOrder,
            payments: prevState.payments,
            currentPayment: json,
            sales: prevState.sales,
            currentSale: prevState.currentSale,
            isJsonData: prevState.isJsonData
        }))
    }



    setCurrentSale = (json) => {
        this.setState(prevState => ({
            userInput: {
                username: '',
                password: ''
            },
            api_key_response: prevState.api_key_response,
            api_key: prevState.api_key,
            listings: prevState.listings,
            listingArray: prevState.listingArray,
            currentListing: prevState.currentListing,
            orders: prevState.orders,
            currentOrder: prevState.currentOrder,
            payments: prevState.payments,
            currentPayment: prevState.currentPayment,
            sales: prevState.sales,
            currentSale: json,
            isJsonData: prevState.isJsonData
        }))
    }


    setJsonData = () => {
        this.setState(prevState => ({
            userInput: {
                username: '',
                password: ''
            },
            api_key_response: prevState.api_key_response,
            api_key: 'zLLiPYgBRBsDoBI6FYsIGdRKhG5A',
            listings: null,
            listingArray: null,
            currentListing: null,
            orders: null,
            currentOrder: null,
            payments: null,
            currentPayment: null,
            sales: null,
            currentSale: null,
            isJsonData: true
        }))
    }


    render() {
        console.log(this.state.userInput.api_key_response)
        return (<div className="container-fluid" style={{ 'padding-top': 30 }}>
            <div classNmae="row" style={{ 'boarder': '1px' }}>
                <div className="row">

                    <div className="col-4">
                        <h2> Sign in with Stubhub account</h2>
                        <div>
                            <input
                                value={this.state.username}
                                placeholder="Email address" className="form-control"
                                onChange={(e) => this.state.userInput.username = e.currentTarget.value} />
                            <input
                                value={this.state.password}
                                type='password'
                                placeholder="Stubhub password" className="form-control"
                                onChange={(e) => this.state.userInput.password = e.currentTarget.value} />
                            <button onClick={this.getAPIkey} className="btn btn-primary btn-block">Get API Key</button>
                            <br />
                            <button onClick={this.setJsonData} className="btn btn-primary btn-block">Sign in with one of our Stubhub Accounts</button>
                        </div>
                    </div>
                    <div className="col-6" style={{ 'max-height': '230px', overflow: 'scroll' }}>
                        <h2> Result </h2>
                        <pre style={{ 'text-align': 'left' }}> {this.state.api_key ? "{ API_key: " + this.state.api_key : null} </pre>
                        <h5> {this.state.api_key_response ? "Full response" : null} </h5>
                        <pre style={{ 'text-align': 'left' }}> {this.state.api_key_response === null ? null :
                            JSON.stringify(this.state.api_key_response, null, 2)}</pre>
                    </div>
                </div>
                <div className="row" style={this.state.api_key === null ? { display: 'none' } : { 'padding-top': 30 }} >
                    <div className="col-4">
                        <h2> Get All Listings </h2>
                        <button onClick={this.getAllListings} className="btn btn-primary btn-block">Get All Listings</button>
                    </div>
                    <div className="col-6">
                        <h2> Result </h2>
                        <ul className="list-group">
                            {this.state.listingArray && this.state.listingArray.map((listing) => (
                                <li className="list-group">
                                    <button className="btn btn-info" onClick={() => this.setCurrentListing(listing)}>
                                        {listing.eventDescription}
                                    </button>
                                </li>
                            ))
                            }
                        </ul>
                        <pre style={{ 'text-align': 'left' }}> {this.state.currentListing ? JSON.stringify(this.state.currentListing) : null} </pre>
                    </div>
                </div>
                <div className="row" style={this.state.api_key === null ? { display: 'none' } : { 'padding-top': 30 }} >
                    <div className="col-4">
                        <h2> Get All Payments </h2>

                        <button onClick={this.getAllPayments} className="btn btn-primary btn-block">Get All Payments</button>
                    </div>
                    <div className="col-6">
                        <h2> Result </h2>

                        <ul className="list-group">
                            {this.state.payments && this.state.payments.map((payment) => (
                                <li className="list-group">
                                    <button className="btn btn-info" onClick={() => this.setCurrentPayment(payment)}>
                                        {payment.eventName}
                                    </button>
                                </li>
                            ))
                            }
                        </ul>
                        <pre style={{ 'text-align': 'left' }}> {this.state.currentPayment ? JSON.stringify(this.state.currentPayment) : null} </pre>
                    </div>
                </div>
                <div className="row" style={this.state.api_key === null ? { display: 'none' } : { 'padding-top': 30 }} >
                    <div className="col-4">
                        <h2> Get All Sales </h2>
                        <button onClick={this.getAllSales} className="btn btn-primary btn-block">Get All Sales</button>
                    </div>
                    <div className="col-6">
                        <h2> Result </h2>

                        <ul>
                            {this.state.sales && this.state.sales.map((sale) => (
                                <li className="list-group">
                                    <button className="btn btn-info" onClick={() => this.setCurrentSale(sale)}>
                                        {sale.eventDescription}
                                    </button>
                                </li>
                            ))
                            }
                        </ul>
                        <pre style={{ 'text-align': 'left' }}> {this.state.currentSale ? JSON.stringify(this.state.currentSale) : null} </pre>
                    </div>
                </div>


                <div className="row" style={this.state.api_key === null ? { display: 'none' } : { 'padding-top': 30 }} >
                    <div className="col-4">
                        <h2> Get All Orders </h2>
                        <button onClick={this.getAllOrders} className="btn btn-primary btn-block">Get All Orders</button>
                    </div>
                    <div className="col-6">
                        <h2> Result </h2>
                        <pre style={{ 'text-align': 'left' }}> {this.state.currentOrder ? JSON.stringify(this.state.currentOrder) : null} </pre>
                    </div>
                </div>

            </div>
        </div>)
    }
}
