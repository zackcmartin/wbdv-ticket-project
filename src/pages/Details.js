import React from 'react'
import events from "../data/events";
import StubHubService from "../stubhub-service/StubHubService";
import ReviewService from "../services/ReviewService";
import EventService from "../services/EventService";
import Navbar from 'react-bootstrap/Navbar'
import logo from './logo.png';

import { Link, Redirect } from 'react-router-dom'

let stubHubService = StubHubService.getInstance();
let reviewService = ReviewService.getInstance();
let eventService =  EventService.getInstance();




export default class Details extends React.Component {

    constructor(props) {
        super(props);

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
        }
        catch{
            noUser = true;
        }

        this.state = {
            userInput: userInput,
            noUser: noUser,
            event: events[0],
            reviews: [{ username: 'user_1', text: 'hello' }, { username: 'user_2', text: 'hello' }, { username: 'user_3', text: 'hello' }, { username: 'user_4', text: 'hello' }]
        }

        this.addReview = this.addReview.bind(this)
    }

    componentDidMount() {
        let { event_id} = this.props.match.params

        console.log(event_id)
        this.initialize()
    }

    render() {
        return (

            <div>
                <div style={this.state.noUser === true ? { 'padding-top': 0 } : { display: 'none' }} >
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
                </div>
                <div style={this.state.noUser === false ? { 'padding-top': 0 } : { display: 'none' }} >
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
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4 offset-md-2">
                            <h2>{this.state.event.name}</h2>
                            <div className="card">
                                <div className="card-body bg-light mb-3">
                                    <p className="card-text">{this.state.event.description}</p>
                                    <p className="card-text">{`Save the date: ${this.state.event.eventDateLocal}`}</p>
                                    <p className="card-text">{`Get excited to see ${this.state.event.performers.name} to play at ${this.state.event.venue.name}`} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 offset-md-2">
                            <h3>Comments</h3>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="commentinput">Write a comment!</label>
                                    <textarea value={this.state.new_review}
    onChange={(e) => {
        this.setState({new_review: e.target.value})
    }}
    className="form-control" id="commentinput" rows="3" placeholder={"Write how you feel about the concert"}/>
                                </div>
                            </form>
                            <button className={"btn btn-dark my-2"} onClick={this.addReview}>Submit comment</button>
                            {this.state.reviews.map(review =>
                                <div className="card bg-light border-primary">
                                    <div className="card-body">
                                        <p className={"card-text"}>
                                            {review.review}
                                        </p>
                                        <p className={"card-text "}>
                                            {`Commented by ${review.username}`}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col offset-md-4">
                            <button className="btn btn-dark my-4" >Add event to your tracked events</button>
                        </div>
                    </div>
                </div>
            </div> )
        }

    async initialize(){
        let { event_id} = this.props.match.params
        stubHubService.setAccessToken()
        let eventResponse  = await stubHubService.getEvents({id: event_id})
        let event = eventResponse.events[0]
        console.log(event)
        event.performers = event.performers.join(',')
        let event_local = await eventService.addEvent(event)
        console.log(event_local)
        let reviews = await reviewService.getReviewsForEvent(event_local.id)
        console.log(reviews)
        this.setState({event: event_local, reviews: reviews})
    }

    async addReview(){
        let response = await reviewService.addReviewToEvent("george@gmail.com", this.state.event.id,
            {review: this.state.new_review})
        let reviews_response = await reviewService.getReviewsForEvent(this.state.event.id)
        console.log(reviews_response)
        this.setState({reviews: reviews_response})

    }
}
