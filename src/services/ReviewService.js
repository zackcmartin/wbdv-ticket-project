export default class ReviewService {

    static myInstance = null;

    static getInstance() {

        if (this.myInstance == null) {
            this.myInstance = new ReviewService()
        }
        return this.myInstance
    }

    async getReviewsForEvent(event_id){
        return await fetch(`https://wbdv-ticket-server.herokuapp.com/api/events/${event_id}/reviews`).then(response => response.json())
    }

    async addReviewToEvent(username, event_id) {
        return await fetch(`https://wbdv-ticket-server.herokuapp.com/api/users/${username}/reviews/${event_id}`,{
            method: 'POST',
        }).then(response => response.json())
    }

    async deleteReview(username, review_id){
        return await fetch(`https://wbdv-ticket-server.herokuapp.com/api/users/${username}/reviews/${review_id}`,
            {
                method: 'DELETE'
            }).then(response => response.json())
    }
}

