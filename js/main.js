var paper = Raphael(0, 0, "100%", "100%");
var svg = document.getElementsByTagName("svg")[0];
svg.setAttribute("pointer-events", "none");

var SnowflakeInitializationEngine = function(wind, bottomOfScreen, widthOfScreen)
{
    this.wind = wind;
    this.bottomOfScreen = bottomOfScreen;
    this.widthOfScreen = widthOfScreen;
}

SnowflakeInitializationEngine.prototype.getDistanceBlown = function(timeToFall)
{
   var distanceBlown = this.wind * timeToFall
    return Math.abs(distanceBlown);
}

SnowflakeInitializationEngine.prototype.getStartPositionXOfSnowflake = function(timeToFall)
{
    var distanceBlown = this.wind * timeToFall
    if (distanceBlown <= 0) return 0;
    return -distanceBlown;
}

SnowflakeInitializationEngine.prototype.getRange = function(timeToFall)
{
    var startPosition = this.getStartPositionXOfSnowflake(timeToFall);
    if (startPosition < 0)
	return this.widthOfScreen - startPosition;
    else {
	return this.widthOfScreen + this.getDistanceBlown(timeToFall);
    }
}

SnowflakeInitializationEngine.prototype.getXEndOffset = function(timeToFall)
{
    return this.wind * timeToFall;
}

var SnowflakeGenerator = function() {
    var windCoefficient = 0.1;
    this.wind = Math.random() * windCoefficient*2 - windCoefficient;
    this.speed = .1;
    this.heaviness = 20;
    this.bottomOfScreen = 500;
    this.offsetCoefficient = 200;
    this.sie = new SnowflakeInitializationEngine(this.wind, this.bottomOfScreen, document.width);
}

SnowflakeGenerator.prototype.createSnowflake = function()
{
    var size = Math.random() * 2 + 4;
    var timeToRun = this.bottomOfScreen / this.speed;
    timeToRun = timeToRun * (size / 5);

    var xOffset = this.sie.getStartPositionXOfSnowflake(timeToRun);
    var xRange = this.sie.getRange(timeToRun);
    var xEndOffset = this.sie.getXEndOffset(timeToRun);

    var x = xOffset +  Math.random() * xRange;
    var y = 0;    

    var circle = paper.circle(x, y, size);    
    circle.attr("fill", "#fff");
    var anim = Raphael.animation({cx: x+xEndOffset, cy: this.bottomOfScreen}, timeToRun);
    circle.animate(anim); // run the given animation immediately
}

SnowflakeGenerator.prototype.generateSnowflakes = function()
{
    var self = this;
    setInterval(function() {
	self.createSnowflake();
    }, this.heaviness);
}

var snowflakeGenerator = new SnowflakeGenerator();
snowflakeGenerator.generateSnowflakes();