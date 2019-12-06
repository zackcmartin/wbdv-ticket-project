import React from 'react'

import StubHubService from '../stubhub-service/StubHubService';
import { Link, Redirect } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import logo from './logo.png';


let stubHubService = StubHubService.getInstance();

export default class Users extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userInput: {
                username: '',
                password: '',
            },
            users: '',
            error: false

        }
    }


    componentDidMount() {
        fetch(`https://wbdv-ticket-server.herokuapp.com/api/users/`)
            .then(response => response.json()).then(users => this.setState({ users: users })).catch(err => this.setState({ error: true }))

    }


    render() {



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
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <h1>All users</h1>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <ul className="list-group">
                                {this.state.users && this.state.users.map((user) => (
                                    <li className="list-group">
                                        <Link to={`/profile/${user.username}`}>
                                            <button className="btn btn-info  btn-block">
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
