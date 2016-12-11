
var a: Vector2;
var b: Vector2;
var speed: float = 0;

function Start() {
	speed += Random.Range(-5, 5);
}

function Update() {
	var step = speed * Time.deltaTime;
	transform.position = Vector2.MoveTowards(transform.position, b, step);


	if (transform.position == b) {
		var temp: Vector2 = a;
		a = b;
		b = temp;
	}
}
