  //Init with density
//Generate a set of petential snowflakes in a rect
  //Pass width, height
//Substract the snowflakes which are generated in the existing rectangle

var SnowflakePositionGenerator = function(x, y, width, height)
{
    this.resize(x,y,width,height);
    this.rgen = Math;
}

SnowflakePositionGenerator.prototype.resize = function(x,y,width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

}

SnowflakePositionGenerator.prototype.getXPosition = function()
{
    return this.x + this.rgen.random() * this.width;
}

SnowflakePositionGenerator.prototype.getYPosition = function()
{
    return this.y + this.rgen.random() * this.height;
}

var VolumeSnowflakeGenerator = function(density) {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.spg = new SnowflakePositionGenerator(0,0,0,0);
    this.density = density;
}

VolumeSnowflakeGenerator.prototype.getNumberOfFlakes = function(width, height)
{
    return Math.floor(width * height * this.density);
}

VolumeSnowflakeGenerator.prototype.getUniqueFlakes = function(x,y,width, height, flakes)
{
    console.log(flakes);
    var uniqueFlakes = [];
    for (flakeLocation in flakes)
    {
	var flake = flakes[flakeLocation];

	if (!(pointInRect(x,y,width,height,flake.x, flake.y))) {
	    //flake.x >= x &&
	    //flake.x < width+x &&
	    //  flake.y >= y &&
	    //  flake.y < height+y)) {
	    uniqueFlakes.push(flake);
	}
    }
    return uniqueFlakes;
}

function pointInRect(x,y,width,height, pointX, pointY)
{
    if (pointX < x) return false;
    if (pointX >= width + x) return false;
    if (pointY < y) return false;
    if (pointY >= height + y) return false;
    return true;
}

VolumeSnowflakeGenerator.prototype.getSnowflakes = function(x,y,width, height)
{
    this.spg.resize(x,y,width,height);

    var flakes = new Array();
    for (var i=0; i < this.getNumberOfFlakes(width, height); i++)
    {
	flakes.push({x:this.spg.getXPosition(),y:this.spg.getYPosition()});
    }
    return flakes;
}

VolumeSnowflakeGenerator.prototype.getAllSnowflakes = function(x,y,width, height)
{
    var flakes = this.getSnowflakes(x,y,width,height);
    var uniqueFlakes = this.getUniqueFlakes(this.x, this.y, this.width, this.height, flakes);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    return uniqueFlakes;

}

VolumeSnowflakeGenerator.prototype.getLol = function(x, y, size)
{
    return "lol";
}
