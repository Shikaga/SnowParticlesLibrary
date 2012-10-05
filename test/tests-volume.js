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
}

MockSnowflakePositionGenerator.prototype.addPosition = function(x,y)
{
    this.x.push(x);
    this.y.push(y);
}

MockSnowflakePositionGenerator.prototype.getXPosition = function()
{
    return this.x.shift();
}

MockSnowflakePositionGenerator.prototype.getXPosition = function()
{
    return this.y.shift();
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
    var vsg = new VolumeSnowflakeGenerator();
    assertSpgSizeCorrect(vsg,0,0,0,0);
    vsg.getSnowflakes(0,0,100,100);
    assertSpgSizeCorrect(vsg,0,0,100,100);
    vsg.getSnowflakes(50,50,50,50);
    assertSpgSizeCorrect(vsg,50,50,50,50);

});

testlol(vsg.getLol());

test("equal", function() {
    vsg.rgen
    equal("lol", vsg.getLol());
});
