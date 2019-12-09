export default class UserService {


    static myInstance = null;

    constructor() {
        this.url = 'https://wbdv-ticket-server-kkhomiakov.herokuapp.com/'
    }

    static getInstance() {

        if (this.myInstance == null) {
            this.myInstance = new UserService()
        }
        return this.myInstance
    }


    getUser = (username) =>
        fetch(`https://wbdv-ticket-server-kkhomiakov.herokuapp.com/api/users/${username}`)

    getAllUsers = () =>
        fetch(`https://wbdv-ticket-server-kkhomiakov.herokuapp.com/api/users/`)

    updateUser = (user, username) =>
        fetch(`https://wbdv-ticket-server-kkhomiakov.herokuapp.com/api/users/${username}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': true
            },
        })


    deleteUser = (username) =>
        fetch(`https://wbdv-ticket-server-kkhomiakov.herokuapp.com/api/users/${username}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': true
            },
        })


    createUser = (user) =>
        fetch("https://wbdv-ticket-server-kkhomiakov.herokuapp.com/api/users/", {
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
    fetch(`https://wbdv-ticket-server-kkhomiakov.herokuapp.com/api/users/${username}/events/${eventId}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': true
        },
    })

    deleteReview = (username, review_id) =>
        fetch(`${this.url}api/users/${username}/reviews/${review_id}`,
            {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': true
                }
            }).then(response => response.json())




}
