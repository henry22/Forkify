import axios from 'axios';
import { proxy, key } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);

            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch(error) {
            console.log(error);
        }
    }

    calcTime() {
        // Assuming that we need 15 minutes for each 3 ingredients
        const numIngredients = this.ingredients.length;
        const periods = Math.ceil(numIngredients / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            // Uniform units
            let ingredient = el.toLowerCase();

            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            })

            // Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // Parse ingredients into count, unit and ingredients
            const arrIngredients = ingredient.split(' ');
            const unitIndex = arrIngredients.findIndex(el2 => units.includes(el2));

            let objIngredients;

            if(unitIndex > -1) {
                // There is a unit
                const arrCount = arrIngredients.slice(0, unitIndex);
                let count;

                if(arrCount.length === 1) {
                    count = eval(arrIngredients[0].replace('-', '+'));
                } else {
                    // Calculate the value from the string
                    count = eval(arrIngredients.slice(0, unitIndex).join('+'));
                }

                objIngredients = {
                    count,
                    unit: arrIngredients[unitIndex],
                    ingredient: arrIngredients.slice(unitIndex + 1).join(' ')
                };
            } else if(parseInt(arrIngredients[0], 10)) {
                // There is no unit, but the 1st element is number
                objIngredients = {
                    count: parseInt(arrIngredients[0], 10),
                    unit: '',
                    ingredient: arrIngredients.slice(1).join(' ')
                };
            } else if(unitIndex === -1) {
                // There is no unit, and no number in the 1st position
                objIngredients = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }

            return objIngredients;
        });

        this.ingredients = newIngredients;
    }
}