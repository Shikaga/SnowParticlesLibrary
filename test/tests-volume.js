function testlol(a)
{
    test("equal", function() {
	equal("lol", a);
    });
}

var MockRandom = function() {
    this.numbersToReturn = [];
}

MockRandom.prototype.addNumber = function(number)
{
    this.numbersToReturn.push(number);
}

MockRandom.prototype.random = function()
{
    console.log(this);
    return this.numbersToReturn.shift();
}

var mockRandom = new MockRandom();


test("equal", function() {
var spg = new SnowflakePositionGenerator(0,0,100,100);
spg.rgen = mockRandom;
    mockRandom.addNumber(0.5);
    mockRandom.addNumber(0.5);
    equal(50, spg.getXPosition());
    equal(50, spg.getYPosition());
});

test("equal", function() {
var spg = new SnowflakePositionGenerator(0,0,100,100);
spg.rgen = mockRandom;
    mockRandom.addNumber(0);
    mockRandom.addNumber(0);
    equal(0, spg.getXPosition());
    equal(0, spg.getYPosition());
});


test("equal", function() {
    var spg = new SnowflakePositionGenerator(50,50,100,100);
    spg.rgen = mockRandom;
    mockRandom.addNumber(0.5);
    mockRandom.addNumber(0.5);
    equal(100, spg.getXPosition());
    equal(100, spg.getYPosition());
});

//--------

var MockSnowflakePositionGenerator = function() {
    this.x = [];
    this.y = [];
    this.xInvoked = 0;
    this.yInvoked = 0;
}

MockSnowflakePositionGenerator.prototype.addPosition = function(x,y)
{
    this.x.push(x);
    this.y.push(y);
}

MockSnowflakePositionGenerator.prototype.getXPosition = function()
{
    this.xInvoked++;
    return this.x.shift() || Math.random();
}

MockSnowflakePositionGenerator.prototype.getYPosition = function()
{
    this.yInvoked++;
    return this.y.shift() || Math.random();
}

MockSnowflakePositionGenerator.prototype.reset = function()
{
    this.x = [];
    this.y = [];
    this.xInvoked = 0;
    this.yInvoked = 0;
}

MockSnowflakePositionGenerator.prototype.resize = function()
{
}


var mspg = new MockSnowflakePositionGenerator();

//--------

var vsg = new VolumeSnowflakeGenerator();
//test starts 0;
//vsg.getSnowflakes(0,0, 100, 100);
//vsg.getSnowflakes(0,0, 200, 200); //returns snowflakes in 2,3,4 quadrant

function assertSpgSizeCorrect(vsg,x,y,width,height) {
    equal(x,vsg.spg.x);
    equal(y,vsg.spg.y);
    equal(width,vsg.spg.width);
    equal(height,vsg.spg.height);
} 

test("SPG is correctly resized upon getSnowflakesCalled", function() {
    var vsg = new VolumeSnowflakeGenerator(0.001);
    assertSpgSizeCorrect(vsg,0,0,0,0);
    vsg.getSnowflakes(0,0,100,100);
    assertSpgSizeCorrect(vsg,0,0,100,100);
    vsg.getSnowflakes(50,50,50,50);
    assertSpgSizeCorrect(vsg,50,50,50,50);
});

test("get Density", function() {
    var vsg = new VolumeSnowflakeGenerator(0.001);
    equal(0,vsg.getNumberOfFlakes());
    vsg.getSnowflakes(0,0,100,100);
    var expectedDensity = 10; //100 * 100 * 0.001;
    equal(expectedDensity,vsg.getNumberOfFlakes());
    vsg.getSnowflakes(50,50,50,50);
    expectedDensity = 2; //50 * 50 * 0.001 rounded down;
    equal(expectedDensity,vsg.getNumberOfFlakes());
    vsg.getSnowflakes(50,50,19,50);
    expectedDensity = 0; //19 * 50 * 0.001 rounded down;
    equal(expectedDensity,vsg.getNumberOfFlakes());
});

test("Correct number of getSnowflake() calls are made for the density", function() {
    var vsg = new VolumeSnowflakeGenerator(0.001);
    vsg.spg = mspg; //Oh yeah, sick abrevs
    mspg.reset();
    var flakes = vsg.getSnowflakes(0,0,100,100);
    var expectedSize = 10; //100 * 100 * 0.01
    equal(expectedSize, flakes.length);
    equal(expectedSize, mspg.xInvoked);
    equal(expectedSize, mspg.yInvoked);
    mspg.reset();
    flakes = vsg.getSnowflakes(0,0,200,100);
    expectedSize = 20; //200 * 100 * 0.01
    equal(expectedSize, flakes.length);
    equal(expectedSize, mspg.xInvoked);
    equal(expectedSize, mspg.yInvoked);
});

test("Flakes in old quadrant are discarded", function() 
{
    var vsg = new VolumeSnowflakeGenerator(0.01);
    var flakes = [{x:0,y:0},{x:9,y:0},{x:0,y:9},{x:9,y:9}, //discarded
		  {x:10,y:9},{x:9,y:10},{x:10,y:10},{x:-1,y:0},{x:0,y:-1},{x:-1,y:-1}];
    var uniqueFlakes = vsg.getUniqueFlakes(0,0,10,10,flakes);
    equal(6,uniqueFlakes.length);
    equal(uniqueFlakes[0].x, 10);
    equal(uniqueFlakes[0].y, 9);
    equal(uniqueFlakes[1].x, 9);
    equal(uniqueFlakes[1].y, 10);
    equal(uniqueFlakes[2].x, 10);
    equal(uniqueFlakes[2].y, 10);
    equal(uniqueFlakes[3].x, -1);
    equal(uniqueFlakes[3].y, 0);
    equal(uniqueFlakes[4].x, 0);
    equal(uniqueFlakes[4].y, -1);
    equal(uniqueFlakes[5].x, -1);
    equal(uniqueFlakes[5].y, -1);
});

test("Snowflakes aren't generated in old quadrants", function() 
{
    var vsg = new VolumeSnowflakeGenerator(0.01);
    mspg = new MockSnowflakePositionGenerator();
    mspg.addPosition(5,5);
    vsg.spg = mspg;
    var flakes = vsg.getSnowflakes(0,0,10,10);
    console.log(flakes);
    equal(1, flakes.length);
    equal(5, flakes[0].x);
    equal(5, flakes[0].y);
    mspg.addPosition(4,4); //Old quadrant
    mspg.addPosition(4,11);
    mspg.addPosition(5,21);
    mspg.addPosition(5,32);
    var flakes = vsg.getSnowflakes(0,0,10,40);
/*    equal(3, flakes.length);
    equal(4, flakes[0].x);
    equal(11, flakes[0].y);
    equal(5, flakes[0].x);
    equal(21, flakes[0].y);
    equal(5, flakes[0].x);
    equal(32, flakes[0].y);*/
});

testlol(vsg.getLol());

test("equal", function() {
    vsg.rgen
    equal("lol", vsg.getLol());
});
