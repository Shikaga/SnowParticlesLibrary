var paper = Raphael(0, 0, "100%", "100%");
var svg = document.getElementsByTagName("svg")[0];
console.log(svg);
svg.setAttribute("pointer-events", "none");

var SnowflakeInitializationEngine = function(wind, bottomOfScreen)
{
    this.wind = wind;
    this.bottomOfScreen = bottomOfScreen;
}

SnowflakeInitializationEngine.prototype.getStartPositionXOfSnowflake = function(timeToFall)
{
    var distanceBlown = this.wind * timeToFall
    return -distanceBlown;
}

var SnowflakeGenerator = function() {
    var windCoefficient = 200;
    this.wind = Math.random() * windCoefficient*2 - windCoefficient;
    this.speed = .1;
    this.heaviness = 20;
    this.bottomOfScreen = 2000;
    this.offsetCoefficient = 200;
    console.log(this.wind);
}

SnowflakeGenerator.prototype.createSnowflake = function(x, y)
{
    var size = Math.random() * 2 + 4;
    var timeToRun = this.bottomOfScreen / this.speed;
    timeToRun = timeToRun * (size / 5);
    var randomDirectionOffset = Math.random()*this.offsetCoefficient*2 - this.offsetCoefficient;

    var circle = paper.circle(x, y, size);    
    circle.attr("fill", "#fff");

    var anim = Raphael.animation({cx: x+(this.wind + this.wind * size)+randomDirectionOffset, cy: this.bottomOfScreen}, timeToRun);
    circle.animate(anim); // run the given animation immediately
}

SnowflakeGenerator.prototype.generateSnowflakes = function()
{
    var self = this;
    setInterval(function() {
	var widthOffsetRatio = Math.random();
	var windOffset = self.wind;
	var widthOffsetDueToWind = Math.abs(self.wind);
	self.createSnowflake((document.width + widthOffsetDueToWind)*widthOffsetRatio - windOffset,0);
    }, this.heaviness);
}

var snowflakeGenerator = new SnowflakeGenerator();
snowflakeGenerator.generateSnowflakes();