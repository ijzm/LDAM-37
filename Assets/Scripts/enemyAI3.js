var a: Vector2;
var b: Vector2;
var c: Vector2;
var d: Vector2;
var speed: float = 0;

function Start() {
	//	speed += Random.Range(-5, 5);
	b[0] = c[0];
	b[1] = a[1];

	d[0] = a[0];
	d[1] = c[1];

}

function Update() {
	var step = speed * Time.deltaTime;
	transform.position = Vector2.MoveTowards(transform.position, b, step);


	if (transform.position == b) {
		var temp: Vector2 = b;
		b = c;
		c = d;
		d = a;
		a = temp;
	}
}
