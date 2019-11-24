import React from 'react';

export default class EventCard extends React.Component {
    render() {
        return ( <div className={`card ${this.props.className}`} style={{width: 100}}>
        {this.props.cardImage}
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <p className="card-text">{this.props.text}</p>
          {this.props.button}
        </div>
      </div>);
    }
}
