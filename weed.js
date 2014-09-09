HIGH_CHART = ["You are sober as hell.", "You are barely feelin' it.", "You are a little toasty.", "You are half-baked.", "You are kinda blazed.", "You are stupid geeked.", "You have no idea what's goin' on.", "You need to be reminded that no one has ever died from a overdose of weed."]

function WeedPlant( age_in_weeks, height_in_inches, buds, harvested_buds, highness_level, cash ) {
  var that = this

  this.age_in_weeks = age_in_weeks;
  this.height_in_inches = height_in_inches;
  this.buds = buds;

  this.harvested_buds = harvested_buds;
  this.highness_level = highness_level;
  this.cash = cash;


  this.grow = function() {
    that.age_in_weeks += 1;
    that.height_in_inches += 3;
    that.buds +=1;
    console.log(that);
    that.UpdateDisplay();
  }

  this.harvest = function(){
    that.harvested_buds += that.buds;
    that.buds = 0;
  }

  this.smoke = function(){
    that.highness_level = HIGH_CHART[Math.round(that.harvested_buds / 10)];
    that.harvested_buds = 0;
  }

  this.sell = function(){
    that.cash += that.harvested_buds * 5
    that.harvested_buds = 0;
  }

  this.UpdateDisplay = function(){
    $('#age-display').html(this.age_in_weeks)
    $('#height-display').html(this.height_in_inches)
    $('#buds-on-plant-display').html(this.buds)
    $('#harvested-buds-display').html(this.harvested_buds)
    $('#higness-display').html(this.highness_level)
    $('#cash-display').html('$' + this.cash)
  }
}


$( document ).ready(function() {
  var George = new WeedPlant( 0, 0, 0, 0, 0, 0 );

  setInterval(George.grow, 60000);

  $( "#harvest-button" ).click(function(){
    George.harvest();
  })
  $( "#smoke-button" ).click(function(){
    George.smoke();
  })
  $( "#sell-button" ).click(function(){
    George.sell();
  })
});
