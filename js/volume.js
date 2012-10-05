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

VolumeSnowflakeGenerator.prototype.getNumberOfFlakes = function()
{
    return this.width * this.height * this.density;
}

VolumeSnowflakeGenerator.prototype.getSnowflakes = function(x,y,width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.spg.resize(x,y,width,height);

    var flakes = new Array();
    for (var i=0; i < this.getNumberOfFlakes(); i++)
    {
	flakes.push([this.spg.getXPosition(),this.spg.getYPosition()]);
    }
    return flakes;
}

VolumeSnowflakeGenerator.prototype.getLol = function(x, y, size)
{
    return "lol";
}
