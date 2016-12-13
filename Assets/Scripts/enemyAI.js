
var a: Vector2;
var b: Vector2;
var speed: float = 0;

var playerMovement;

var hurtsound: AudioSource;


function Start() {
	hurtsound = GetComponent("AudioSource");
	speed += Random.Range(-5, 5);
	playerMovement = GameObject.Find("player").GetComponent("playerMovement");
}

function Update() {
	if (playerMovement.state == 0) {
		var step = speed * Time.deltaTime;
		transform.position = Vector2.MoveTowards(transform.position, b, step);


		if (transform.position == b) {
			var temp: Vector2 = a;
			a = b;
			b = temp;
			transform.localScale.x *= -1;
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
