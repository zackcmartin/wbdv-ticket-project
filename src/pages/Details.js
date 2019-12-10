import React from 'react'
import events from "../data/events";
import StubHubService from "../stubhub-service/StubHubService";
import ReviewService from "../services/ReviewService";
import EventService from "../services/EventService";
import UserService from "../services/UserService";
import Navbar from 'react-bootstrap/Navbar'
import logo from './logo.png';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import { Link, Redirect } from 'react-router-dom'

let stubHubService = StubHubService.getInstance();
let reviewService = ReviewService.getInstance();
let eventService = EventService.getInstance();
let userService = UserService.getInstance();




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
            if (this.props.location.state.user.username == '') {
                noUser = true;
            }
        }
        catch{
            noUser = true;
        }

        this.state = {
            userInput: userInput,
            noUser: noUser,
            event: { description: '', eventDateLocal: '', performers: { name: '' }, venue: { name: '' } },
            reviews: [],
            eventAdded: false,
            tackNoUser: false,
            commentNoUser: false
        }

        this.addReview = this.addReview.bind(this)
        this.addTrackedEvent = this.addTrackedEvent.bind(this)
        this.deleteReview = this.deleteReview.bind(this)
        this.editReview = this.editReview.bind(this)
    }

    componentDidMount() {
        let { event_id } = this.props.match.params
        userService.getUser(this.state.userInput.username)
            .then(response => response.json()).then(user => this.setState({ userInput: user })).catch(err => this.setState({ error: true }))
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

                    <div style={this.state.noUser === true ? { 'padding-top': 0 } : { display: 'none' }} >
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1">
                                <h1 style={{ color: '#353A40', fontSize: 20 }}>You are not signed in. For more website functionality <Link to={`/login`}><button type="button" className="btn btn-dark">Sign In</button></Link>. No account yet? <Link to={`/register`}><button type="button" className="btn btn-dark">Sign up!</button></Link></h1>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 offset-md-2">
                            <h2>{this.state.event.name}</h2>
                            <div className="card">
                                <div className="card-body bg-light mb-3">
                                    <p className="card-text">{this.state.event.description}</p>
                                    <p className="card-text">{`Save the date: ${moment(this.state.event.eventDateLocal).format('MMMM Do YYYY, h:mm:ss a')}`}</p>
                                    <p className="card-text">{`Get excited to see ${this.state.event.performers.name} to play at ${this.state.event.venue.name}`} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 offset-md-2 col-sm-10">
                            <h3>Comments</h3>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="commentinput">Write a comment!</label>
                                    <textarea value={this.state.new_review}
                                        onChange={(e) => {
                                            this.setState({ new_review: e.target.value })
                                        }}
                                        className="form-control" id="commentinput" rows="3" placehosearchlder={"Write how you feel about the concert"} />
                                </div>
                            </form>
                            <button className={"btn btn-dark my-2"} onClick={this.addReview}>Submit comment</button>

                            <div style={this.state.commentNoUser === true ? { 'padding-top': 0 } : { display: 'none' }} >
                                <div className="row">
                                    <div className="col">
                                        <h1 style={{ color: 'red', fontSize: 20 }}>You must be signed in to add comments</h1>
                                    </div>
                                </div>
                            </div>

                            {this.state.reviews.map(review =>
                                <div className="card bg-light border-primary">
                                    <div className="card-body">
                                        <p className={"card-text"}>
                                            {review.review}
                                            {(review.user.username === this.state.userInput.username) && (<div>
                                                <FontAwesomeIcon className="float-right mx-1" onClick={() => this.deleteReview(review.id)} icon={faWindowClose} />
                                                <FontAwesomeIcon className="float-right mx-1" onClick={() => this.editReview(review.id)} icon={faPencilAlt} />
                                            </div>)
                                            }
                                        </p>
                                        <p className={"card-text"}>
                                            <Link to={{ pathname: `/profile/${review.user.username}`,
                                                state: { user: this.state.userInput }
                                            }}>
                                                {`Commented by ${review.user.firstName} ${review.user.lastName}`}
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col offset-md-4">
                            <button className="btn btn-dark my-4" onClick={this.addTrackedEvent}>Add event to your tracked events</button>
                        </div>
                    </div>


                    <div style={this.state.eventAdded === true ? { 'padding-top': 0 } : { display: 'none' }} >
                        <div className="row">
                            <div className="col offset-md-4">
                                <h1 style={{ color: 'green', fontSize: 20 }}>Event was successfully added</h1>
                            </div>
                        </div>
                    </div>

                    <div style={this.state.tackNoUser === true ? { 'padding-top': 0 } : { display: 'none' }} >
                        <div className="row">
                            <div className="col offset-md-4">
                                <h1 style={{ color: 'red', fontSize: 20 }}>You must be signed in to add to your tracked events</h1>
                            </div>
                        </div>
                    </div>


                </div>
            </div>)
    }

    async initialize() {
        let { event_id } = this.props.match.params
        stubHubService.setAccessToken()
        let eventResponse = await stubHubService.getEvents({ id: event_id })
        let event = eventResponse.events[0]

        event.performers = event.performers.join(',')
        let event_local = await eventService.addEvent(event)
        let reviews = await reviewService.getReviewsForEvent(event_local.id)
        this.setState({ event: event_local, reviews: reviews })
    }


    async addReview() {
        if (this.state.noUser) {
            this.setState({ commentNoUser: true })
        }
        else {
            let response = await reviewService.addReviewToEvent(this.state.userInput.username, this.state.event.id,
                { review: this.state.new_review })
            let reviews_response = await reviewService.getReviewsForEvent(this.state.event.id)
            this.setState({ reviews: reviews_response , new_review: '' })
        }
    }

    async editReview(review_id) {
        let user_reviews = await userService.updateReview(this.state.userInput.username, review_id, { review: this.state.new_review })
        let event_reviews = await reviewService.getReviewsForEvent(this.state.event.id)
        this.setState({reviews: event_reviews, new_review: ''})
    }

    async addTrackedEvent() {
        if (this.state.noUser) {
            this.setState({ tackNoUser: true })
        }
        else {
            let response = await userService.addTrackedEvent(this.state.userInput.username, this.state.event.id)
                .then(() => this.setState({ eventAdded: true }))
        }
    }


    async deleteReview(review_id) {
        let user_reviews = await userService.deleteReview(this.state.userInput.username,review_id)
        let event_reviews = await reviewService.getReviewsForEvent(this.state.event.id)
        this.setState({reviews: event_reviews})
    }
}
