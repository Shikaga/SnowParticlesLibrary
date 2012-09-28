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


    //Setup
    var wind = 0.2; // 200 pixels to the right per second
    var bottomOfScreen = 2000;
    var timeToFall = 10000; //10 Seconds
    var widthOfScreen = 1000;
    var windToRightSIE = new SnowflakeInitializationEngine(wind, bottomOfScreen, widthOfScreen);
    var expectedXStartPosition = -2000; //pixels to the left of the screen
    testOffset(windToRightSIE, timeToFall, expectedXStartPosition);

    //Range test
    var expectedStartWidthRange = widthOfScreen - expectedXStartPosition

    testRange(windToRightSIE, timeToFall, expectedStartWidthRange);

    var expectedXEndOffset = wind * timeToFall;
    testWindDrift(windToRightSIE, timeToFall, expectedXEndOffset);


    //Setup
    var wind = -0.2; // 200 pixels to the right per second
    var bottomOfScreen = 2000;
    var timeToFall = 10000; //10 Seconds
    var widthOfScreen = 1000;
    var windToLeftSIE = new SnowflakeInitializationEngine(wind, bottomOfScreen, widthOfScreen);
    //Offset test
    var expectedXStartPosition = 0; //pixels to the left of the screen
    testOffset(windToLeftSIE, timeToFall, expectedXStartPosition);

    //Range test
    var expectedStartWidthRange = widthOfScreen + 2000
    testRange(windToLeftSIE, timeToFall, expectedStartWidthRange);

    var expectedXEndOffset = wind * timeToFall;
    testWindDrift(windToLeftSIE, timeToFall, expectedXEndOffset);

    //Setup
    var wind = 0; // 200 pixels to the right per second
    var bottomOfScreen = 2000;
    var timeToFall = 10000; //10 Seconds
    var widthOfScreen = 1000;
    var noWindSIE = new SnowflakeInitializationEngine(wind, bottomOfScreen, widthOfScreen);
    //Offset test
    var expectedXStartPosition = 0; //pixels to the left of the screen
    testOffset(noWindSIE, timeToFall, expectedXStartPosition);

    //Range test
    var expectedStartWidthRange = widthOfScreen - expectedXStartPosition
    testRange(noWindSIE, timeToFall, expectedStartWidthRange);

    var expectedXEndOffset = wind * timeToFall;
    testWindDrift(noWindSIE, timeToFall, expectedXEndOffset);

