function testOffset(sie, timeToFall, expectedOffset)
{
    test("offset", function() {
	var offset = sie.getStartPositionXOfSnowflake(timeToFall);
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
	var offset = sie.getXEndOffset(timeToFall);
	equal(expectedOffset, offset);
    });
} 


    //Setup
    var wind = 0.2; // 200 pixels to the right per second
    var bottomOfScreen = 2000;
    var timeToFallToBottomOfScreen = 10000; //10 Seconds
    var widthOfScreen = 1000;
    var windToRightSIE = new SnowflakeInitializationEngine(wind, bottomOfScreen, widthOfScreen);
    var expectedXStartPosition = -2000; //pixels to the left of the screen
    testOffset(windToRightSIE, timeToFallToBottomOfScreen, expectedXStartPosition);

    //Range test
    var expectedStartWidthRange = widthOfScreen - expectedXStartPosition

    testRange(windToRightSIE, timeToFallToBottomOfScreen, expectedStartWidthRange);

    var expectedXEndOffset = wind * timeToFallToBottomOfScreen;
    testWindDrift(windToRightSIE, timeToFallToBottomOfScreen, expectedXEndOffset);


    //Setup
    var wind = -0.2; // 200 pixels to the right per second
    var bottomOfScreen = 2000;
    var timeToFallToBottomOfScreen = 10000; //10 Seconds
    var widthOfScreen = 1000;
    var windToLeftSIE = new SnowflakeInitializationEngine(wind, bottomOfScreen, widthOfScreen);
    //Offset test
    var expectedXStartPosition = 0; //pixels to the left of the screen
    testOffset(windToLeftSIE, timeToFallToBottomOfScreen, expectedXStartPosition);

    //Range test
    var expectedStartWidthRange = widthOfScreen + 2000
    testRange(windToLeftSIE, timeToFallToBottomOfScreen, expectedStartWidthRange);

    var expectedXEndOffset = wind * timeToFallToBottomOfScreen;
    testWindDrift(windToLeftSIE, timeToFallToBottomOfScreen, expectedXEndOffset);

    //Setup
    var wind = 0; // 200 pixels to the right per second
    var bottomOfScreen = 2000;
    var timeToFallToBottomOfScreen = 10000; //10 Seconds
    var widthOfScreen = 1000;
    var noWindSIE = new SnowflakeInitializationEngine(wind, bottomOfScreen, widthOfScreen);
    //Offset test
    var expectedXStartPosition = 0; //pixels to the left of the screen
    testOffset(noWindSIE, timeToFallToBottomOfScreen, expectedXStartPosition);

    //Range test
    var expectedStartWidthRange = widthOfScreen - expectedXStartPosition
    testRange(noWindSIE, timeToFallToBottomOfScreen, expectedStartWidthRange);

    var expectedXEndOffset = wind * timeToFallToBottomOfScreen;
    testWindDrift(noWindSIE, timeToFallToBottomOfScreen, expectedXEndOffset);

