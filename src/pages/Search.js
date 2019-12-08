import React from 'react'

import StubHubService from "../stubhub-service/StubHubService";
import EventCard from "../components/EventCard";
import {Link} from "react-router-dom";
import queryString from 'query-string';

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
        let cur_values = queryString.parse(this.props.location.search);
        this.getAPIkey(() => {
            if(cur_values.event_name){
                this.getEvents(cur_values.event_name)
            }})
    }

    componentDidUpdate(prevProps, prevState) {
        let cur_values = queryString.parse(this.props.location.search);
        let prev_values = queryString.parse(prevProps.location.search);
        if (cur_values.event_name !==  prev_values.event_name && cur_values.event_name !== ""){
            this.getEvents(cur_values.event_name)
        }
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
                    <input className={"my-3 form-control"} value={this.state.event_name}
                           placeholder="Insert event you are searching for"
                           onChange={(e) => this.setState({event_name: e.currentTarget.value})} />
                           <Link to={`/search?event_name=${this.state.event_name}`}>
                           <button className="btn btn-dark btn-block" >Search for Events</button>
                           </Link>
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

    async getAPIkey(then) {
        let response = await stubHubService.getAPItoken('kr7908@gmail.com', '123Welcome456!');
        stubHubService.setAccessToken(response.access_token)
        then()
    }

    async getEvents(event_name) {
        let response = await stubHubService.getEvents({name: event_name})
        this.setState({event_many: response.events})
    }

}
