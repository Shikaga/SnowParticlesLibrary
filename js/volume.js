  //Init with density
//Generate a set of petential snowflakes in a rect
  //Pass width, height
//Substract the snowflakes which are generated in the existing rectangle

var SnowflakePositionGenerator = function(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.rgen = Math;
}

SnowflakePositionGenerator.prototype.getXPosition = function()
{
    return this.x + this.rgen.random() * this.width;
}

SnowflakePositionGenerator.prototype.getYPosition = function()
{
    return this.y + this.rgen.random() * this.height;
}

var VolumeSnowflakeGenerator = function() {
    this.spg = new SnowflakePositionGenerator(0,0,0,0);
}

VolumeSnowflakeGenerator.prototype.getSnowflakes = function(x,y,width, height)
{
    this.spg = new SnowflakePositionGenerator(x,y,width,height);
}

VolumeSnowflakeGenerator.prototype.getLol = function(x, y, size)
{
    return "lol";
}
