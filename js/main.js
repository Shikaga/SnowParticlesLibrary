var SnowflakeInitializationEngine = function(wind, gravity, bottomOfScreen, widthOfScreen, timeToFall)
{
    this.gravity = gravity;
    this.wind = wind;
    this.bottomOfScreen = bottomOfScreen;
    this.widthOfScreen = widthOfScreen;
    this.timeToFall = timeToFall;
}

SnowflakeInitializationEngine.prototype.getDistanceBlown = function()
{
   var distanceBlown = this.wind * this.timeToFall
    return Math.abs(distanceBlown);
}

SnowflakeInitializationEngine.prototype.getOffset = function()
{
    var distanceBlown = this.wind * this.timeToFall
    if (distanceBlown <= 0) return 0;
    return -distanceBlown;
}

SnowflakeInitializationEngine.prototype.getRange = function()
{
    var startPosition = this.getOffset(this.timeToFall);
    if (startPosition < 0)
	return this.widthOfScreen - startPosition;
    else {
	return this.widthOfScreen + this.getDistanceBlown(this.timeToFall);
    }
}

SnowflakeInitializationEngine.prototype.getWindDrift = function()
{
    return this.wind * this.timeToFall;
}

SnowflakeInitializationEngine.prototype.getTimeToRun = function(size)
{
    var timeToRun = this.bottomOfScreen / this.gravity;
    timeToRun = timeToRun * (size / 5);
    return timeToRun;
}

var SnowflakeGenerator = function() {
    var windCoefficient = 0.1;
    this.wind = Math.random() * windCoefficient*2 - windCoefficient;
    this.speed = .1;
    this.heaviness = 20;
    this.bottomOfScreen = 2000;
    this.offsetCoefficient = 200;
    this.sie = new SnowflakeInitializationEngine(this.wind, this.speed, this.bottomOfScreen, document.width, 10000); //magic number
}

SnowflakeGenerator.prototype.createSnowflake = function()
{
    var size = Math.random() * 2 + 4;

    var timeToRun = this.sie.getTimeToRun(size);
    var xOffset = this.sie.getOffset();
    var xRange = this.sie.getRange();
    var xEndOffset = this.sie.getWindDrift();

    var x = xOffset +  Math.random() * xRange;
    var y = 0;    

    var circle = paper.circle(x, y, size);    
    circle.attr("fill", "#fff");
    var anim = Raphael.animation({cx: x+xEndOffset, cy: this.bottomOfScreen}, timeToRun);
    circle.animate(anim); 
}

SnowflakeGenerator.prototype.generateSnowflakes = function()
{
    var self = this;
    setInterval(function() {
	self.createSnowflake();
    }, this.heaviness);
}

var paper = Raphael(0, 0, "100%", "100%");
var svg = document.getElementsByTagName("svg")[0];
svg.setAttribute("pointer-events", "none");

var snowflakeGenerator = new SnowflakeGenerator();
snowflakeGenerator.generateSnowflakes();