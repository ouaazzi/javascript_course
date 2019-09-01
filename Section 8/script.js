/*
const second = () => {
    setTimeout(() => {
        console.log('Async Hey there');
    }, 2000);
};

const first = () => {
    console.log('Hey there');
    second();
    console.log('The end');
};
first();

*/

/*
function getRecipe() {
    setTimeout(() => {
        const recipeID = [523, 883, 432, 974];
        console.log(recipeID);

        setTimeout(id => {
            const recipe = {title: 'Fresh tomato pasta', publisher: 'Christian'};
            console.log(`${id}: ${recipe.title}`);

            setTimeout(publisher => {
                const recipe2 = {title: 'Italian Pizza', publisher: 'Christian'};
                console.log(recipe);
            }, 1500, recipe.publisher);
        }, 1500, recipeID[2]);
    }, 1500);
}

getRecipe();
*/

const getIDs = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([523, 883, 432, 974]);
    }, 1500);
});

const getRecipe = recID => {
    return new Promise((resolve, reject) => {
        setTimeout(ID => {
            const recipe = {title: 'Fresh tomato pasta', Publisher: 'Christian'};
            resolve(`${ID}: ${recipe.title}`);
        }, 1500, recID)
    });
};

const getRelated = publisher => {
    return new Promise((resolve, reject) => {
        setTimeout(pub => {
            const recipe = {title: 'Italian Pizza', publisher: 'Christian'};
            resolve(`${pub}: ${recipe.title}`);
        }, 1500, publisher);
    });
};

getIDs
    .then(IDs => {
        console.log(IDs);
        return getRecipe(IDs[2]);
    })
    .then(recipe => {
        console.log(recipe);
        return getRelated('Christian');
    })
    .then(recipe => {
        console.log(recipe);
    })
    .catch(error => {
        console.log(error);
    });