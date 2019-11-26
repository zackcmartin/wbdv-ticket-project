import React from "react";
import TicketPageHeader from "../components/TicketPageHeader";
import EventCard from "../components/EventCard";
import events from "../data/events";
import {BarChart, Tooltip, LineChart, Bar, Legend, Line, CartesianGrid, XAxis, YAxis, Label} from 'recharts';
import * as d3 from "d3-array";
import StubHubService from "../stubhub-service/StubHubService";
import EventService from "../services/EventService";

let stubHubService = StubHubService.getInstance();


export default class TicketPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event_many: events,
            selected_event: null,
            username: '',
            password: '',
            api_key_response: null,
            api_key: null,
            bins: [],
        };

        this.getAPIkey = this.getAPIkey.bind(this);
        this.getEventListings = this.getEventListings.bind(this)

    }

    async getEventListings(event_id) {
        let response = await stubHubService.getEventListings(event_id);
        let event_service = new EventService(response)
        this.setState({data: event_service.processed_data})

    }

    async getAPIkey() {
        let response = await stubHubService.getAPItoken(this.state.username, this.state.password);
        stubHubService.setAccessToken(response.access_token)
        this.setState(({
            username: '',
            password: '',
            api_key_response: response,
            api_key: response.access_token,
        }))
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <TicketPageHeader/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col"}>
                        <div>
                            <input
                                value={this.state.username}
                                placeholder="Stubhub username" className="form-control"
                                onChange={(e) => this.setState({username: e.currentTarget.value})}/>
                            <input
                                value={this.state.password}
                                type='password'
                                placeholder="Stubhub password" className="form-control"
                                onChange={(e) => this.setState({password: e.currentTarget.value}) }/>
                            <button onClick={this.getAPIkey} className="btn btn-primary btn-block">Get API Key</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h3>Tracked Events</h3>
                    </div>
                </div>
                <div className="row">
                    {!this.selected_event && this.state.event_many.map(event => {
                        let button = (
                            <button type="button" className="btn btn-dark" onClick={() => {
                                this.getEventListings(event.id)
                                this.setState({selected_event: event})
                            }}>
                                Load Data
                            </button>
                        );
                        return (
                            <EventCard
                                key={event.id}
                                className={"col-3 m-2"}
                                title={event.name}
                                text={`${event.venue.name} at ${event.eventDateLocal}`}
                                button={button}
                            />
                        );
                    })}

                    <BarChart width={1000} height={250} data={this.state.data}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name">
                            <Label value="Concert Prices" offset={0} position="insideBottom"/>
                        </XAxis>
                        <YAxis label={{value: 'Amount of tickets', angle: -90, position: 'insideLeft'}}/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="tickets" fill="#8884d8"/>
                    </BarChart>
                </div>
                <div className="row">
                    <div className={"col"}>

                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h3>Completed Tickets</h3>
                    </div>
                </div>
            </div>
        );
    }
}
