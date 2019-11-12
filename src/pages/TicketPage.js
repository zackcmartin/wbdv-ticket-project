import React from "react";
import TicketPageHeader from "../components/TicketPageHeader";

export default class TicketPage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <TicketPageHeader />
          </div>
        </div>
        <div className="row">
            <div className="col">
                <h3>Listings</h3>
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
