import React from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "./logo.png";

export default class Privacy extends React.Component {
    render(){
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
                <h2> Privacy policy</h2>
                <ul>
                  <li>What infomation is collected</li>
                    <ul>
                        <li>
                            The data that will be collected is the user’s name and StubHub username and password. We will also collect the user’s location and age. We will also record any events the user tracks and any comments that they post. Also, we will keep track of the user’s listings on StubHub.
                        </li>
                    </ul>
                    <li>Where information is collected from</li>
                    <ul>
                        <li>This data will be gotten from the user on our website or from the StubHub API.
                        </li>
                    </ul>
                    <li>
                        Why information is collected
                    </li>
                    <ul>
                        <li>This information is collected so we can display it on our website. For example, users’ comments will be publicly seen to everyone. We will also collect users’ age and location and demographic information so we can advertise our website more effectively on google ad words.
                        </li>
                    </ul>
                    <li>
                        How information is collected (including through cookies and other tracking technologies)
                    </li>
                    <ul>
                        <li>
                            The information is collected by asking the user or by getting data about the user from the StubHub API.
                        </li>
                    </ul>
                    <li>
                        Who information is shared with or sold to
                    </li>
                    <ul>
                        <li>
                            The information is shared with Stubhub and Google Ad Words.
                        </li>
                    </ul>
                    <li>
                        What rights users have over their data
                    </li>
                    <ul>
                        <li>
                            The users have the right to request their data at any time by contacting us. We will send them a JSON of any data we have on them. If they wish for us to delete their data when they close their account, we will happily comply.
                        </li>
                    </ul>
                    <li>
                        Contact Details
                    </li>
                    <ul>
                        <li>
                            Email: rezchikov.k@husky.neu.edu
                        </li>
                    </ul>
                </ul>
            </div>)
    }
}
