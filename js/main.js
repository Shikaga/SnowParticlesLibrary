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
}

SnowflakeGenerator.prototype.createSnowflake = function(x, y)
{
    var circle = paper.circle(x, y, 5);
    circle.attr("fill", "#fff");
    var anim = Raphael.animation({cx: x, cy: 500}, 2e3);
    circle.animate(anim); // run the given animation immediately
}

SnowflakeGenerator.prototype.generateSnowflakes = function()
{
    var self = this;
    setInterval(function() {
	var widthOffsetRatio = Math.random();
	self.createSnowflake(document.width*widthOffsetRatio,40);
    }, 20);
}

var snowflakeGenerator = new SnowflakeGenerator();
snowflakeGenerator.generateSnowflakes();





//pointer-events="none"