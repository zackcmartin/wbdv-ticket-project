import React from 'react'

import StubHubService from '../stubhub-service/StubHubService';
import UserService from '../services/UserService';
import { Link, Redirect } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import logo from './logo.png';


let stubHubService = StubHubService.getInstance();
let userService = UserService.getInstance();

export default class Users extends React.Component {

    constructor(props) {
        super(props)


        let noUser = false;
        let userInput = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            type: ''
        };

        try {
            userInput = this.props.location.state.user
            if(this.props.location.state.user.username == ''){
                noUser = true;
            }
        }
        catch{
            noUser = true;
        }




        this.state = {
            userInput: userInput,
            noUser: noUser,
            users: '',
            error: false

        }
    }


    componentDidMount() {
        userService.getAllUsers()
            .then(response => response.json()).then(users => this.setState({ users: users })).catch(err => this.setState({ error: true }))

    }


    render() {



        return (
            <div> 
                    <Navbar bg="dark" variant="dark">
                        <Link to={{
                            pathname: '/',
                            state: { user: this.state.userInput }
                        }}>
                            <Navbar.Brand>
                                <img
                                    alt=""
                                    src={logo}
                                    width="40"
                                    height="40"
                                    className="d-inline-block align-top float-left"
                                    style={{ marginTop: -10, marginRight: 40 }}
                                />{'  '}
                                <div style={{ color: '#A8E0F7', fontSize: 23 }}>~Home~</div>
                            </Navbar.Brand>
                        </Link>
                    </Navbar>

                <div className="container-fluid">

                <div style={this.state.noUser === true ? { 'padding-top': 0 } : { display: 'none' }} >
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1">
                                <h1 style={{ color: '#353A40', fontSize: 20 }}>You are not signed in. For more website functionality <Link to={`/login`}><button type="button" className="btn btn-dark">Sign In</button></Link>. No account yet? <Link to={`/register`}><button type="button" className="btn btn-dark">Sign up!</button></Link></h1>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <h1>All Users</h1>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <ul className="list-group">
                                {this.state.users && this.state.users.map((user) => (
                                    <li className="list-group">
                                        <Link to={{
                                            pathname: `/profile/${user.username}`,
                                            state: {user: this.state.userInput}}}>
                                            <button className="btn btn-dark  btn-block">
                                                <div style={{ fontSize: 15 }}>{user.firstName} {user.lastName}</div>
                                            </button>
                                        </Link>
                                    </li>
                                ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>

            </div>)
    }
}
