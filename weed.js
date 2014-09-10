HIGH_CHART = ["You are sober as hell.", "You are barely feelin' it.", "You are a little toasty.", "You are half-baked.", "You are kinda blazed.", "You are stupid geeked.", "You have no idea what's goin' on.", "You need to be reminded that no one has ever died from a overdose of weed."]

timeSinceLastSmoke = 0

function WeedPlant( ageInWeeks, heightInInches, buds, budsInStash, highnessDigit, cash, watered ) {

  var that = this

  this.ageInWeeks = ageInWeeks;
  this.heightInInches = heightInInches;
  this.buds = buds;

  this.budsInStash = budsInStash;
  this.highnessDigit = highnessDigit;
  this.cash = cash;



  this.grow = function() {
    that.ageInWeeks += 1;
    that.heightInInches += .5;
    that.addBuds();
    that.trackTimeSinceLastSmoke();
    that.UpdateDisplay();
  }

  this.addBuds = function(){
    if (that.ageInWeeks >= 6) {
      that.buds +=1;
    }
  }

  this.trackTimeSinceLastSmoke = function(){
    timeSinceLastSmoke += 1;
    if (timeSinceLastSmoke == 20 && that.highnessDigit >= 1 ){

      that.highnessDigit -= 1;
      timeSinceLastSmoke = 0;
      that.updateHighnessLevel();
    }
  }

  this.water = function(){
    that.watered = true;
  }

  this.harvest = function(){
    that.budsInStash += that.buds;
    that.buds = 0;
  }

  this.smoke = function(){
    timeSinceLastSmoke = 0;
    that.highnessDigit += Math.round(that.budsInStash / 10)
    that.speedUpTime();
    that.increaseHighnessLevel();
    that.budsInStash = 0;
  }

  this.speedUpTime = function(){
    if (growInterval >= budsInStash * 10) {
      growInterval -= budsInStash * 10
    }
    console.log(that.highnessDigit)
    console.log(growInterval)
  }

  this.increaseHighnessLevel = function(){
    if(that.highnessDigit < HIGH_CHART.length){
      that.updateHighnessLevel();
    }
    else {that.highnessLevel = HIGH_CHART[HIGH_CHART.length - 1]
    };
    console.log(that.highnessLevel)
  }

  this.sell = function(){
    that.cash += that.budsInStash * 5
    that.budsInStash = 0;
  }

  this.updateHighnessLevel = function(){
    that.highnessLevel = HIGH_CHART[that.highnessDigit];
  }

  this.UpdateDisplay = function(){
    $('#age-display').html(this.ageInWeeks)
    $('#height-display').html(this.heightInInches)
    $('#buds-on-plant-display').html(this.buds)
    $('#harvested-buds-display').html(this.budsInStash)
    $('#higness-display').html(this.highnessLevel)
    $('#cash-display').html('$' + this.cash)
    console.log(timeSinceLastSmoke)
  }
}


$( document ).ready(function() {
  var George = new WeedPlant( 0, 0, 0, 0, 0, 0, true );
  growInterval = 1000;
  setInterval(George.grow, growInterval);

  $( "#harvest-button" ).click(function(){
    George.harvest();
  })
  $( "#smoke-button" ).click(function(){
    George.smoke();
  })
  $( "#sell-button" ).click(function(){
    George.sell();
  })
  $( "#water-button" ).click(function(){
    George.water();
  })
});
