import buildUrl from 'build-url';

export default class StubHubService {

    // khomchenko.g@husky.neu.edu

    static myInstance = null;

    appKey = "5biqSNo5e8FI6A1mQN43rWPu41celq6m"
    appSecret = "3QlxXKusilBaYZSN"
    b64encoded = btoa( this.appKey+":"+this.appSecret)
    access_token = ''


    static getInstance() {

        if (this.myInstance == null) {
            this.myInstance = new StubHubService()
        }
        return this.myInstance
    }

    setAccessToken (access_token = 'VRGm8vAS1SuXJDKe7P3oqMXVnL2S'){
        this.access_token = access_token
    }


    async getAPItoken(email, pass) {
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        let url = 'https://api.stubhub.com/sellers/oauth/accesstoken?grant_type=client_credentials';
        let requestBody = {
            username: email,
            password: pass
        }
        const response =  await fetch(proxyUrl + url, {
            method: 'post',
            body: JSON.stringify(requestBody),
            headers: {
                'Authorization': 'Basic ' + this.b64encoded,
                'Content-Type': 'application/json'

            }
        })
        const json = response.json()
        return json
    }

    async getAllListings() {
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        let url = 'https://api.stubhub.com/sellers/listings/v3';
        const response =  await fetch(proxyUrl + url, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Accept': 'application/json'

            }
        })
        const json = response.json()
        return json
    }

    async getEventListings(event_id) {
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        let url = `https://api.stubhub.com/sellers/find/listings/v3/?eventId=${event_id}`;
        const response =  await fetch(proxyUrl + url, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Accept': 'application/json'

            }
        })
        const json = response.json()
        return json
    }

    async getAllOrders() {
        // Possible query params:
        //
        // FILTERING: Possible filter parameters Two and more parameters can be concatenated
        // by AND STATUS ongoing(default) or past ORDERDATE fromEventDate TO toEventDate
        //
        // SORTING:  Possible sort parameters EVENTDESC, ORDERDATE, EVENTDATE,Ex EVENTDESC asc,EVENTDATE desc Note-
        // If the sort parameter is not in format field asc|desc, it will default to EVENTDATE asc
        //
        // START: Index of orders
        //
        // ROWS: Num of rows to retrieve
        //
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        let url = 'https://api.stubhub.com/sellers/orders/v3/';
        const response =  await fetch(proxyUrl + url, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Accept': 'application/json'

            }
        })
        const json = response.json()
        return json
    }

    async getAllPayments() {
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        let url = 'https://api.stubhub.com/sellers/sales/payments/v3';
        const response =  await fetch(proxyUrl + url, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Accept': 'application/json'

            }
        })
        const json = response.json()
        return json
    }

    async getAllSales() {
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        let url = 'https://api.stubhub.com/sellers/sales/v3';
        const response =  await fetch(proxyUrl + url, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Accept': 'application/json'

            }
        })
        const json = response.json()
        return json
    }

    async getEvents(queryParams){
        queryParams['city'] = 'boston'
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        let url = 'https://api.stubhub.com/sellers/search/events/v3';
        let finalUrl = buildUrl(proxyUrl+url, {
            queryParams: queryParams
        })
        const response =  await fetch(finalUrl, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Accept': 'application/json'

            }
        })
        const json = response.json()
        return json
    }


}
