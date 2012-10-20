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

SnowflakeInitializationEngine.prototype.setWidthHeight = function(width, height)
{
   this.widthOfScreen = width;
   this.bottomOfScreen = height;
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
	this.season = "winter";
    var windCoefficient = 0.1;
    this.wind = Math.random() * windCoefficient*2 - windCoefficient;
    this.speed = .06;
    this.heaviness = 20;
    this.bottomOfScreen = 2000;
    this.offsetCoefficient = 200;
    this.sie = new SnowflakeInitializationEngine(this.wind, this.speed, window.innerHeight, window.innerWidth, 10000); //magic number
    this.spriteHandler = new SpriteHandler();
}

SnowflakeGenerator.prototype.createSnowflake = function()
{
    var size = Math.random() * 2 + 4;

    var timeToRun = this.sie.getTimeToRun(size);
    var xOffset = this.sie.getOffset();
    var xRange = this.sie.getRange();
    var xEndOffset = this.sie.getWindDrift();

    var x = xOffset +  Math.random() * xRange;
    var y = -10;    
    var xEnd = x+xEndOffset;
    var yEnd = this.bottomOfScreen;

	var sprite;
	switch (this.season) 
	{
		case "winter": 
			sprite = this.spriteHandler.createCircleSprite(x,y,size);
			break;
		case "spring":
			sprite = this.spriteHandler.createCherryBlossomSprite(x,y,size);
			break;
		case "autumn":
			sprite = this.spriteHandler.createLeafSprite(x,y,size);
			break;
		case "payday":
			sprite = this.spriteHandler.createMoneySprite(x,y,size);
			break;
	}
	this.spriteHandler.animateSprite(sprite, xEnd, yEnd, timeToRun);
}

var SpriteHandler = function() {

}

SpriteHandler.prototype.createLeafSprite = function(x, y, size)
{
    var circle = paper.image("images/autumn_leaf.svg", x, y, 20, 20);
    return circle;
}

SpriteHandler.prototype.createCherryBlossomSprite = function(x, y, size)
{
    var circle = paper.image("images/cherry_blossom.svg", x, y, 20, 20);
    return circle;
}

SpriteHandler.prototype.createMoneySprite = function(x, y, size)
{
    var circle = paper.image("images/money.jpg", x, y, 40, 20);
    return circle;
}

SpriteHandler.prototype.createCircleSprite = function(x, y, size)
{
    var circle = paper.circle(x, y, size);    
    circle.attr("fill", "#fff");
    return circle;
}

SpriteHandler.prototype.animateSprite = function(sprite, x, y, timeToAnimate)
{
	if (sprite == null) return;
	var rotate =  Math.random() * 2000 - 1000;
    sprite.animate({transform: "t" + x + "," + y + "r" + rotate,}, timeToAnimate, ""); 
	setTimeout(function() {sprite.remove()}, timeToAnimate);
}

SnowflakeGenerator.prototype.generateSnowflakes = function()
{
    var self = this;
    setInterval(function() {
		self.sie.setWidthHeight(window.innerWidth, window.innerHeight);
		self.createSnowflake(this.season);
    }, this.heaviness);
}

VolumeSnowflakeGenerator = function()
{

}

var paper = Raphael(0, 0, "100%", "100%");
var svg = document.getElementsByTagName("svg")[0];
svg.setAttribute("pointer-events", "none");

var snowflakeGenerator = new SnowflakeGenerator();
snowflakeGenerator.generateSnowflakes();