export default class EventService {

    static myInstance = null;

    static getInstance() {

        if (this.myInstance == null) {
            this.myInstance = new EventService()
        }
        return this.myInstance
    }

    deleteEvent = (username, eventId) =>
        fetch(`https://wbdv-ticket-server.herokuapp.com/api/users/${username}/events/${eventId}`, {
            method: 'DELETE',
            body: JSON.stringify(eventId),
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': true
            },
        })


    getEvents = (username) =>
        fetch(`https://wbdv-ticket-server.herokuapp.com/api/users/${username}/events`)



    addEvent = (event) =>
        fetch(`https://wbdv-ticket-server.herokuapp.com/api/events`, {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': true
            },
        }).then(response => response.json())``



}
