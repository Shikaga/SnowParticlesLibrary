function add(number1, number2)
{
	return number1 + number2;
}


// Creates canvas 320 × 200 at 10, 50
var paper = Raphael(0, 0, "100%", "100%");

// Creates circle at x = 50, y = 40, with radius 10
var circle = paper.circle(50, 40, 10);
var circle2 = paper.circle(90, 80, 10);
// Sets the fill attribute of the circle to red (#f00)
circle.attr("fill", "#fff");
circle2.attr("fill", "#fff");


var anim = Raphael.animation({cx: 50, cy: 500}, 2e3);
circle.animate(anim); // run the given animation immediately
//circle.animate(anim.delay(500));

//document.body.appendChild(circle);