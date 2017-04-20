//////////////////////////////////////////////////////////////////////
// Smoothie Builder by Whole Foods Market
// Smoothie Ingredients and Categories
//////////////////////////////////////////////////////////////////////

// Blended, with love, by Laura (@ladysubrosa) //




(function($) {
//Smoothie Ingredient Objects

this.smoothie = {
  name: 'Your New Smoothie',
  description: 'Blend your smoothie to get the results',
  ingredients: {},
  flavorIngs: {},
  flavoringCount: 0,
  nutrition: {},
  volume: 0,
  color: '#fff', // default state,
  catAmounts: {}
};

//Categories
this.smoothieCats = {
  liquid: {name: "Liquid", description: "Liquids are essential for delicious homemade smoothies and the type of liquid you choose can make a big difference in the flavor of the final result. <em>Tip: Add liquid first to help with smooth blending.</em>", ingredients: [] },
  fruit: { name: "Fruit", description: "Raspberries, strawberries and mangoes add great color to a smoothie and are excellent fresh or frozen. Bananas give smoothies a creamy texture and unbeatable sweetness. Add oranges for a bright citrus flavor and some fiber.", ingredients: [] },
  veggie: { name: "Veggie", description: "The sky is the limit as far as veggie inclusion in smoothies, but leafy greens and orange root veggies are always welcome additions.", ingredients: [] },
  addon: {name: "Add-In", description: "These tasty additions help to adjust the texture of your smoothie while building great flavor.", ingredients: []},
  //thickener: { name: "Thickener", description: "If your smoothie seems a little too thin, adding rolled oats or yogurt can help thicken it up while adding great flavor. (Try chia seeds and flaxseed meal for thickening, too!)", ingredients: [] },
  //sweetener: {name: "Sweetener", description: "Add a couple of dates or a drizzle of honey to adjust the flavor of your smoothie.", ingredients: [] },
  flavoring: {name: "Flavoring", description: "This is a fun freebie category! Add as much or as little of these ingredients as you like.", ingredients: [] }

};



/* Culinary measurements

1 tablespoon = .5 oz
1 teaspoon = .25 oz (half a tablespoon)
1 cup = 8 oz
1/2 cup = 4oz
1/4 cup = 2oz

*/

/* description for shopping list populate as "From your smoothie"*/

this.smoothieIngredients = {
   dates: { 
    name: "Dates",
    amount: "2 pitted or 2 tablespoons",
    cat: smoothieCats.addon,
    type: ['sweetener'],
    volume: 1, //in ounces
    nutrition:  {
      calories: 130,
      fatcals: 0,
      fat: 0,
      saturatedfat: 0,
      carb: 36,
      fiber: 3,
      sugar: 32,
      cholesterol: 0,
      protein: 1,
      sodium: 0
    } ,
    benefits: 'Dates are a delicious and concentrated source of natural sweetness',
    tips: "Dates have a concentrated sweetness, so a little goes a long way",
    color: "#5F2F0F",
    primarycolor: false
  },

   strawberries: { 
    name: "Strawberries",
    amount: "1/4 cup", //"&frac14; cup",
    cat: smoothieCats.fruit,
    type: ['fruit'],
    volume: 2, //in ounces
    nutrition:  {
      calories: 10,
      fatcals: 0,
      fat: 0,
      saturatedfat: 0,
      carb: 3,
      fiber: 1,
      sugar: 2,
      cholesterol: 0,
      protein: 1,
      sodium: 0
    } ,
    benefits: 'Strawberries add Vitamin C to your smoothie',
    tips: "Blend thoroughly if using frozen strawberries",
    color: "#D30506",
    primarycolor: false
  },  

   applejuice: { 
    name: "Apple juice (unsweetened)",
    shortname: "Apple juice",
    details: '(unsweetened)',
    amount: "1/4 cup",//"&frac14; cup",
    cat: smoothieCats.liquid,
    type: ['liquid', 'juice'],
    volume: 2, //in ounces
    nutrition:  {
      calories: 30,
      fatcals: 0,
      fat: 0,
      saturatedfat: 0,
      carb: 7,
      fiber: 1,
      sugar: 6,
      cholesterol: 0,
      protein: 0,
      sodium: 0
    } ,
    benefits: 'Apple juice contributes natural sweetness',
    tips: "Use small amounts to avoid excessive calories",
    color: "#D8A838",
    primarycolor: false
  },  

  coconutmilk: { 
    name: "Coconut milk (not canned, unsweetened, plain)",
    shortname: "Coconut milk",
    details: '(not canned, unsweetened, plain)',
    amount: "3/4 cup",//"&frac34; cup",
    cat: smoothieCats.liquid,
    type: ['liquid'],
    volume: 6, //in ounces
    nutrition:  {
      calories: 35,
      fatcals: 30,
      fat: 3.5,
      saturatedfat: 3,
      carb: 1,
      fiber: 1,
      sugar: 0,
      cholesterol: 0,
      protein: 0,
      sodium: 0
    } ,
    benefits: 'Coconut milk adds calcium and vitamin B12',
    tips: "",
    color: "#ffffff",
    textColor: "#B7A598",
    primarycolor: false
  },  

  almondbutter: { 
    name: "Almond butter (unsweetened, no salt added)",
    shortname: "Almond butter",
    details: '(unsweetened, no salt added)',
    amount: "1 tablespoon",
    cat: smoothieCats.addon,
    type: ['healthy fat'],
    volume: .5, //in ounces
    nutrition:  {
      calories: 100,
      fatcals: 80,
      fat: 9,
      saturatedfat: .5,
      carb: 3,
      fiber: 2,
      sugar: 1,
      cholesterol: 0,
      protein: 3,
      sodium: 35
    } ,
    benefits: 'Almond butter adds a touch of manganese',
    tips: "Blend thoroughly to incorporate",
    color: "#B88229",
    primarycolor: false
  },  


  peanutbutter: { 
    name: "Peanut Butter (unsweetened, no salt added)",
    shortname: "Peanut Butter",
    details: '(unsweetened, no salt added)',
    amount: "1 tablespoon",
    cat: smoothieCats.addon,
    type: ['healthy fat'],
    volume: .5, //in ounces
    nutrition:  {
      calories: 90,
      fatcals: 70,
      fat: 8,
      saturatedfat: 1.5,
      carb: 3,
      fiber: 2,
      sugar: 1,
      cholesterol: 0,
      protein: 3,
      sodium: 75
    } ,
    benefits: 'Peanut butter contributes niacin and manganese',
    tips: "Blend thoroughly to incorporate",
    color: "#BF9257",
    primarycolor: false
  }, 

  dairymilk: { 
    name: "Milk (1%)",
    amount: "3/4 cup",//"&frac34; cup",
    cat: smoothieCats.liquid,
    type: ['liquid', 'dairy'],
    volume: 6, //in ounces
    nutrition:  {
      calories: 80,
      fatcals: 15,
      fat: 2,
      saturatedfat: 1,
      carb: 9,
      fiber: 0,
      sugar: 9,
      cholesterol: 10,
      protein: 6,
      sodium: 80
    } ,
    benefits: 'Milk contributes calcium and vitamin D',
    tips: "Consume smoothies immediately if they also contain acidic ingredients (think citrus, strawberries) to prevent curdling",
    color: "#ffffff",
    textColor: "#B7A598",
    primarycolor: false
  }, 

  flaxseed: { 
    name: "Flaxseed meal",
    amount: "1 tablespoon",
    cat: smoothieCats.addon,
    type: ['healthy fat'],
    volume: .5, //in ounces
    nutrition:  {
      calories: 30,
      fatcals: 20,
      fat: 2,
      saturatedfat: 0,
      carb: 2,
      fiber: 2,
      sugar: 0,
      cholesterol: 0,
      protein: 2,
      sodium: 0
    } ,
    benefits: 'Flaxseed meal adds a little fiber',
    tips: "Eat immediately to prevent smoothie from gelling",
    color: "#69452B",
    primarycolor: false
  }, 

  sweetpotato: { 
    name: "Sweet Potato",
    amount: "1/2 cup", //"&frac12; cup",
    cat: smoothieCats.veggie,
    type: ['Veggie'],
    volume: 4, //in ounces
    nutrition:  {
      calories: 120,
      fatcals: 0,
      fat: 0,
      saturatedfat: 0,
      carb: 29,
      fiber: 4,
      sugar: 9,
      cholesterol: 0,
      protein: 2,
      sodium: 45
    } ,
    benefits: 'Sweet potato adds little fiber, plus Vitamins A and C',
    tips: "Use high speed to blend well. Too much cocoa can taste chalky.",
    color: "#EC9651",
    primarycolor: true
  }, 


  mint: { 
    name: "Fresh mint",
    amount: "2 tablespoons",
    cat: smoothieCats.flavoring,
    type: ['flavoring'],
    volume: 1, //in ounces
    nutrition:  {
      calories: 5,
      fatcals: 0,
      fat: 0,
      saturatedfat: 0,
      carb: 1,
      fiber: 1,
      sugar: 0,
      cholesterol: 0,
      protein: 0,
      sodium: 0
    } ,
    benefits: 'Mint adds a great freshness to your smoothie',
    tips: "Use high speed to blend well.",
    color: "#349031",
    primarycolor: true
  }, 


    cocoa: { 
    name: "Cocoa powder",
    amount: "1 teaspoon",
    cat: smoothieCats.flavoring,
    type: ['flavoring'],
    volume: 0.25, //in ounces
    nutrition:  {
      calories: 5,
      fatcals: 0,
      fat: 0,
      saturatedfat: 0,
      carb: 1,
      fiber: 1,
      sugar: 0,
      cholesterol: 0,
      protein: 0,
      sodium: 0
    } ,
    benefits: 'Cocoa powder gives your smoothie great chocolate flavor',
    tips: "Blend well to incorporate.",
    color: "#95482B",
    primarycolor: false
  }, 

    mango: { 
    name: "Mango",
    amount: "1/2 cup", //"&frac12; Cup",
    cat: smoothieCats.fruit,
    type: ['fruit'],
    volume: 4, //in ounces
    nutrition:  {
      calories: 50,
      fatcals: 5,
      fat: 0,
      saturatedfat: 0,
      carb: 12,
      fiber: 1,
      sugar: 11,
      cholesterol: 0,
      protein: 1,
      sodium: 0
    } ,
    benefits: 'Mango gives your smoothie a boost of vitamins A and C',
    tips: "Use high speed to blend well.",
    color: "#e9b257",
    primarycolor: true
  }, 

  cinnamon: { 
    name: "Cinnamon (ground)",
    shortname: "Cinnamon",
    details: 'ground',
    amount: "1/4 teaspoon",//"&frac14; teaspoon",
    cat: smoothieCats.flavoring,
    type: ['flavoring'],
    volume: 0.0625, //in ounces
    nutrition:  {
      calories: 0,
      fatcals: 0,
      fat: 0,
      saturatedfat: 0,
      carb: 0,
      fiber: 0,
      sugar: 0,
      cholesterol: 0,
      protein: 0,
      sodium: 0
    } ,
    benefits: 'Cinnamon adds a spicy note to your smoothie',
    tips: "Use high speed to blend well.",
    color: "#923328",
    primarycolor: true
  }, 

  honey: { 
    name: "Honey",
    amount: "1 tablespoon",
    cat: smoothieCats.addon,
    type: ['sweetener'],
    volume: 0.5, //in ounces
    nutrition:  {
      calories: 70,
      fatcals: 0,
      fat: 0,
      saturatedfat: 0,
      carb: 17,
      fiber: 0,
      sugar: 16,
      cholesterol: 0,
      protein: 0,
      sodium: 0
    } ,
    benefits: 'Honey adds sweetness with a tasty floral note',
    tips: "Use high speed to blend well.",
    color: "#F8A431",
    primarycolor: false
  }, 

  spinach: { 
    name: "Spinach",
    amount: "1/2 cup",//"&frac12; cup",
    cat: smoothieCats.veggie,
    type: ['veggie'],
    volume: 4, //in ounces
    nutrition:  {
      calories: 5,
      fatcals: 0,
      fat: 0,
      saturatedfat: 0,
      carb: 1,
      fiber: 1,
      sugar: 0,
      cholesterol: 0,
      protein: 0,
      sodium: 20
    } ,
    benefits: 'Spinach contributes vitamin A and K',
    tips: "Use high speed to blend well.",
    color: "#2b7835", // green
    primarycolor: true
  }, 

  coconutwater: { 
    name: "Coconut water",
    amount: "3/4 cup",//"&frac34; Cup",
    cat: smoothieCats.liquid,
    type: ['liquid'],
    volume: 6, //in ounces
    nutrition:  {
      calories: 35,
      fatcals: 0,
      fat: 0,
      saturatedfat: 0,
      carb: 7,
      fiber: 2,
      sugar: 5,
      cholesterol: 0,
      protein: 1,
      sodium: 190
    } ,
    benefits: 'Coconut water adds a touch of sweetness',
    tips: "Use high speed to blend well.",
    color: "#ffffff",
    textColor: '#5F2F0F',
    primarycolor: false
  }, 


    chia: { 
    name: "Chia seeds",
    amount: "1 teaspoon",
    cat: smoothieCats.addon,
    type: ['fat'],
    volume: .25, //in ounces
    nutrition:  {
      calories: 15,
      fatcals: 10,
      fat: 1,
      saturatedfat: 0,
      carb: 2,
      fiber: 1,
      sugar: 0,
      cholesterol: 0,
      protein: 1,
      sodium: 0
    } ,
    benefits: 'Chia seeds give your smoothie great texture', 
    tips: "Drink smoothie immediately to prevent gelling.",
    color: "#7C6657", //blackish
    primarycolor: false
  }, 

  turmeric: { 
    name: "Turmeric (ground)",
    shortname: "Turmeric",
    details: '(ground)',
    amount: "1/4 teaspoon",//"&frac14; teaspoon",
    cat: smoothieCats.flavoring,
    type: ['flavoring'],
    volume: .0625, //in ounces
    nutrition:  {
      calories: 0,
      fatcals: 0,
      fat: 0,
      saturatedfat: 0,
      carb: 0,
      fiber: 0,
      sugar: 0,
      cholesterol: 0,
      protein: 0,
      sodium: 0
    } ,
    benefits: 'Turmeric gives your smoothie a shot of yellow coloring',
    tips: "",
    color: "#db9957", //orange yellow
    primarycolor: true
  }, 


   carrot: { 
    name: "Carrots",
    amount: "1/2 each or 1/4 cup shredded",//"&frac12; each or &frac14; Cup shredded",
    cat: smoothieCats.veggie,
    type: ['vegetable'],
    volume: 2,
    nutrition:  {
      calories: 10,
      fatcals: 0,
      fat: 0,
      saturatedfat: 0,
      carb: 2,
      fiber: 1,
      sugar: 1,
      cholesterol: 0,
      protein: 0,
      sodium: 15
    } ,
    benefits: 'Carrots add vitamin A',
    //tips: "",
    color: "#f08e24", // orange
    primarycolor: true
  },

  banana: { 
    name: "Banana",
    amount: "1/2 each or 1/4 cup mashed",//"&frac12; each or &frac14; cup mashed",
    cat: smoothieCats.fruit,
    type: ['fruit', 'base', 'cream'],
    volume: 2,
    nutrition:  {
      calories: 45,
      fatcals: 0,
      fat: 0,
      saturatedfat: 0,
      carb: 12,
      fiber: 1,
      sugar: 6,
      cholesterol: 0,
      protein: 1,
      sodium: 0
    } ,
    benefits: 'Bananas add a natural sweetness',
    tips: "Extra-ripe bananas will be sweeter",
    color: "#EFBD20", //yellowy
    primarycolor: true
  },

  raspberry: { 
    name: 'Raspberries',
    amount: "1/3 cup",//'&frac13; cup',
    cat: smoothieCats.fruit,
    volume: 2.667,
    type: ['fruit'],
    nutrition:  {
      calories: 20,
      fatcals: 0,
      fat: 0,
      saturatedfat: 0,
      carb: 6,
      fiber: 3,
      sugar: 2,
      cholesterol: 0,
      protein: 1,
      sodium: 0
    } ,
    benefits: 'Raspberries contribute fiber and Vitamin C',
    tips: '',
    color: "#F03D47",
    primarycolor: true
  },

  yogurt: {
    name: 'Yogurt (plain, lowfat)',
    shortname: 'Yogurt',
    details: '(plain, lowfat)',
    amount: "1/4 cup",//'&frac14; cup',
    volume: 2,
    cat: smoothieCats.addon,
    type: ['cream', 'base', 'dairy'],
    nutrition:  {
      calories: 35,
      fatcals: 5,
      fat: 1,
      saturatedfat: 0.5,
      carb: 4,
      fiber: 0,
      sugar: 4,
      cholesterol: 5,
      protein: 3,
      sodium: 40
    } ,
    benefits: 'Yogurt gives your smoothie calcium',
    tips: '',
    color: "#FFFFFF",
    textColor: "#95482B",
    primarycolor: false
  },

  almondmilk: {
    name: 'Almondmilk (unsweetened, plain)',
    shortname: 'Almondmilk',
    details: '(unsweetened, plain)',
    amount: "3/4 cup",//'&frac34; cup',
    volume: 6,
    cat: smoothieCats.liquid,
    type: ['liquid', 'cream', 'base', 'non-dairy', 'nuts'],
    nutrition:  {
      calories: 30,
      fatcals: 25,
      fat: 2.5,
      saturatedfat: 0,
      carb: 1,
      fiber: 0,
      sugar: 0,
      cholesterol: 0,
      protein: 1,
      sodium: 90
    } ,
    benefits: 'Almondmilk adds a delicious creaminess',
    tips: '',
    color: "#FFFFFF",
    textColor: '#B7A598',
    primarycolor: false
  },

  orange: {
    name: 'Orange',
    amount: "1/2 each or 1/3 cup chopped",//'&frac12; each or &frac13; cup chopped',
    volume: 2.667,
    cat: smoothieCats.fruit,
    type: ['fruit', 'citrus'],
    nutrition:  {
      calories: 15,
      fatcals: 0,
      fat: 0,
      saturatedfat: 0,
      carb: 4,
      fiber: 1,
      sugar: 3,
      cholesterol: 0,
      protein: 0,
      sodium: 0
    } ,
    benefits: 'Orange gives your smoothie a boost of vitamin C',
    tips: '',
    color: "#F69831",
    primarycolor: true
  },

  kale: {
    name: 'Kale',
    amount: "1/2 cup", //'&frac12; cup',
    volume: 4,
    cat: smoothieCats.veggie,
    type: ['veggie', 'greens', 'raw', 'vegan'],
    nutrition:  {
      calories: 15,
      fatcals: 0,
      fat: 0,
      saturatedfat: 0,
      carb: 3,
      fiber: 1,
      sugar: 0,
      cholesterol: 0,
      protein: 0,
      sodium: 15
    } ,
    benefits: 'Kale adds vitamins A, C and K.',
    tips: 'Use high speed to blend well',
    color: "#165930",
    primarycolor: true
  },

  oats: {
    name: 'Rolled oats',
    amount: '2 tablespoons',
    volume: 1,
    cat: smoothieCats.addon,
    type: ['grain', 'thickener'],
    nutrition:  {
      calories: 40,
      fatcals: 5,
      fat: 1,
      saturatedfat: 0,
      carb: 7,
      fiber: 1,
      sugar: 0,
      cholesterol: 0,
      protein: 2,
      sodium: 0
    } ,
    benefits: 'Rolled oats give your smoothie great body',
    tips: 'Blend well to incorporate thoroughly',
    color: "#A69C92",
    primarycolor: false
  }
};



//  Initiate Category List
//  Adds ingredient objects to their appropriate Category object
initCatList = function() {
  for(var i in this.smoothieIngredients) { 
      for (var c in this.smoothieCats){
        if (this.smoothieIngredients[i].cat == this.smoothieCats[c]) {
          this.smoothieCats[c].ingredients.push(i);
      }
    }
  }

  //sort
  for(var c in this.smoothieCats){
      this.smoothieCats[c].ingredients = this.smoothieCats[c].ingredients.sort();
  }
}

//helper sort function


displayIngredients = function() {
  var displayHTML = '';
  var swatchHTML = '';
  for (var c in this.smoothieCats){

    displayHTML+= '<div id="'+this.smoothieCats[c].name+'" class="catGroup" data-cat="'+this.smoothieCats[c].name+'"><div class="selectGroup"><h3 class="cat">'+this.smoothieCats[c].name+'s <span class="catAmount" data-cat="'+this.smoothieCats[c].name+'">(0)</span> </h3><div class="closeGroup"><i class="fa fa-chevron-circle-down"><span class="screenreader" data-cat="'+this.smoothieCats[c].name+'">Open'+this.smoothieCats[c].name+'s </span></i></div></div><p>'+this.smoothieCats[c].description+'</p>';
    for (var i in this.smoothieCats[c].ingredients){

        var ingVal = this.smoothieCats[c].ingredients[i];
        var ing =  smoothieIngredients[ingVal];
        var ingName = ing.name;
        if (ing.shortname){
          ingName = ing.shortname;
        }
      //displayHTML+='<p class="ingredientOption"><input type="checkbox" name="'+i+'" value="'+this.smoothieCats[c].ingredients[i].name+'"><label for="'+i+'">'+ this.smoothieCats[c].ingredients[i].name+'</p>'
      displayHTML+='<div class="ingredientOption" data-ing="'+ingVal+'"><div class="ingredientName">'+ingName+'</div><div class="wrapper"><div class="ingredientTools"><div class="remove" role="button" data-ing="'+ingVal+'">-</div><div class="count" role="" data-ing="'+ingVal+'">0</div><div role="" class="add" data-ing="'+ingVal+'">+</div></div></div>';
      displayHTML+='<div class="details"><div class="more">More Info</div><div class="ingredientDesc">';
        if(ing.details){
          displayHTML += '<p class="ingdetail">'+ing.details+'</p>';
        }
          
          //<br/><span class="serving">'+ing.amount+'</span>

      displayHTML += '<p class="serving">Serving Size: '+ing.amount+'</p>';

      if(ing.benefits){
        displayHTML += '<p>'+ing.benefits+'.</p>';
              }

    displayHTML+='</div></div></div>';
    }
    displayHTML+='</div>';
  }
  $("#ingredientOptions").append(displayHTML);
  $("#colorSwatch").append(swatchHTML);
}



} ( jQuery ));// Close Immediately Invoked Function Expression

