function testOffset(sie, expectedOffset)
{
    test("offset", function() {
	var offset = sie.getOffset();
	equal(expectedOffset, offset);
    });
}

function testRange(sie, expectedRange)
{
    test("range", function() {
	var range = sie.getRange();
	equal(expectedRange, range);
    });
} 

function testWindDrift(sie, expectedOffset)
{
    test("wind drift", function() {
	var offset = sie.getWindDrift();
	equal(expectedOffset, offset);
    });
} 

var gravity = 0.1;
var bottomOfScreen = 2000;
var timeToFall = 10000; //10 Seconds
var widthOfScreen = 1000;

var rightWindSpeed = 0.2;
var leftWindSpeed = -0.2;

var windToRightSIE = new SnowflakeInitializationEngine(rightWindSpeed, gravity, bottomOfScreen, widthOfScreen, timeToFall);
var windToLeftSIE = new SnowflakeInitializationEngine(leftWindSpeed, gravity, 2000, widthOfScreen, timeToFall);
var noWindSIE = new SnowflakeInitializationEngine(0, bottomOfScreen, gravity, widthOfScreen, timeToFall);

var expectedXStartPosition = -2000; //pixels to the left of the screen
testOffset(windToRightSIE, expectedXStartPosition);
var expectedXStartPosition = 0; //pixels to the left of the screen
testOffset(windToLeftSIE, expectedXStartPosition);
var expectedXStartPosition = 0; //pixels to the left of the screen
testOffset(noWindSIE, expectedXStartPosition);

var expectedStartWidthRange = widthOfScreen + 2000;
testRange(windToRightSIE, expectedStartWidthRange);
var expectedStartWidthRange = widthOfScreen + 2000
testRange(windToLeftSIE, expectedStartWidthRange);
var expectedStartWidthRange = widthOfScreen;
testRange(noWindSIE, expectedStartWidthRange);

var expectedXEndOffset = rightWindSpeed * timeToFall;
testWindDrift(windToRightSIE, expectedXEndOffset);
var expectedXEndOffset = leftWindSpeed * timeToFall;
testWindDrift(windToLeftSIE, expectedXEndOffset);
var expectedXEndOffset = 0;
testWindDrift(noWindSIE, expectedXEndOffset);
