test( "test-snowflake-start-position-range", function() {

    //Setup
    var wind = 0.2; // 200 pixels to the right per second
    var bottomOfScreen = 2000;
    var timeToFallToBottomOfScreen = 10000; //10 Seconds
    var widthOfScreen = 1000;
    var sig = new SnowflakeInitializationEngine(wind, bottomOfScreen, widthOfScreen);
    //Offset test
    var expectedXStartPosition = -2000; //pixels to the left of the screen
    var actualXStartPosition = sig.getStartPositionXOfSnowflake(timeToFallToBottomOfScreen);
    ok( expectedXStartPosition == actualXStartPosition, "Passed!" );

    //Range test
    var expectedStartWidthRange = widthOfScreen - expectedXStartPosition
    var actualStartWidthRange = sig.getRange(timeToFallToBottomOfScreen);
    ok(expectedStartWidthRange == actualStartWidthRange, "Passed!");

    var expectedXEndOffset = wind * timeToFallToBottomOfScreen;
    var actualXEndOffset = sig.getXEndOffset(timeToFallToBottomOfScreen);
});

test( "test-snowflake-start-position-range", function() {

    //Setup
    var wind = -0.2; // 200 pixels to the right per second
    var bottomOfScreen = 2000;
    var timeToFallToBottomOfScreen = 10000; //10 Seconds
    var widthOfScreen = 1000;
    var sig = new SnowflakeInitializationEngine(wind, bottomOfScreen, widthOfScreen);
    //Offset test
    var expectedXStartPosition = 0; //pixels to the left of the screen
    var actualXStartPosition = sig.getStartPositionXOfSnowflake(timeToFallToBottomOfScreen);
    ok( expectedXStartPosition == actualXStartPosition, "Passed!" );

    //Range test
    var expectedStartWidthRange = widthOfScreen + 2000
    var actualStartWidthRange = sig.getRange(timeToFallToBottomOfScreen);
    ok(expectedStartWidthRange == actualStartWidthRange, "Passed!");

    var expectedXEndOffset = wind * timeToFallToBottomOfScreen;
    var actualXEndOffset = sig.getXEndOffset(timeToFallToBottomOfScreen);
});

test( "test-snowflake-start-position-range", function() {

    //Setup
    var wind = 0; // 200 pixels to the right per second
    var bottomOfScreen = 2000;
    var timeToFallToBottomOfScreen = 10000; //10 Seconds
    var widthOfScreen = 1000;
    var sig = new SnowflakeInitializationEngine(wind, bottomOfScreen, widthOfScreen);
    //Offset test
    var expectedXStartPosition = 0; //pixels to the left of the screen
    var actualXStartPosition = sig.getStartPositionXOfSnowflake(timeToFallToBottomOfScreen);
    ok( expectedXStartPosition == actualXStartPosition, "Passed!" );

    //Range test
    var expectedStartWidthRange = widthOfScreen - expectedXStartPosition
    var actualStartWidthRange = sig.getRange(timeToFallToBottomOfScreen);
    ok(expectedStartWidthRange == actualStartWidthRange, "Passed!");

    var expectedXEndOffset = wind * timeToFallToBottomOfScreen;
    var actualXEndOffset = sig.getXEndOffset(timeToFallToBottomOfScreen);
});

