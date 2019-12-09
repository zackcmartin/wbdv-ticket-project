export default class ReviewService {

    constructor() {
        this.url = "https://wbdv-ticket-server-kkhomiakov.herokuapp.com/"
    }

    static myInstance = null;

    static getInstance() {

        if (this.myInstance == null) {
            this.myInstance = new ReviewService()
        }
        return this.myInstance
    }

    async getReviewsForEvent(event_id){
        return await fetch(`${this.url}api/events/${event_id}/reviews`).then(response => response.json())
    }

    async addReviewToEvent(username, event_id, review) {

        console.log(`${this.url}api/users/${username}/reviews/${event_id}`)
        return await fetch(`${this.url}api/users/${username}/reviews/${event_id}`,{
            method: 'POST',
            body: JSON.stringify(review)
        }).then(response => response.json())
    }

    async deleteReview(username, review_id){
        return await fetch(`${this.url}api/users/${username}/reviews/${review_id}`,
            {
                method: 'DELETE'
            }).then(response => response.json())
    }
}

