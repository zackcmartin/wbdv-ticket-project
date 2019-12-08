import React from 'react'

import StubHubService from "../stubhub-service/StubHubService";
import EventCard from "../components/EventCard";
import {Link} from "react-router-dom";

let stubHubService = StubHubService.getInstance();

export default class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            event_name: '',
            event_many: []
        }
        this.getAPIkey = this.getAPIkey.bind(this);
        this.getEvents = this.getEvents.bind(this);

    }

    componentDidMount() {
        this.getAPIkey()
    }

    render() {
        return (<div className="container">
            <div className="row">
                <div className="col">
                    <h2>Search for Events Here</h2>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col"}>
                    <input className={"my-3 form-control"} value={this.state.concert_name}
                           placeholder="Insert Concert you are searching for"
                           onChange={(e) => this.setState({concert_name: e.currentTarget.value})} />
                           <button onClick={this.getEvents} className="btn btn-dark btn-block" >Search for Concerts</button>
                </div>
            </div>
            <div className="row">
                    {this.state.event_many && this.state.event_many.map(event => {
                        let button = (
                            <Link to={`/details/${event.id}`}>
                            <button type="button" className="btn btn-dark">Go to event</button>
                            </Link>
                                );
                            return <EventCard
                                key={event.id}
                                className={"col-3 m-2"}
                                title={event.name}
                                text={`${event.venue.name} at ${event.eventDateLocal}`}
                                button={button}
                            /> }
                        )
                    }
            </div>
        </div>)
    }

    async getAPIkey() {
        let response = await stubHubService.getAPItoken('kr7908@gmail.com', '123Welcome456!');
        stubHubService.setAccessToken(response.access_token)
        console.log(response)
        this.setState(({
            username: '',
            password: '',
            api_key_response: response,
            api_key: response.access_token,
        }))
    }

    async getEvents() {
        let response = await stubHubService.getEvents({name: this.state.concert_name})
        this.setState({event_many: response.events})
    }

}
