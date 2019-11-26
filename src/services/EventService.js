import * as d3 from "d3-array";

export default class EventService {
    constructor(event) {
        this.event = event;
        this.processed_data = this.getBinnedData()
    }

    getBinnedData() {
        let listing_many = this.event.listings
        let listing_many_prices = [];
        listing_many.forEach(
            listing => {
                let arr = this.getArrayWithItemsRepeated(listing.quantity, listing.pricePerProduct.amount)
                listing_many_prices = listing_many_prices.concat(arr)
            }
        )
        listing_many_prices  = this.removeOutliers(listing_many_prices)
        const data = (() => {
            let bins = d3.bin()(listing_many_prices);
            return bins.reduce((acc, el) => {
                acc.push({
                    name: (el.x0 + el.x1)/2,
                    tickets: el.length
                })
                return acc;
            },[]);
        })()
        return data
    }

    getArrayWithItemsRepeated(quantity, value) {
        let ret_arr = []
        for (let i = 0; i < quantity; i++) {
            ret_arr.push(value)
        }
        return ret_arr
    }

    removeOutliers(data_in) {
        let data = [...data_in].sort((a,b) => a-b)
        let l = data.length;
        let low = Math.round(l * 0.05);
        let high = l - low;
        let data2 = data.slice(0,high);
        return data2
    }

}
