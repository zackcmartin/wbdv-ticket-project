import React from 'react'

import StubHubService from '../stubhub-service/StubHubService';
import { Link, Redirect } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import logo from './logo.png';



let stubHubService = StubHubService.getInstance();

export default class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userInput: {
                username: '',
                password: '',
                firstName: '',
                lastName: '',
                type: ''
            },
            error: false,
            toSignIn: false,
            api_key_response: null,
            api_key: null,

        }
        this.getAPIkey = this.getAPIkey.bind(this);
        this.checkCreateUser = this.checkCreateUser.bind(this);
    }



    createUser = (user) =>
        fetch("https://wbdv-ticket-server.herokuapp.com/api/users/", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': true
            },
        })
            .then(this.setState({ toSignIn: true }))



    checkCreateUser() {

        if (this.state.userInput.username == '' || this.state.userInput.password == '' ||
            this.state.userInput.firstName == '' || this.state.userInput.lastName == '') {
            this.setState({ error: true });
        }

        else {
            this.createUser(this.state.userInput)
        }

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
        }))
    }



    render() {

        if (this.state.toSignIn === true) {
            return <Redirect to='/' />
        }

        return (

            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>
                        <img
                            alt=""
                            src={logo}
                            width="40"
                            height="40"
                            className="d-inline-block align-top float-left"
                            style={{ marginTop: -10, marginRight: 40 }}
                        />{'  '}
                        StubHub Helper
     </Navbar.Brand>
                </Navbar>


                <div className="container-fluid">

                    {/* If error in sign up */}
                    <div style={this.state.error === false ? { display: 'none' } : { 'padding-top': 0 }} >
                        <h2 style={{ color: 'red', marginLeft: 100 }}> Input is not filled out correctly. </h2>
                    </div>

                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <h2> Register </h2>
                            <h5>If you have a StubHub account, sign up using it's credentials and you will have the added feature of being able to view and publicly display your current listings</h5>
                        </div>
                    </div>
                    <div className="row" style={{ 'boarder': '1px' }}>
                        <div className="col-md-10 col-md-offset-1">
                            <h5>First Name:</h5>
                            <input
                                placeholder="John" className="form-control"
                                onChange={(e) => this.state.userInput.firstName = e.currentTarget.value} />

                            <h5>Last Name:</h5>
                            <input
                                placeholder="Doe" className="form-control"
                                onChange={(e) => this.state.userInput.lastName = e.currentTarget.value} />

                            <h5>Email:</h5>
                            <input
                                placeholder="alice@gmail.com" className="form-control"
                                onChange={(e) => this.state.userInput.username = e.currentTarget.value} />

                            <h5>Password:</h5>
                            <input
                                type='password'
                                placeholder="qwe123~+*" className="form-control"
                                onChange={(e) => this.state.userInput.password = e.currentTarget.value} />
                            <h5>Are you an Admin? If so, provide the Admin Password:</h5>
                            <input
                                type='password'
                                placeholder="Admin Password" className="form-control"
                                onChange={(e) => this.state.userInput.type = e.currentTarget.value} />
                            <br />
                            <button onClick={this.checkCreateUser} className="btn btn-info btn-block">Sign Up</button>
                        </div>

                    </div>
                    <br />
                    <div className="row">
                        <div class="col-md-10 col-md-offset-1">
                            <h4>Already Signed Up With Us?</h4>
                            <Link to={`/`}>
                                <button className="btn btn-info"> Sign In</button>
                            </Link>
                        </div>
                    </div>
                    {/* <div className="col-6" style={{ 'max-height': '230px', overflow: 'scroll' }}>
                    <h2> Result </h2>
                    <pre style={{ 'text-align': 'left' }}> {this.state.api_key ? "{ API_key: " + this.state.api_key : null} </pre>
                    <h5> {this.state.api_key_response ? "Full response" : null} </h5>
                    <pre style={{ 'text-align': 'left' }}> {this.state.api_key_response === null ? null :
                        JSON.stringify(this.state.api_key_response, null, 2)}</pre>
                </div> */}
                </div>
            </div>)
    }
}