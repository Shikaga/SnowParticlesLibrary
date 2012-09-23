function add(number1, number2)
{
	return number1 + number2;
}


// Creates canvas 320 × 200 at 10, 50
var paper = Raphael(0, 0, "100%", "100%");
var svg = document.getElementsByTagName("svg")[0];
console.log(svg);
svg.setAttribute("pointer-events", "none");

var SnowflakeGenerator = function() {
    var windCoefficient = 200;
    this.wind = Math.random() * windCoefficient*2 - windCoefficient;
    console.log(this.wind);
}

SnowflakeGenerator.prototype.createSnowflake = function(x, y)
{
    var size = Math.random() * 2 + 4;
    var circle = paper.circle(x, y, size);
    circle.attr("fill", "#fff");
    var anim = Raphael.animation({cx: x+(this.wind + this.wind * size), cy: 2000}, 5000 + size * 1000);
    circle.animate(anim); // run the given animation immediately
}

SnowflakeGenerator.prototype.generateSnowflakes = function()
{
    var self = this;
    setInterval(function() {
	var widthOffsetRatio = Math.random();
	self.createSnowflake((document.width + (Math.abs(self.wind)))*widthOffsetRatio - self.wind,40);
    }, 20);
}

var snowflakeGenerator = new SnowflakeGenerator();
snowflakeGenerator.generateSnowflakes();





//pointer-events="none"