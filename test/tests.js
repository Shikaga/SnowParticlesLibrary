function testOffset(sie, timeToFall, expectedOffset)
{
    test("offset", function() {
	var offset = sie.getOffset(timeToFall);
	equal(expectedOffset, offset);
    });
}

function testRange(sie, timeToFall, expectedRange)
{
    test("range", function() {
	var range = sie.getRange(timeToFall);
	equal(expectedRange, range);
    });
} 

function testWindDrift(sie, timeToFall, expectedOffset)
{
    test("wind drift", function() {
	var offset = sie.getWindDrift(timeToFall);
	equal(expectedOffset, offset);
    });
} 

var bottomOfScreen = 2000;
var timeToFall = 10000; //10 Seconds
var widthOfScreen = 1000;

var rightWindSpeed = 0.2;
var leftWindSpeed = -0.2;

var windToRightSIE = new SnowflakeInitializationEngine(rightWindSpeed, bottomOfScreen, widthOfScreen);
var windToLeftSIE = new SnowflakeInitializationEngine(leftWindSpeed, 2000, widthOfScreen);
var noWindSIE = new SnowflakeInitializationEngine(0, bottomOfScreen, widthOfScreen);

var expectedXStartPosition = -2000; //pixels to the left of the screen
testOffset(windToRightSIE, timeToFall, expectedXStartPosition);
var expectedXStartPosition = 0; //pixels to the left of the screen
testOffset(windToLeftSIE, timeToFall, expectedXStartPosition);
var expectedXStartPosition = 0; //pixels to the left of the screen
testOffset(noWindSIE, timeToFall, expectedXStartPosition);

var expectedStartWidthRange = widthOfScreen + 2000;
testRange(windToRightSIE, timeToFall, expectedStartWidthRange);
var expectedStartWidthRange = widthOfScreen + 2000
testRange(windToLeftSIE, timeToFall, expectedStartWidthRange);
var expectedStartWidthRange = widthOfScreen;
testRange(noWindSIE, timeToFall, expectedStartWidthRange);

var expectedXEndOffset = rightWindSpeed * timeToFall;
testWindDrift(windToRightSIE, timeToFall, expectedXEndOffset);
var expectedXEndOffset = leftWindSpeed * timeToFall;
testWindDrift(windToLeftSIE, timeToFall, expectedXEndOffset);
var expectedXEndOffset = 0;
testWindDrift(noWindSIE, timeToFall, expectedXEndOffset);
