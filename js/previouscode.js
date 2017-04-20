// Listen for orientation changes
if(screen.width <= 767){
  //Add modal to inform users to use portrait mode
  $('body').append('<div id="overlayMobile"><p>The Smoothie Builder by Whole Foods Market is best enjoyed in a portrait orientation.</p></div>');

  window.addEventListener("orientationchange", function() {
    // Announce the new orientation number
    if(window.orientation(90)){
      // $('body').addClass('noscroll');
      $('#overlayMobile').addClass('visible');
    } else {
      $('#overlayMobile').removeClass('visible');
    }
  }, false);
}
    

  if(newIng.cat == smoothieCats.flavoring){
    smoothie.flavoringCount++;
    smoothie.flavorIngs[addIng] = newIng;
    
    if(smoothie.flavoringCount == 1){
      var ingredientY = bottomOfBottleY;
      //Add flavor container to smoothie, but only the first time.
      $("#blender").append('<svg class="ingContainer" id="flavorContainer" data-ing="flavors"></svg><svg id="flavorExpanded"></svg>');
      var flavorContainer = Snap("#flavorContainer");
      var flavorExpandedSnap = Snap("#flavorExpanded");
      var blenderSnap = Snap('#smoothieTool');

      var flavorIngRectangle = flavorExpandedSnap.rect(109, ingredientY, 220, 0).attr({
          fill: '#fff',
          id: 'flavorRect'
      });

    }

    var texty = 1;
    
    for (flavor in smoothie.flavorIngs){
        var flavorname = smoothie.flavorIngs[flavor].name;
        var flavorcount = smoothie.flavorIngs[flavor].inSmoothie;
        
        var newIngredientRectangle = flavorExpandedSnap.rect(109, 0, 220, 0).attr({
          id: flavor+'Container',
          "data-flavor": 'true',
          class: "ingContainer",
          fill: '#fff',
          "data-ing": flavor
        });
        
        var flavorText = flavorExpandedSnap.text(109, 0, flavorname + '('+flavorcount+')').attr({
          fill: smoothie.flavorIngs[flavor].color,
          id: flavor+'Text',
          "data-ing": flavor,
          opacity: 0,
          "font-family": "LeagueGothic",
          "font-size": "18px",
          "text-anchor": "middle"
        });

        //Get Y position for the Flavors box
        var ingredientY = bottomOfBottleY - (ingredientCountInSmoothie*ingredientHeight);
        var ingredientXpos = 109;
        ingredientXpos = blenderSnap.select('#ingredientsContainer').attr('x');

        var flavorIngRectangle = flavorContainer.rect(ingredientXpos, ingredientY, 220, 0).attr({
            id: "flavorGroup",
            class: "ingredientFill",
            fill: newIng.color,
            "data-ing": 'flavors'
        });

        newIngredientText.attr({
          fill: textColor,
          id: 'flavorText',
          "font-family": "LeagueGothic",
          "font-size": "18px",
          "text-anchor": "middle"
      });
    }

    var ingredientInfoGroup = flavorContainer.group(flavorIngRectangle, newIngredientText);

      ingredientsGroup.add(flavorContainer);
      var flavorContainer = Snap("#flavorContainer");
      var flavorExpandedSnap = Snap("#flavorExpanded");
      var blenderSnap = Snap('#smoothieTool');
      var flavorIngRectangle = flavorExpandedSnap.rect(205, 200, 220, 0).attr({
          fill: '#fff',
          id: 'flavorRect'
      });

  } else {

    var flavorContainer = Snap("#flavorContainer");
    var updateText = flavorContainer.select('#flavorText');

    setTimeout( function() { updateText.attr({ text: 'Flavorings ('+smoothie.flavoringCount+')'}) }, 150 );
    }

      var flavorContainer = Snap("#flavorContainer");
      var flavorExpandedSnap = Snap("#flavorExpanded");
      var blenderSnap = Snap('#smoothieTool');
      var texty = 1;
      var newX = flavorContainer.select('rect').getBBox().x;
      var textX = flavorContainer.select('rect').getBBox().x2 - flavorContainer.select('rect').getBBox().x;


      for (flavor in smoothie.flavorIngs){
        if($('#'+flavor+'Container').length >= 1){
          var updateFlavorText = flavorExpandedSnap.select('#'+flavor+'Text');
          setTimeout( function() { updateFlavorText.attr({ text: flavorname + '('+smoothie.flavorIngs[flavor].inSmoothie+')'}) }, 150 );
          continue;
        }

        var flavorname = smoothie.flavorIngs[flavor].name;

        var flavorcount = smoothie.flavorIngs[flavor].inSmoothie;
        var newIngredientRectangle = flavorExpandedSnap.rect(205, 200, 220, 0).attr({
          id: flavor+'Container',
          "data-flavor": 'true',
          class: "ingContainer flavorFill",
          fill: '#fff',
          "data-ing": flavor
        });
        
        var flavorText = flavorExpandedSnap.text(205, 200, flavorname + '('+flavorcount+')').attr({
          fill: smoothie.flavorIngs[flavor].color,
          id: flavor+'Text',
          "data-ing": flavor,
          opacity: 0,
          "font-family": "LeagueGothic",
          "font-size": "18px",
          "text-anchor": "middle"
        });
        texty++;
        flavorExpandedSnap.group(newIngredientRectangle, flavorText);
        ingredientsGroup.add(flavorExpandedSnap);
  }



////
    var flavorContainer = Snap.select('#flavorContainer');
    var down = false; 
    var newY = flavorContainer.select('rect').getBBox().y2;
    
    if (newY < 140) {
      down = true;
    }

    var newX = flavorContainer.select('rect').getBBox().x;
    var textX = flavorContainer.select('rect').getBBox().x2 - flavorContainer.select('rect').getBBox().x;
    $("#blender").append('<svg id="flavorExpanded"></svg>');
    var flavorExpandedSnap = Snap.select('#flavorExpanded');
    var flavorIngRectangle = flavorExpandedSnap.rect(newX, newY, 220, 0).attr({
          fill: '#fff',
          id: 'flavorRect'
      });

    
    var texty = 1;
    for (flavor in smoothie.flavorIngs){
      var flavorname = smoothie.flavorIngs[flavor].name;
      var flavorcount = smoothie.flavorIngs[flavor].inSmoothie;
      if(down){
        var newIngredientRectangle = flavorExpandedSnap.rect(newX, newY+(24*texty), 220, 30).attr({
        id: flavor+'Container',
        "data-flavor": 'true',
        class: "ingContainer",
        fill: '#fff',
        "data-ing": flavor
      });
    } else {
      var newIngredientRectangle = flavorExpandedSnap.rect(newX, newY-100+(24*texty), 220, 30).attr({
        id: flavor+'Container',
        "data-flavor": 'true',
        class: "ingContainer",
        opacity: 0,
        fill: '#fff',
        "data-ing": flavor
      });
    }
    
    if(smoothie.flavorIngs[flavor].shortname){
        flavorname = smoothie.flavorIngs[flavor].shortname;
    }
      
    var flavorText = flavorExpandedSnap.text(textX-20, newY-100 +24+(24*texty), flavorname + '('+flavorcount+')').attr({
          fill: smoothie.flavorIngs[flavor].color,
          id: flavor+'Text',
          "data-ing": flavor,
          opacity: 0,
          "font-family": "LeagueGothic",
          "font-size": "18px",
          "text-anchor": "middle"
      });
      texty++;
      flavorExpandedSnap.group(newIngredientRectangle, flavorText);
    }
var containerHeight = 28*(texty+1)
        var flavorText = flavorExpandedSnap.text(textX-40, newY-100+24, 'Flavorings');

      flavorExpandedSnap.group(flavorText);

      ingredientsGroup.add(flavorExpandedSnap);
        if(down){
    flavorIngRectangle.animate({
        height: containerHeight
      }, 1500, mina.bounce);
  } else {
      flavorIngRectangle.animate({
        height: containerHeight,
        y: newY-containerHeight,
      }, 1500, mina.bounce);
    }


/////////


function updateRecipeMeta() {
  if(($('head div').attr("itemtype") == "http://schema.org/Recipe") <= 0 ){
      $('head').append('<div itemscope itemtype="http://schema.org/Recipe"><span itemprop="name">Orange-Pineapple-Carrot Smoothie</span><span itemprop="description">Description of your recipe.</span><meta itemprop="url" content="http://myrecipesite.com/pineapple.html" /><span itemprop="recipeYield">Serves 1</span>Ingredients:<span itemprop="ingredients">ingredient 1</span>,<span itemprop="ingredients">ingredient 2</span>,<span itemprop="ingredients">ingredient 3</span>,<span itemprop="ingredients">ingredient 4</span>,<span itemprop="ingredients">add as many ingredient tags as you need</span>.Instructions:<span itemprop="recipeInstructions">Put the pineapple, ice, orange juice, carrot and banana in a blender. Blend until smooth.</span></div>'); 
  } else {
    $('head div').append('<div itemscope itemtype="http://schema.org/Recipe"><span itemprop="name">Orange-Pineapple-Carrot Smoothie</span><span itemprop="description">Description of your recipe.</span><meta itemprop="url" content="http://myrecipesite.com/pineapple.html" /><span itemprop="recipeYield">Serves 1</span>Ingredients:<span itemprop="ingredients">ingredient 1</span>,<span itemprop="ingredients">ingredient 2</span>,<span itemprop="ingredients">ingredient 3</span>,<span itemprop="ingredients">ingredient 4</span>,<span itemprop="ingredients">add as many ingredient tags as you need</span>.Instructions:<span itemprop="recipeInstructions">Put the pineapple, ice, orange juice, carrot and banana in a blender. Blend until smooth.</span></div>'); 
  }
}



    ///////////


//Alternate Drag functionality
Snap.plugin( function( Snap, Element, Paper, global ) {

  Element.prototype.altDrag = function() {
    this.drag( dragMove, dragStart, dragEnd );
    return this;
  }

  var dragStart = function ( x,y,ev ) {
    this.data('ot', this.transform().local );
  }

  
  var dragMove = function(dx, dy, ev, x, y) {
    var tdx, tdy;
    var snapInvMatrix = this.transform().diffMatrix.invert();
    snapInvMatrix.e = snapInvMatrix.f = 0;
    tdx = snapInvMatrix.x( dx,dy ); tdy = snapInvMatrix.y( dx,dy );
    this.transform( "t" + [ tdx, tdy ] + this.data('ot')  );

  }

  var dragEnd = function() {
  }
}); // close other functions

/////////
//Snap.svg plugins by svg.dabbles.info

//Relative Transform plugin
//Add ability to chain transformations (so that previous transform is not overwritten)
Snap.plugin( function( Snap, Element, Paper, global ) {
  Element.prototype.addTransform = function( t ) {
    return this.transform( this.transform().localMatrix.toTransformString() + t );
  };
});