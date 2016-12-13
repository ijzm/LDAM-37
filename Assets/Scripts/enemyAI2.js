
var a: Vector2;
var b: Vector2;
var c: Vector2;
var d: Vector2;
var speed: float = 0;

var playerMovement;
var hurtsound: AudioSource;

function Start() {
	hurtsound = GetComponent("AudioSource");
	//speed += Random.Range(-5, 5);
	b[1] = c[1];
	b[0] = a[0];

	d[1] = a[1];
	d[0] = c[0];

	playerMovement = GameObject.Find("player").GetComponent("playerMovement");

}

function Update() {
	if (playerMovement.state == 0) {
		var step = speed * Time.deltaTime;
		transform.position = Vector2.MoveTowards(transform.position, b, step);
		if (b.x < transform.position.x) {
			transform.localScale.x = -1;
		} else {
			transform.localScale.x = 1;
		}


		if (transform.position == b) {
			var temp: Vector2 = b;
			b = c;
			c = d;
			d = a;
			a = temp;
		}
	}
}

function OnTriggerStay2D(col: Collider2D) {
	if (col.gameObject.name == "Fireball") {
		hurtsound.Play();
		Destroy(col.gameObject);
		Destroy(gameObject);
	}
}
