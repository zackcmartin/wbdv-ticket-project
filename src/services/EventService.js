export default class EventService {

    static myInstance = null;

    constructor() {
        this.url = 'https://wbdv-ticket-server-kkhomiakov.herokuapp.com/'
    }
    static getInstance() {

        if (this.myInstance == null) {
            this.myInstance = new EventService()
        }
        return this.myInstance
    }

    deleteEvent = (username, eventId) =>
        fetch(`${this.url}api/users/${username}/events/${eventId}`, {
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
        fetch(`${this.url}api/users/${username}/events`)



    addEvent = (event) =>
        fetch(`${this.url}api/events`, {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': true
            },
        }).then(response => response.json())



}
