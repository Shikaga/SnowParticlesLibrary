test( "test-snowflake-start-position-range", function() {
    var wind = 0.2; // 200 pixels to the right per second
    var bottomOfScreen = 2000;
    var timeToFallToBottomOfScreen = 10000 //10 Seconds
    
    var sig = new SnowflakeInitializationEngine(wind, bottomOfScreen);
    var expectedXStartPosition = -2000 //pixels to the left of the screen
    
    var actualXStartPosition = sig.getStartPositionXOfSnowflake(timeToFallToBottomOfScreen);
    console.log(actualXStartPosition);

  ok( expectedXStartPosition == actualXStartPosition, "Passed!" );
});

