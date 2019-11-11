import React from "react";

export default class TicketPageHeader extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-light navbar-expand-md bg-light">
        <a className="navbar-brand wbdv-hamburger">
          <span
            className="glyphicon glyphicon-equalizer"
            aria-hidden="true"
          />
        </a>
        <span className="navbar-text">
          Ticket Integration
        </span>
      </nav>
    );
  }
}

