import React from 'react'

import StubHubService from '../stubhub-service/StubHubService';

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
            payments: null,
            sales: null
        }))
    }

    async getAllListings() {
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
            payments: prevState.payments,
            sales: prevState.sales
        }))
    }

    async getAllOrders() {
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
            payments: prevState.payments,
            sales: prevState.sales
        }))
    }

    async getAllPayments() {
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
            payments: response,
            sales: prevState.sales,
        }))
    }

    async getAllSales() {
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
            payments: prevState.payments,
            sales: response
        }))
    }


    setJSON = (json) => {
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
            payments: prevState.payments,
            sales: prevState.sales
        }))
    }



    render() {
        console.log(this.state.userInput.api_key_response)
        return (<div className="container-fluid" style={{ 'padding-top': 30 }}>
            <div classNmae="row" style={{ 'boarder': '1px' }}>
                <div className="row">

                    <div className="col-4">
                        <h2> Get API key </h2>
                        <div>
                            <input
                                value={this.state.username}
                                placeholder="Stubhub username" className="form-control"
                                onChange={(e) => this.state.userInput.username = e.currentTarget.value} />
                            <input
                                value={this.state.password}
                                type='password'
                                placeholder="Stubhub password" className="form-control"
                                onChange={(e) => this.state.userInput.password = e.currentTarget.value} />
                            <button onClick={this.getAPIkey} className="btn btn-primary btn-block">Get API Key</button>
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

                            {this.state.listings && this.state.listingArray.map((listing) => (
                                <li className="list-group-item">
                                    <button className="btn btn-info" onClick={() => this.setJSON(listing)}>
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
                        <h2> Get All Orders </h2>
                        <button onClick={this.getAllOrders} className="btn btn-primary btn-block">Get All Orders</button>
                    </div>
                    <div className="col-6">
                        <h2> Result </h2>
                        <pre style={{ 'text-align': 'left' }}> {this.state.orders ? JSON.stringify(this.state.orders) : null} </pre>
                    </div>
                </div>
                <div className="row" style={this.state.api_key === null ? { display: 'none' } : { 'padding-top': 30 }} >
                    <div className="col-4">
                        <h2> Get All Payments </h2>
                        <button onClick={this.getAllPayments} className="btn btn-primary btn-block">Get All Payments</button>
                    </div>
                    <div className="col-6">
                        <h2> Result </h2>
                        <pre style={{ 'text-align': 'left' }}> {this.state.payments ? JSON.stringify(this.state.payments) : null} </pre>
                    </div>
                </div>
                <div className="row" style={this.state.api_key === null ? { display: 'none' } : { 'padding-top': 30 }} >
                    <div className="col-4">
                        <h2> Get All Sales </h2>
                        <button onClick={this.getAllSales} className="btn btn-primary btn-block">Get All Sales</button>
                    </div>
                    <div className="col-6">
                        <h2> Result </h2>
                        <pre style={{ 'text-align': 'left' }}> {this.state.sales ? JSON.stringify(this.state.sales) : null} </pre>
                    </div>
                </div>

            </div>
        </div>)
    }
}
