import React from 'react'
import events from "../data/events";

export default class Details extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            event: events[0],
            reviews: [{username: 'user_1',text: 'hello' },{username: 'user_2',text: 'hello' },{username: 'user_3',text: 'hello' },{username: 'user_4',text: 'hello' }]
        }
    }

    render() {
        console.log('I am rendering something')
        return <div className="container-fluid">
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
                            <textarea className="form-control" id="commentinput" rows="3" placeholder={"Write how you feel about the concert"}></textarea>
                            <button className="btn btn-dark my-2"  onClick={ () => { /** TODO service to add reviews **/}}>Submit comment</button>
                        </div>
                    </form>
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
            <div className="row">
                <div className="col offset-md-4">
                    <button className="btn btn-dark my-4"  onClick={()=> {/** TODO service to add event**/}}>Add event to your tracked events</button>
                </div>
            </div>
        </div>
        }
}
