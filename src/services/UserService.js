export default class UserService {


    static myInstance = null;

    static getInstance() {

        if (this.myInstance == null) {
            this.myInstance = new UserService()
        }
        return this.myInstance
    }


    getUser = (username) =>
        fetch(`https://wbdv-ticket-server.herokuapp.com/api/users/${username}`)


    updateUser = (username) =>
        fetch(`https://wbdv-ticket-server.herokuapp.com/api/users/${username}`, {
            method: 'PUT',
            body: JSON.stringify(username),
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': true
            },
        })


    deleteUser = (username) =>
        fetch(`https://wbdv-ticket-server.herokuapp.com/api/users/${username}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': true
            },
        })


    createUser = (user) =>
        fetch("https://wbdv-ticket-server.herokuapp.com/api/users/", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': true
            },
        })

    
    addTrackedEvent = (username, eventId) =>
    fetch(`https://wbdv-ticket-server.herokuapp.com/api/users/${username}/events/${eventId}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': true
        },
    })



}
