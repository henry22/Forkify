// Global app controller
import axios from 'axios';

async function getResults(query) {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const key = '3b0cd726bdd3855b1e26cbebe8815874';
    
    try {
        const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&${query}`);
        const recipes = res.data.recipes;
        console.log(recipes);
    } catch(error) {
        console.log(error);
    }
}

getResults('pizza');