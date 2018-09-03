import axios from "axios";

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const key = '3b0cd726bdd3855b1e26cbebe8815874';

        try {
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.results = res.data.recipes;
            // console.log(this.results);
        } catch (error) {
            console.log(error);
        }
    }
}