//////////////////////////////////////////////////////////////////////
// Smoothie Builder by Whole Foods Market
// Smoothie Builder Functions
//////////////////////////////////////////////////////////////////////

// Blended, with love, by Laura (@ladysubrosa) //


(function($) {
  var s = Snap("#smoothieTool");

$(document).ready(function() {

    if(screen.width > 767){
      $('#smoothieToolContainer').animate({'min-height': $('#introScreen').height()+40+'px'},'fast');
    }
  
    //All Scripts loaded
    //Initiate Cat list, add to Dom
    initCatList();
    displayIngredients();
    $("#begin").removeClass('disabled');
    

    //Bind functionality to checkboxes
    $('.ingredientOption label').on('click', function(){
      var ele = $('[name='+$(this).attr('for')+']');
      if ($('[name='+$(this).attr('for')+']:checked').length) {
        ele.prop('checked', false);
        ele.change();
      } else {
        ele.prop('checked', true);
        ele.change();
      }
    
    });

    $('#pinSmoothieHome').on('click', function(e) {
      e.preventDefault();
        PinUtils.pinOne({
            media: '//assets.wholefoodsmarket.com/www/recipes/smoothies/sharables/smoothiesharable-green.jpg',
            description: 'Make Your Own Smoothie with the Smoothie Builder by Whole Foods Market!'
        });
    });

    $('.ingredientOption input').on('change', function() {
      var ing = $(this).attr('name');
      if(this.checked){
        addToSmoothie(ing); //if checked, add to smoothie
      } else {
        removeFromSmoothie(ing); //if unchecked, remove from smoothie
      }
    });

    $("body").on('click', '#blend, #blendMobile, #blendLink', function(){

      if(smoothie.volume <= 0){
        $('.smoothieStatus').addClass('warning');
        if(smoothie.flavoringCount > 0){
          $('.smoothieStatus').html('While those flavorings are delicious, you need to add other ingredients too.');
        } else{
          $('.smoothieStatus').html('You need to add some ingredients to your smoothie before blending.');
        }
        return false;
      } else {
        blendSmoothie();
      }
    });

    $("body").on('click', '#restart', function(){
      clearSmoothie();
      $("#builder").removeClass('complete');
      $("#smoothieToolContainer").removeClass('complete');
      if(screen.width < 768) {
          $('#smoothieBuilderBox').insertBefore('#options');
        }
      $('#smoothieToolContainer #builder').attr('style', 'min-height: '+ ($('#options').height()+60)+'px !important');
      $('#smoothieButtonsMobile').addClass('active');
      if(screen.width > 767){
        $('#smoothieToolContainer').animate({'min-height': ($('#builder').height() + 60)+'px'}, 'fast' );
      }
      $('.wholefoods-mobile-theme #builder').addClass('fixed');
      $('.wholefoods-mobile-theme body').addClass('noscroll');
    });

    $("body").on('click', '#editSmoothie', function(){
      $("#builder").removeClass('complete');
      $("#smoothieToolContainer").removeClass('complete');
              if(screen.width < 768) {
          $('#smoothieBuilderBox').insertBefore('#options');
        }
      $('#smoothieToolContainer #builder').attr('style', 'min-height: '+ ($('#options').height()+60)+'px !important');
        smoothie.blended = false;
        $("#blendedSmoothie").remove();
        animateUpdatedIngredients();
      $('#smoothieButtonsMobile').addClass('active');
      if(screen.width > 767){
        $('#smoothieToolContainer').animate({'min-height': ($('#builder').height() + 60)+'px'}, 'fast' );
      }
      $('.wholefoods-mobile-theme #builder').addClass('fixed');
      $('.wholefoods-mobile-theme body').addClass('noscroll');
    });


    $("body").on('click', '#reset, #resetMobile', function(){
      clearSmoothie();
    });

    $("body").on('click', '#begin, #introScreen', function(i){
        if(!$(i).hasClass('disabled')){
          $('#introScreen').removeClass('focus');
            if(screen.width > 767){
             $('#smoothieToolContainer').animate({'min-height': ($('#builder').height() + 40)+'px'}, 'fast' );
            }


          $('#smoothieButtonsMobile').addClass('active');
          $('#builder').addClass('focus');
          $('.wholefoods-mobile-theme #builder').addClass('fixed');
          $('.wholefoods-mobile-theme body').addClass('noscroll');
        }
    });

    $("body").on('click', '#builder', function(i){
        if(!$(i).hasClass('disabled') && !$('#builder').hasClass('focus')){
          $('#introScreen').removeClass('focus');
          if(screen.width > 767){
            $('#smoothieToolContainer').animate({'min-height': ($('#builder').height() + 40)+'px'}, 'fast' );
          }

          $('#smoothieButtonsMobile').addClass('active');
          $('#builder').addClass('focus');
          $('.wholefoods-mobile-theme #builder').addClass('fixed');
          $('.wholefoods-mobile-theme body').addClass('noscroll');
        }
    });

    $("body").on('click', '.reviewSmoothie', function(i){
        if($('#smoothieBuilderBox').hasClass('review')){
            $('#smoothieBuilderBox').removeClass('review');
            $('.reviewSmoothie').html('Show Blender');
           } else {
            $('#smoothieBuilderBox').addClass('review');
            $('.reviewSmoothie').html('Hide Blender');
          }
    });


    $('.ingredientOption .ingredientName').on('click', function() {
      var ing = $(this).parent('.ingredientOption').attr('data-ing');
        addToSmoothie(ing); //plus button adds to smoothie
    });

    $('.ingredientOption .add').on('click', function() {
      var ing = $(this).attr('data-ing');
        addToSmoothie(ing); //plus button adds to smoothie
    });




    $('.ingredientOption .remove').on('click', function() {
      var ing = $(this).attr('data-ing');
        removeFromSmoothie(ing); //minus button removes from smoothie
    });


    $('.ingredientOption .more').on('click', function() {
        var moreLink = $(this);
        if(moreLink.parent('.details').hasClass('active')){
            moreLink.parent('.details').removeClass('active');
            moreLink.html('More Info');
        } else {
            
            moreLink.parent('.details').addClass('active');
            moreLink.html('Less Info');
        }
    });

    $('.selectGroup').on('click', function() {
        var selectLink = $(this);
        var currentGroup = $(this).parents('.catGroup').attr("id");
        var groupEl = selectLink.parents('.catGroup');
        var datacat = $(this).attr('data-cat');

        $('.catGroup').each(function(){
            if($(this).attr("id") != currentGroup){
              $(this).removeClass('active');
              $(this).find(".closeGroup").html('<i class="fa fa-chevron-circle-down" data-cat="'+datacat+'"><span class="screenreader">Open '+datacat+'</span></i>');
            }
        });

        if(!groupEl.hasClass('active')){
            groupEl.addClass('active', function() {
            });              

            // setTimeout(function() { //wait 700ms for slide animation to finish
            //   position =  groupEl.offset().top + $('#ingredientOptions').scrollTop(); // groupEl.position().top;
            //   $('#ingredientOptions').animate({scrollTop: position}, '800');
            // }, 700);
            
            $(this).find(".closeGroup").html('<i class="fa fa-chevron-circle-up" data-cat="'+datacat+'"><span class="screenreader">Close '+datacat+'</span></i>');
              

        } else {

          $(this).find(".closeGroup").html('<i class="fa fa-chevron-circle-down" data-cat="'+datacat+'"><span class="screenreader">Open '+datacat+'</span></i>');
          groupEl.removeClass('active');

        }
    });


    

    $('body').on('mouseenter', '.ingContainer', function(){
        if($(this).attr('id') == 'flavorContainer' || $(this).attr('id') == 'flavorExpanded'){
          Snap('#flavorText').attr({ text: 'See All'});
        } else {
        showIngredientActions($(this));
      }
    });

    $('body').on('mouseleave', '.ingContainer', function(){
      if($(this).attr('id') != 'flavorContainer'){
        hideIngredientActions($(this));
      }
    });


    $('body').on('click', '#flavorContainer', function(){
      //expand flavors
      if($("#flavorExpanded").attr('class') == 'open') {
        collapseFlavorsBox();
      } else {
        expandFlavorsBox();
      }
    });

    $('body').on('click', '.closeFlavors', function() {
      collapseFlavorsBox();
    });



   $('body').on('click', '.removeThis', function(){
        removeFromSmoothie($(this).attr('data-ing'), $(this).parents('svg.ingContainer')[0]);
    });

   $('.tweet').click(function(e){
        e.preventDefault();
        window.open($(this).attr('href'), "", "width=600, height=400");
   });



});

  //Global Variables
   var bottomOfBottleY = parseInt(Snap.select("#ingredientsContainer").attr("height")) + parseInt(Snap.select("#ingredientsContainer").attr("y"));
  var ingredientHeight = 40;

  var currentIngredient = 0;
  var ingredientSmall = "171.194,266.788, 40.695,266.788, 41.373,244.964, 172.028,244.964"; // snap points
  var ingredientFilled = "171.194,266.788, 40.695,266.788, 32.373,54.964, 181.028,54.964"; // snap points

  var blenderBottleMask = Snap.select("#blender #blended");
  var ingredientsGroup = s.group(Snap.select("#blender #ingredientsContainer"));
  var emailMsg = '';

  var smoothieNutrtitionString = '';
  var noflavors = true;
  var expandFlavors = false;
  ingredientsGroup.attr({
    mask: blenderBottleMask
    //"color-interpolation": "linearRGB"
  });

  var ouncesleft = ingredientLimit;
  var totalCalories = 0;
  var fatCalories = 0;
  var fatGrams = 0;
  var carbGrams = 0;
  var saturatedFat = 0;
  var fiberGrams = 0;
  var sugarGrams = 0;
  var cholesterol = 0;
  var sodiumGrams = 0;
  var proteinGrams = 0;
  var resultsMsg = 'Get started making your smoothie!';
  var pinMsg = 'Create your own smoothie recipe with the Smoothie Builder by Whole Foods Market';
  var smoothieNiceDescription = 'You have not made your smoothie yet. Why not get started at WholeFoodsMarket.com/Smoothie?';
  var shoppingList = '';

  var colorSharables = ['#4A2B63', '#4DA519', '#C1713A', '#E21B63', '#8E806C', '#FFFDA0' ];
  var shareableImgs = ['smoothiesharable-purple.jpg', 'smoothiesharable-green.jpg', 'smoothiesharable-orange.jpg',  'smoothiesharable-pink.jpg', 'smoothiesharable-brown.jpg', 'smoothiesharable-yellow.jpg' ];

  //DEFAULT META URL FOR PINTEREST. CURRENTLY INCLUDES DUMMY DATA AND OLD URL. UPDATE WHEN REAL DATA KNOWN
  //LAST UPDATED 9/18/15
  var defaultPinURL = '//www.pinterest.com/pin/create/button/?url=http%3A%2F%2Fpreview.wholefoodsmarket.com%2Fsmoothie&media=http%3A%2F%2Fassets.wholefoodsmarket.com%2Fwww%2Frecipes%2Fsmoothies%2Fsharables%2Fsmoothiesharable-green.jpg&description=Make%20your%20own%20smoothie';

  var ingredientCountInSmoothie = 0;
  var ingredientLimit = 16; // No more than 16oz of ingredients. Consider refactoring to ingredients per group

function addToSmoothie(addIng){


  if(smoothie.blended){
    return false;
  }

  var newIng = smoothieIngredients[addIng];
  var projectedVolume = Math.round(newIng.volume + smoothie.volume);
  //console.log(smoothie.volume);
 
  if(projectedVolume > ingredientLimit) {

        $('.smoothieStatus').removeClass('warning');
        $('.smoothieStatus').addClass('error').addClass('hightight');
        $('.smoothieStatus').html('This ingredient will overfill your smoothie!'); 
          //You only have <span id="ouncesleft">'+ouncesleft+'</span> ounces left!');
        $('.smoothieStatus').delay('300').removeClass('highlight');
    return false;
  } 


  //Add to Smoothie with cute animation
  ingredientCountInSmoothie++
  smoothie.ingredients[addIng] = newIng;

  if(!smoothie.catAmounts[newIng.cat.name]){
    smoothie.catAmounts[newIng.cat.name] = 1;
  } else {
    smoothie.catAmounts[newIng.cat.name]++;
  }


  $('.catAmount[data-cat="'+newIng.cat.name+'"]').html('('+smoothie.catAmounts[newIng.cat.name]+')');

  //console.log(smoothie.volume);

      var textColor = '#fff';
      var ingName = newIng.name;

    if(newIng.textColor != null){
      //console.log("text color is "+ newIng.textColor );
      textColor = newIng.textColor;
    }

    if(newIng.shortname != null) {
     // console.log("The shortname is: " + newIng.shortname);
      ingName = newIng.shortname;
    }


  
  //Add to Calories
  totalCalories += newIng.nutrition.calories;
  fatCalories += newIng.nutrition.fatcals;
  fatGrams += newIng.nutrition.fat;
  carbGrams += newIng.nutrition.carb;
  saturatedFat += newIng.nutrition.saturatedfat;
  fiberGrams += newIng.nutrition.fiber;
  sugarGrams += newIng.nutrition.sugar;
  cholesterol += newIng.nutrition.cholesterol;
  sodiumGrams += newIng.nutrition.sodium;
  proteinGrams += newIng.nutrition.protein;
      if(!newIng.inSmoothie) {
        newIng.inSmoothie = 1;
    } else {
        newIng.inSmoothie++;
    }

    $('.count[data-ing='+addIng+']').html(newIng.inSmoothie);
    if(newIng.inSmoothie == 1){
        $('.ingredientOption[data-ing='+addIng+'] .ingredientTools').addClass('active');
    }
     

  //only add to volume and smoothie graphic if not flavoring. 
  //if flavoring, add to flavoring box (todo)
  
  if(newIng.cat != smoothieCats.flavoring){

    smoothie.volume += newIng.volume;
    $("#blender").append('<svg class="ingContainer" id="'+addIng+'Container'+newIng.inSmoothie+'" data-ing="'+addIng+'"></svg>');
    var newIngContainer = Snap("#"+addIng+"Container"+newIng.inSmoothie);
    var blenderSnap = Snap('#smoothieTool');
    //Get Y position for the New Ingredient
    var ingredientY = bottomOfBottleY - (ingredientCountInSmoothie*ingredientHeight);
    var ingredientXpos = 109;
    ingredientXpos = blenderSnap.select('#ingredientsContainer').attr('x');

    var newIngredientRectangle = newIngContainer.rect(ingredientXpos, ingredientY+ingredientHeight, 220, 0).attr({
      id: "ingredient" + addIng,
      class: "ingredientFill",
      fill: newIng.color,
      "data-ing": addIng
    });

    var newIngredientText = newIngContainer.text(205, ingredientY+30, ingName);

    newIngredientText.attr({
      fill: textColor,
      "font-family": "LeagueGothic",
      "font-size": "18px",
      "text-anchor": "middle"
    });

    var ingredientInfoGroup = newIngContainer.group(newIngredientRectangle, newIngredientText);

    ingredientsGroup.add(newIngContainer);

  } else {

    smoothie.flavoringCount++;
    smoothie.flavorIngs[addIng] = newIng;

    if(smoothie.flavoringCount == 1){    
        $("#blender").append('<svg class="ingContainer" id="flavorContainer" data-ing="flavors"></svg>');
      var newIngContainer = Snap("#flavorContainer");
      var blenderSnap = Snap('#smoothieTool');
      
      //Get Y position for the New Ingredient
      var ingredientY = bottomOfBottleY - (ingredientCountInSmoothie*ingredientHeight);
      var ingredientXpos = 109;
      ingredientXpos = blenderSnap.select('#ingredientsContainer').attr('x');

      var newIngredientRectangle = newIngContainer.rect(ingredientXpos, ingredientY+ingredientHeight, 220, 0).attr({
        id: "ingredientFlavor",
        class: "ingredientFill",
        fill: newIng.color,
        "data-ing": 'flavors'
      });

      var newIngredientText = newIngContainer.text(205, ingredientY+30, 'Flavorings ('+smoothie.flavoringCount+')');

      newIngredientText.attr({
        id: 'flavorText',
        fill: textColor,
        "font-family": "LeagueGothic",
        "font-size": "18px",
        "text-anchor": "middle"
      });


      var ingredientInfoGroup = newIngContainer.group(newIngredientRectangle, newIngredientText);

      ingredientsGroup.add(newIngContainer);
    }
  }
    animateUpdatedIngredients();

}


function removeFromSmoothie(removeIng, removeIngEl){


  var oldIng = smoothieIngredients[removeIng];
    if(!oldIng.inSmoothie || oldIng.inSmoothie == 0) {
      return false; //Not in smoothie to remove
    }

    if(ingredientCountInSmoothie == 0) {
      return false;
    }

  //If removeIngEl is present, remove specific ingredient
  if(removeIngEl){
    removeIngEl.remove();
  } else { 

  //only remove from smoothie graphic if not flavoring. 
  //if flavoring, remove from flavoring box (todo)
  if(oldIng.cat != smoothieCats.flavoring){
      Snap.select('.ingContainer[data-ing='+removeIng+']').remove();
      } else {
          smoothie.flavoringCount--;
          if(smoothie.flavoringCount == 0){
              $('#flavorContainer').remove();
              $('#flavorExpanded').remove();
          } else {
              if(oldIng.inSmoothie == 1){
                Snap.select('#'+removeIng+'Container').remove();
              }
              var flavorContainer = Snap("#flavorContainer");
              var updateText = flavorContainer.select('#flavorText');
              setTimeout( function() { updateText.attr({ text: 'Flavorings ('+smoothie.flavoringCount+')'}) }, 150 );
          }

      }
  }

    oldIng.inSmoothie = oldIng.inSmoothie -1;
        if(oldIng.inSmoothie == 0){
        delete smoothie.ingredients[removeIng];
        if(oldIng.cat == smoothieCats.flavoring){
          delete smoothie.flavorIngs[removeIng];
        }
    }
    ingredientCountInSmoothie = ingredientCountInSmoothie-1;
    $('.count[data-ing='+removeIng+']').html(oldIng.inSmoothie);

    if(oldIng.inSmoothie === 0){
        $('.ingredientOption[data-ing='+removeIng+'] .ingredientTools').removeClass('active');
    }

  //only remove from volume if not flavoring. 
  if(oldIng.cat != smoothieCats.flavoring){
    smoothie.volume = smoothie.volume - oldIng.volume;
  }



    //Remove from Calories
    totalCalories -= oldIng.nutrition.calories;
    fatCalories -= oldIng.nutrition.fatcals;
    fatGrams -= oldIng.nutrition.fat;
    carbGrams -= oldIng.nutrition.carb;
    saturatedFat -= oldIng.nutrition.saturatedfat;
    fiberGrams -= oldIng.nutrition.fiber;
    sugarGrams -= oldIng.nutrition.sugar;
    cholesterol -= oldIng.nutrition.cholesterol;
    sodiumGrams -= oldIng.nutrition.sodium;
    proteinGrams -= oldIng.nutrition.protein;
    animateUpdatedIngredients();
      if(!smoothie.catAmounts[oldIng.cat.name]){

      smoothie.catAmounts[oldIng.cat.name] = 0;
  } else {
    smoothie.catAmounts[oldIng.cat.name]--;
  }

  

  $('.catAmount[data-cat="'+oldIng.cat.name+'"]').html('('+smoothie.catAmounts[oldIng.cat.name]+')');

}


//Function to toggle extra functionality within added smoothie ingredients
// ie "Remove this" button
function showIngredientActions(ingFill) {

  var ing = ingFill.attr("data-ing");
    var xpos, ypos;
  var textColor = '#fff';
  var ingObject = $('#'+ingFill.attr('id'));


    var ingSnap = Snap.select('#'+ingFill.attr('id'));

    if(ingFill.attr("data-flavor")){
      textColor = smoothieIngredients[ing].color;
    } else {
    
    if(smoothieIngredients[ing].textColor){
      textColor = smoothieIngredients[ing].textColor;
    }
  }

  
  if(ingObject.parent().find('.removeThis[data-ing='+ing+']').length === 0){ /* only show if doesn't already have actions visible */
     //append x

     var textSnap = ingSnap.select('text');

     xpos = textSnap.attr("x") - 60;
     ypos = textSnap.attr("y");

    var removeText = ingSnap.text(xpos, ypos, "X");
    removeText.attr({
      fill: textColor,
      "font-family": "LeagueGothic",
      "font-size": "18px",
      "text-anchor": "left",
      'data-ing': ing,
      'opacity': 1,
      'class' : 'removeThis',
    });
     textSnap.after(removeText);
   } 
}

function expandFlavorsBox (){
  var flavorSnap = Snap.select('#flavorExpanded');
  $('#flavorExpanded').css('display', 'inline');
  flavorSnap.select('rect').animate({
    width: 220,
  }, 500, mina.bounce, function(){
    $('#flavorExpanded').attr('class', 'open');
  });
}

function collapseFlavorsBox(){

  var flavorSnap = Snap.select('#flavorExpanded');
  $('#flavorExpanded').attr('class', '');
  flavorSnap.select('rect').animate({
    width: 0
  }, 500, mina.bounce, function() {
    $('#flavorExpanded').css('display', 'none');
  });
}



function hideIngredientActions(ingFill) {


    var ing = ingFill.attr('data-ing');
    ingFill.parent().find('.removeThis[data-ing='+ing+']').remove();
}


//Animation to Update Ingredients Smoothie Graphic
function animateUpdatedIngredients () {
  var yequation, prevY, prevHeight = 0;
  var ingredientHeight = parseInt((100/ingredientLimit) * (210/100));


    Snap.selectAll(".ingredientFill").forEach(function(i, index){
    if(i.attr("data-ing") != 'flavors'){

      //update other ingredients normally
      var ingnum = index + 1;
      var ingVol = smoothieIngredients[i.attr("data-ing")].volume;
      ingredientHeight = parseInt((100/ingredientLimit) * (210/100)) * ingVol;


      if(ingredientHeight <= 24 ){
            ingredientHeight = 24; // smallest possible height
      }
      yequation = bottomOfBottleY - (ingredientHeight + prevHeight);
      i.animate({
        y: yequation,
        height: ingredientHeight
      }, 1500, mina.bounce);


      i.parent().select('text').animate({
        y: yequation + 20
      }, 1500, mina.bounce);

      prevY = yequation;
      prevHeight += ingredientHeight;
    } else {

      //special animation for flavors
      var ingnum = index + 1;
      ingredientHeight = 24;
      yequation = bottomOfBottleY - (ingredientHeight + prevHeight);
      i.animate({
        y: yequation,
        height: ingredientHeight
      }, 1500, mina.bounce);

      var flavorContainer = Snap("#flavorContainer");
      var updateText = flavorContainer.select('#flavorText');

      setTimeout( function() { updateText.attr({ text: 'Flavorings ('+smoothie.flavoringCount+')'}) }, 150 );
      

      i.parent().select('text').animate({
        y: yequation + 20
      }, 1500, mina.bounce);

      var prevflavorY = 0;
      
      Snap.selectAll('.flavorFill').forEach(function(i, index){

        var bottomOfContainerY = yequation;
        var flavorNum = index + 1;
        var flavorHeight = 24;


        flavoryequation = bottomOfContainerY - (flavorHeight * flavorNum);

        
        i.animate({
          y: flavoryequation,
          height: flavorHeight
        }, 500, mina.bounce);


        i.parent().select('text').animate({
          y: flavoryequation
        }, 500, mina.bounce);

        prevflavorY = flavoryequation;

      });

      prevY = yequation;
      prevHeight += ingredientHeight;
    }
  }); // End ingFill loop


  //Handle animation for individual flavors in an expanded, separate section
  if(smoothie.flavoringCount > 0){

    //If the FlavorExpanded SVG doesn't exists, add it
    if(!Snap("#flavorExpanded")){

       $("#blender").append('<svg id="flavorExpanded" data-ing="flavors"></svg>');

      var flavorExpandedSnap = Snap("#flavorExpanded");
      var flavorContainer = Snap("#flavorContainer");

       var flavorIngRectangle = flavorExpandedSnap.rect(109, Snap("#blended").getBBox().y, 0, 240).attr({
        fill: '#fff',
        id: 'flavorRect'
      });

      var buttonToReturn = flavorExpandedSnap.rect(109, Snap("#blended").getBBox().y, 220, 60).attr({
        fill: '#fff',
        'class': 'closeFlavors'
      });

      var flavorText = flavorExpandedSnap.text(205, flavorIngRectangle.getBBox().y+40, 'Return to Smoothie').attr({
        fill: '#169431',
        'class': 'closeFlavors',
        "font-family": "LeagueGothic",
        "font-size": "22px",
        "text-anchor": "middle"
      });
    } 

    var flavorExpandedSnap = Snap("#flavorExpanded");
    var flavorContainer = Snap("#flavorContainer");

    if(flavorContainer){

      var texty = 0;
      var newX = flavorContainer.select('rect').getBBox().x;
      var textX = flavorContainer.select('rect').getBBox().x2 - flavorContainer.select('rect').getBBox().x;

      //For Each flavor, add a new SVG container
      for (flavor in smoothie.flavorIngs){
          //Update name appropraitely
          var flavorname = smoothie.flavorIngs[flavor].name;
          var flavorcount = smoothie.flavorIngs[flavor].inSmoothie;
          if(smoothie.flavorIngs[flavor].shortname){
            flavorname = smoothie.flavorIngs[flavor].shortname;
          }


          if(Snap('#'+flavor+'Container')){
            Snap('#'+flavor+'Container').remove();
          }

          //Create SVG container for each flavor
          $('#blender').append('<svg id="'+flavor+'Container" class="ingContainer" data-ing="'+flavor+'" data-flavor="true"></svg>');

          var flavorSnap = Snap.select('#'+flavor+'Container');
          var flavorYfill = Snap("#blended").getBBox().y + (30*texty) + 60;
          var flavorYfillText = flavorYfill + 20;

          var newFlavorRectangle = flavorSnap.rect(109, flavorYfill, 220, 30).attr({
                "data-flavor": 'true',
                class: "flavorFill",
                fill: '#fff',
                "data-ing": flavor
              });

            var flavorText = flavorSnap.text(205, flavorYfillText, flavorname + '('+flavorcount+')').attr({
                  fill: smoothie.flavorIngs[flavor].color,
                  id: flavor+'Text',
                  "data-ing": flavor,
                  "data-flavor": 'true',
                  class: "flavorFillText",
                  "font-family": "LeagueGothic",
                  "font-size": "18px",
                  "text-anchor": "middle"
                });
            texty++;
            flavorExpandedSnap.group(flavorSnap);
          }
        } // End Flavor loop

      ingredientsGroup.add(flavorExpandedSnap);

    } //End Flavor if/else

      //remove empty g tags
  $('#flavorExpanded g').each(function(index, item) {
    if($.trim($(item).text()) === "") {
        $(item).remove();
    }
  });


    updateResultsMsg();
    resultsMsg = updateResultsMsg();

        //Update Text for Nutrition Information

    $(".calories").html(totalCalories + " calories");
    $(".caloriesfromfat").html(fatCalories);
    $(".fat").html(fatGrams + "g");
    $(".sugar").html(sugarGrams + "g");
    $(".carbs").html(carbGrams + "g");
    $(".fiber").html(fiberGrams + "g");
    $(".cholesterol").html(cholesterol + "mg");
    $(".protein").html(proteinGrams + "g");
    $(".sodium").html(sodiumGrams + "mg");
    $(".saturatedfat").html(saturatedFat + "g");

    $("#message").html('<p>'+resultsMsg+'</p>');

    $("#messagePrint").html('<p>'+resultsMsg+'</p>');

    smoothieNutrtitionString = totalCalories+' calories ('+fatCalories +' from fat), '+fatGrams+'g total fat ('+saturatedFat+'g saturated fat), '+cholesterol+'mg cholesterol, '+sodiumGrams+'g sodium, '+carbGrams+'g carbohydrates ('+fiberGrams+'g dietary fiber, '+sugarGrams+'g sugar), '+proteinGrams+'g protein.';


    ouncesleft = Math.round((ingredientLimit-smoothie.volume)*100)/100;
    // var fraction = toFraction(ouncesleft);
    // if(fraction){
    //   if(Math.floor(ouncesleft) == 0){
    //     ouncesleft = fraction;
    //   }else {
    //   ouncesleft = Math.floor(ouncesleft) +' ' + fraction;
    //   }
    // } else {
    //   ouncesleft = Math.round(ouncesleft);
    // }


    if(Math.round(smoothie.volume) == ingredientLimit){
        $('.smoothieStatus').addClass('highlight');
        $('.smoothieStatus').removeClass('error').removeClass('warning');
        $('.smoothieStatus').html('You\'re ready to blend! <span id="blendLink">Get your recipe and nutritional info now.</span>');
        $('.smoothieStatus').delay('300').removeClass('highlight');
    // } else if(smoothie.volume > 12) {
    //     $('.smoothieStatus').addClass('warning');
        // if(smoothie.volume >= 15){
        //   $('.smoothieStatus').html('You only have <span id="ouncesleft">'+ouncesleft+'</span> ounce left!');
        // } else {
        //   $('.smoothieStatus').html('You only have <span id="ouncesleft">'+ouncesleft+'</span> ounces left!');
        // }
    } else {
      $('.smoothieStatus').removeClass('warning').removeClass('error');
      $('.smoothieStatus').html('Choose up to 2 cups of ingredients to build your perfect smoothie.');
      //convertOunces(ouncesleft);
    }
    
    updatePinterestMeta();
    
}


//Generate a shopping list based on user selected ingredients
function updateShoppingList(){
  var shoppingList = '';
  var shoppingListHTML = '<h3>Shopping List</h3><ul>';
    
    for(ing in smoothie.ingredients){
      //Set Name for ingredient Results string. Use shortname if available.
      ingName = smoothie.ingredients[ing].name;
      if(smoothie.ingredients[ing].shortname){
        ingName = smoothie.ingredients[ing].shortname;
      }

      //Set amount of servings for this ingredient.
      //Adjust copy if ingredient is single or plural
      ingAmount = smoothie.ingredients[ing].inSmoothie;
      servingsPlural = 'serving';
      if(ingAmount > 1){
        servingsPlural = 'servings';
      }

      shoppingListHTML += '<li>' +ingName +' - '+ smoothie.ingredients[ing].inSmoothie + ' ' + servingsPlural +' ('+smoothie.ingredients[ing].amount+' per serving)</li>';
      shoppingList += ingName +' - '+ smoothie.ingredients[ing].inSmoothie + ' ' + servingsPlural +' ('+smoothie.ingredients[ing].amount+" per serving) \r\n";
    }

  shoppingListHTML += '</ul>'

  $('.shoppingList').html(shoppingListHTML);
  return shoppingList;
}


//Generate a user-friendly message about the Smoothie
function updateResultsMsg() {
  var updatedMsg = '';
  pinMsg = '';
  var ingName, ingAmount, servingsPlural, ingBenefits;
  //var benefitsHelperCopy = ['This blend has some great nutritional benefits!', 'You really know how to blend them!', 'Your smoothie will be delicious and nutritious.'];
  // var benefitsHelperCopy2 = ['Finally, ', 'Last but not least, ', 'Not to mention that '];
  var benefitsCount = 0;
  var ingCount = Object.size(smoothie.ingredients);
  var index = 0;
  //console.log('ing count is : ' + ingCount);
  
  var smoothieContents = '';
  var smoothieBenefits = ''; //benefitsHelperCopy[Math.floor(Math.random() * benefitsHelperCopy.length)]+' ';

  for(ing in smoothie.ingredients){
    index++;

    //Set Name for ingredient Results string. Use shortname if available.
    ingName = smoothie.ingredients[ing].name;
    if(smoothie.ingredients[ing].shortname){
      ingName = smoothie.ingredients[ing].shortname;
    }

    //Set amount of servings for this ingredient.
    //Adjust copy if ingredient is single or plural
    ingAmount = smoothie.ingredients[ing].inSmoothie;
    // servingsPlural = 'serving';
    // if(ingAmount > 1){
    //   sergingsPlural = 'servings';
    // }

    //Initiate this ingredients benefits.
    ingBenefits = '';
    if(smoothie.ingredients[ing].benefits){
      ingBenefits = smoothie.ingredients[ing].benefits;
    }

    //Check if this is last ingredient in loop. Adjust copy accordingly.
    if (index == ingCount){
      if(index == 1){
        smoothieContents += ingName.toLowerCase();
        continue;
      }

      if(index == 2){
        smoothieContents += ' and ' + ingName.toLowerCase();
        continue;
      }

        smoothieContents += ' and ' + ingName.toLowerCase() + '';
        if(ingBenefits != ''){
          if(ingCount > 1){
              //smoothieBenefits += benefitsHelperCopy2[Math.floor(Math.random() * benefitsHelperCopy.length)]+' ';
          } 
          smoothieBenefits += ingBenefits+'.';
        }
      } else {
        //console.log("total count is "+ ingCount);
        //console.log("index is "+ index);
        if((index + 1) == ingCount){ 
          smoothieContents += ingName.toLowerCase();
        } else {
          smoothieContents += ingName.toLowerCase() + ', ';
        }
        
        if(ingBenefits != ''){
            //if there are more than 4 ingredients, don't print benefits for all of them. Randomize whether it's printed.
            if(ingCount > 4){
                if(Math.random() > .5){
                  smoothieBenefits += ingBenefits + '. ';
                }
            } else {
              smoothieBenefits += ingBenefits + '. ';
            }
          }
        
    }
  }    //End Loop


  updatedMsg = 'Your smoothie has '+smoothieContents+'. '+smoothieBenefits;
  pinMsg = 'My smoothie has '+smoothieContents;
  return updatedMsg;
}


//Update color of the print smoothie
function updatePrintContent() {
  $("#blendedPrint").attr("fill", smoothie.color);
};

function blendSmoothie () {
  //animate mask - TODO
  //animate colors

  var colorA, colorB, newColor, colorC;
  var colorArray = [];

  if(Object.keys(smoothie.ingredients).length >= 2){

    for(ing in smoothie.ingredients){
      for(i=1; i<=smoothie.ingredients[ing].inSmoothie; i++){
        // console.log('round: '+i+' of ' + ing);
            if(colorA == null || colorA.length == 0){
                colorA = smoothie.ingredients[ing].color;
                newColor = colorA;
                colorArray.push(colorA);
                           //$('#rawColorsInOrder').append('<div style="background: '+newColor+'; color: #fff; width: 200px; height: 100px; padding: 10px; display: inline-block; margin: 10px; vertical-align: top">Color is round '+i+' of '+ing+'</div>');
                continue;
            } else {
                colorB = smoothie.ingredients[ing].color;
                colorArray.push(colorB);

            }

            newColor = rybColorMixer.mix(colorA, colorB);

                          //$('#rawColorsInOrder').append('<div><div style="background: '+colorA+'; color: #fff; width: 200px; height: 100px; padding: 10px; display: inline-block; margin: 10px; vertical-align: top">Color A '+i+' of '+ing+'</div><div style="background: '+colorB+'; color: #fff; width: 200px; height: 100px; padding: 10px; display: inline-block; margin: 10px; vertical-align: top">Color B '+i+' of '+ing+'</div></div>');
            
            colorA = '#'+newColor;
            // console.log("color a is now: "+ colorA);
            newColor = "#"+newColor;
            //$('#colorSwatch').append('<div style="background: '+newColor+'; color: #fff; width: 200px; height: 100px; padding: 10px; display: inline-block; margin: 10px; vertical-align: top">Round '+i+' of '+ing+'</div>');
          }
    }
  } else {
      for(ing in smoothie.ingredients){
        newColor = smoothie.ingredients[ing].color;
      }
                  //$('#colorSwatch').append('<div style="background: '+newColor+'; color: #fff; width: 200px; height: 100px; padding: 10px; display: inline-block; margin: 10px; vertical-align: top">Only one color for '+ing+'</div>');
  }
      var altnewColor = rybColorMixer.mix(colorArray);
       //$('#colorSwatch').append('<div style="background: #'+altnewColor+'; color: #fff; width: 200px; height: 100px; padding: 10px; display: inline-block; margin: 10px; vertical-align: top">Alt new Color</div>');
  

      $("#blender").append('<svg id="blendedSmoothie"></svg>');
      var blended = Snap("#blendedSmoothie");
      // console.log("The new color is "+newColor);
      $('#builder').addClass('complete');
      $("#smoothieToolContainer").addClass('complete');
        if(screen.width < 768) {
          $('#smoothieBuilderBox').insertBefore('#builder');
        }
      $('.review').removeClass('review');
      $('.reviewSmoothie').html('Show Blender');
      $('#smoothieToolContainer.complete').attr('style', 'min-height: '+ ($('#results').height()+60)+'px !important');
      $('#smoothieToolContainer.complete #builder').attr('style', 'min-height: '+ ($('#results').height()+40)+'px !important');
      $('#smoothieButtonsMobile').removeClass('active');
      $('.wholefoods-mobile-theme #builder').removeClass('fixed');
      $('.wholefoods-mobile-theme body').removeClass('noscroll');
      if(screen.width > 767){
        $('#smoothieToolContainer').animate({'min-height': ($('#builder').height() + 60)+'px'}, 'fast' );
      }
      var blendRectangle = blended.rect( 109, 55, 220, 0).attr({
          class: "blended",
          fill: newColor
      });
        ingredientsGroup.add(blended);
        blendRectangle.attr({
          height: 256
        });
      smoothie.color = newColor;
                  //$('#colorSwatch').append('<div style="background: '+smoothie.color+'; color: #fff; width: 200px; height: 100px; padding: 10px; display: inline-block; margin: 10px; vertical-align: top">Final Color</div>');
      smoothie.blended = true;
      updatePinterestMeta();
      emailSmoothie();
      updatePrintContent();

  //update results string
}

//Clear out all smoothie data
//Remove elements from smoothie graphic
//Zero out all nutrition and volumes
//Remove ingredietns from smoothie object
function clearSmoothie() {
  smoothie.ingredients = {};
  smoothie.volume = 0;
  smoothie.blended = false;
  noflavors = true;
  smoothie.flavoringCount = 0;
  smoothie.flavorIngs = {};
  smoothie.catAmounts = {};
  $(".count").html("0");
  ingredientCountInSmoothie = 0;
  $(".ingContainer").remove();
  $(".ingredientTools").removeClass('active');
  $("#blendedSmoothie").remove();
  $(".details").removeClass('active');
  $('.review').removeClass('review');
  $('.reviewSmoothie').html('Show Blender');
  $('.catGroup').each(function(){
      var datacat = $(this).attr('data-cat');
      $(this).removeClass('active');
      $(this).find(".closeGroup").html('<i class="fa fa-chevron-circle-down" data-cat="'+datacat+'"><span class="screenreader">Open '+datacat+'</span></i>');
  });

  smoothie.nutrition = {};

  for(ing in smoothieIngredients){
    smoothieIngredients[ing].inSmoothie = 0;
  }

  resultsMsg = "Blend your new smoothie";
  pinMsg = 'Create your own smoothie recipe with the Smoothie Builder by Whole Foods Market!';
    //Update Text for Nutrition Information
    totalCalories = 0;
    fatGrams = 0;
    carbGrams = 0;
    sodiumGrams = 0;
    fatCalories = 0;
    cholesterol = 0;
    saturatedFat = 0;
    fiberGrams = 0;
    sugarGrams = 0;
    proteinGrams = 0;
    ouncesleft = ingredientLimit;
    $(".calories").html(0 + " calories");
    $(".caloriesfromfat").html(0);
    $(".fat").html(0 + "g");
    $(".sugar").html(0 + "g");
    $(".carbs").html(0 + "g");
    $(".fiber").html(0 + "g");
    $(".cholesterol").html(0 + "g");
    $(".protein").html(0 + "g");
    $(".sodium").html(0 + "g");
    $(".saturatedfat").html(0+'g');
    $('.smoothieStatus').removeClass('warning error');
    $('.smoothieStatus').html('Choose up to 2 cups of ingredients to build your perfect smoothie.');
    $("#message").html(resultsMsg);
    $("#messagePrint").html(resultsMsg);
    $('.catAmount').html('(0)');
    smoothieNutrtitionString = 'Blend your smoothie to get nutritional information';
    updatePinterestMeta();
    emailSmoothie();
}


function emailSmoothie () {
  var find = "\r\n";
  var shoppingList = updateShoppingList().replace(/\r\n/g,"%0D%0A");
  $('#emailSmoothie').attr('href', "mailto:?subject=My smoothie recipe&body=Thank you for using the Smoothie Builder by Whole Foods Market.%0D%0A%0D%0A"+resultsMsg+"%0D%0A%0D%0ATips for blending a better smoothie: Put liquids in first, followed by softer ingredients (fresh fruit, yogurt), and then add harder ingredients such as frozen fruit, raw greens or ice. Bonus: Adding powders directly into the liquid will help them to blend more smoothly!%0D%0A%0D%0AUse this shopping list to make your smoothie real:%0D%0A%0D%0A"+shoppingList+"%0D%0A%0D%0AYour smoothie's nutrition: "+smoothieNutrtitionString+'%0D%0A%0D%0AThanks again! Make another smoothie at http://www.wholefoodsmarket.com/smoothie/');
}


function updatePinterestMeta() {
  var pinURL = defaultPinURL;
  var smoothieImg = 'smoothiesharable-green.jpg';
  var smoothieColor =  rybColorMixer.findNearest(smoothie.color, colorSharables);
  smoothieImg = shareableImgs[colorSharables.indexOf('#'+smoothieColor)];
  var shoppingList = updateShoppingList();

  var pinURLpart1 = "//www.pinterest.com/pin/create/button/?url=http%3A%2F%2Fpreview.wholefoodsmarket.com%2Fsmoothie&"; //update url when known
  var imgURL = 'media=http%3A%2F%2Fassets.wholefoodsmarket.com/www/recipes/smoothies/sharables/'+smoothieImg;
  var smoothieDescription = '&description='+encodeURIComponent(resultsMsg);
  pinURL = pinURLpart1+imgURL+smoothieDescription;
  //$('#pinSmoothie a').attr('data-pin-href', pinURL);
  $('#pinSmoothie a').off();
  $('#pinSmoothie a').on('click', function(e){
    e.preventDefault();
    PinUtils.pinOne({
         media: '//assets.wholefoodsmarket.com/www/recipes/smoothies/sharables/'+smoothieImg,
         description: pinMsg + ". Make your own at www.wholefoodsmarket.com/smoothie!"
    });

  });
}




//Helper Function to convert decimals to 
//User-friendly fractions
function toFraction(num){
  var decimal = Math.round((num % 1) * 100);
  //console.log(decimal);
  switch(decimal){
    case 0:
      return false;
      break;

    case 17:
      return ('&frac16;');
      break;

    case 25:
      return ('&frac14;');
      break;

    case 50:
      return ('&frac12;');
      break;
    
    case 75:
      return ('&frac34;');
      break;

    case 33:
      return ('&frac13;');
      break;

    case 67:
      return ('&frac23;');
      break; 

    case 83:
      return ('&frac56;');
      break; 
  }

}


// function convertOunces(ounces){
//   console.log("ounces is " + ounces);
//   var cups = Math.floor(ounces/8);
//   var cupfraction = ounces % 8;
//   var thirdcupfraction = ounces % 3;
//   console.log("cup fraction is " + cupfraction);
//   var tspoon, fraction;
//   var returnString = '';

 
//   var fractioncups = toCups(cupfraction, cups);

//   if(fractioncups.indexOf('cup') == -1 && fractioncups.indexOf('teaspoon') == -1 && fractioncups.indexOf('tablespoon') == -1){
//     if(fractioncups.indexOf('1') > -1 || fractioncups.indexOf('2') > -1){
//       fractioncups+= ' cups';
//     } else {
//       fractioncups += ' cup';
//     }
//     console.log(fractioncups);
//   }
  // if(cups > 0){
  //   returnString += cups + ' ';
  // }

  // if(fraction){
  //   returnString += fraction;
  // } 

  // if((cups == 0 && cupfraction > 0) || (cups == 1)) {
  //     returnString += ' cup';
  // } else if(cups > 0) {
  //     returnString += ' cups'
  // }
  

  // if(tspoon) {
  //   if(cups > 0){
  //     returnString += ' and';
  //   }
  //   returnString += ' '+tspoon;
  // }

  // console.log('final return string is '+ returnString + ' ' +fractioncups['cups'] +"" + fractioncups['tspoons']);
  // return returnString;
//}

// function toCups(cupfraction, cupsTotal){
//   var returnString = '';

//   if(cupsTotal > 0){
//     returnString += cupsTotal + ' ';
//   }

//   var fraction, tspoon = false;
//    switch(cupfraction){
//     case 0:
//       fraction = false;
//       console.log('0');
//       break;
//     case 1.33:
//     console.log('1/6');
//       fraction = '&frac16;';
//       break;

//     case 2:
//     console.log('1/4');
//       fraction = '&frac14;';
//       break;

//     case 2.67:
//     console.log('1/3');
//       fraction = '&frac13;';
//       break;

//     case 1:
//     console.log('1/8');
//       fraction = '&frac18;';
//       break;
    
//     case 3:
//       console.log('3/8');
//       fraction = '&frac38;';
//       break;

//     case 4:
//     console.log('1/2');
//       fraction = '&frac12;';
//       break;

//     case 5:
//     console.log('5/8');
//       fraction = '&frac58;';
//       break;

//     case 5.33:
//     console.log('2/3');
//       fraction = '&frac23;';
//       break;

//     case 6:
//     console.log('3/4');
//       fraction = '&frac34;';
//       break;

//     case 7:
//     console.log('7/8');
//       fraction = '&frac78;';
//       break;

//     default:
//       fraction = false;
//       if((cupfraction % 1) != 0){
//         console.log("cupfraction mod 1 is not zero. this is a decimal");
//         returnString += toCups(Math.floor(cupfraction % 8), 0);
//       }

      
//       tspoon = totSpoons(cupfraction);
//       console.log("tspoons! "+tspoon);
//   }

//   if(fraction){
//     returnString += fraction;
//   }

//   if(cupfraction % 1 == 0){
//     console.log('hello there.')
//     console.log('inside cupfraction mod 1 ' +returnString);
//   } else {
//     if((cupsTotal == 0 && fraction) || (cupsTotal == 1 && !fraction)){
//       returnString += ' cup';
//     } else if ((cupsTotal >= 1 && fraction)) {
//       returnString += ' cups';
//     }
//   }

//   if(tspoon){
//     if(cupsTotal > 0 || fraction){
//       returnString += ' and';
//     }
//     returnString += ' '+tspoon;
//   }

//   console.log("return string is "+ returnString);
//   return returnString;
// }

// function totSpoons(cupfraction){
//   console.log('before to spoons: ' + cupfraction);
//    switch(Math.round((cupfraction % 1) * 100)){
//       case 0:
//         tspoon = false;
//         break;

//       case 8:
//         tspooon = '&frac12; teaspoon';
//         break;

//       case 16:
//         tspoon = '1 teaspoon';
//         break;

//       case 33:
//         tspoon = '&frac23; tablespoon';
//         break;

//       case 50:
//         tspoon = '1 tablespoon';
//         break;

//       case 67:
//         tspoon = '1 &frac13; tablespoons';
//         break;

//       case 75:
//         tspoon = '1 &frac12; tablespoons';
//         break;

//       case 83:
//         tspoon = '1 &frac13; tablespoons';
//         break;

//       default:
//         tspoon = false;
//         break;
//     }
//   return tspoon;
// }

//////////////////////////////////////////////////////////////////////
//  Plugins
//////////////////////////////////////////////////////////////////////

//Helper function for Objects

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


} ( jQuery ));// Close Immediately Invoked Function Expression
