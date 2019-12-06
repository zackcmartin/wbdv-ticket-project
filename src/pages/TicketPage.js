import React from "react";
import TicketPageHeader from "../components/TicketPageHeader";
import EventCard from "../components/EventCard";
import events from "../data/events";
import StubHubService from "../stubhub-service/StubHubService";

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
            reviews: [{username: 'user_1',text: 'hello' },{username: 'user_2',text: 'hello' },{username: 'user_3',text: 'hello' },{username: 'user_4',text: 'hello' }]
        };

        this.getAPIkey = this.getAPIkey.bind(this);
        this.getReviews= this.getReviews.bind(this)

    }

    async getReviews(event_id) {
        // let response = await stubHubService.getEventListings(event_id);
        // let event_service = new EventService(response)
    }

    async getAPIkey() {
        let response = await stubHubService.getAPItoken(this.state.username, this.state.password);
        stubHubService.setAccessToken(response.access_token)
        console.log(response)
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
                <div className={"row"}>
                    <div className={"col"} >

                    </div>

                </div>
                <div className="row">
                    <div className="col">
                        <h3>Tracked Events</h3>
                        <h5>Add Tracked Events</h5>

                    </div>
                </div>
                <div className="row">
                    {!this.selected_event && this.state.event_many.map(event => {
                        let button = (
                            <button type="button" className="btn btn-dark" onClick={() => {
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

                </div>
                <div className={"row"}>
                    <div className={"col"}>
                        <form>
                            <div className="form-group">
                                <label htmlFor="commentinput">Write a comment!</label>
                                <textarea className="form-control" id="commentinput" rows="3" placeholder={"Write how you feel about the concert"}></textarea>
                            </div>
                        </form>
                        {this.state.selected_event &&  <div>
                            <EventCard
                                key={this.state.selected_event.id}
                                className={"col-3 m-2"}
                                title={this.state.selected_event.name}
                                text={`${this.state.selected_event.venue.name} at ${this.state.selected_event.eventDateLocal}`}
                            /></div>}
                        {this.state.reviews.map(review =>
                            <div className="card bg-light border-primary">
                                <div className="card-body">
                                    <p className={"card-text"}>
                                        {review.text}
                                    </p>
                                    <p className={"card-text "}>
                                        {`Commented by ${review.username}`}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
