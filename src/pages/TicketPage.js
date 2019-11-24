import React from "react";
import TicketPageHeader from "../components/TicketPageHeader";
import EventCard from "../components/EventCard";
import events from "../data/events";
import {BarChart, Tooltip, LineChart, Bar, Legend, Line, CartesianGrid, XAxis, YAxis, Label} from 'recharts';
import * as d3 from "d3-array";


export default class TicketPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event_many: events,
            event_one: events[0],
        };
    }

    render() {

        let numbers = d3.range(1000).map(e => Math.random() * 100);
        console.log(numbers)
        d3.bin()

        const data = (() => {
            // Random numbers
            let numbers = d3.range(1000).map(e => Math.random() * 100);
            let bins = d3.bin().domain([0, 100])(numbers);
            return bins.reduce((acc, el) => {
                acc.push({
                    name: `$ ${((el.x0 + el.x1) / 2)}`,
                    tickets: el.length
                })
                return acc;
            }, []);
        })()

        console.log(data)

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <TicketPageHeader/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h3>Tracked Events</h3>
                    </div>
                </div>
                <div className="row">
                    {this.state.event_many.map(event => {
                        let button = (
                            <button type="button" className="btn btn-dark" onClick={() => {
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
                <div className="row">
                    <div className={"col"}>
                        <BarChart width={730} height={250} data={data}>
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
