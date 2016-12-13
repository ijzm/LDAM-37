var a: Vector2;
var b: Vector2;
var c: Vector2;
var d: Vector2;
var speed: float = 0;
var playerMovement;
var cooldown: float;
var dir: int;
var hurtsound: AudioSource;

function Start() {
	hurtsound = GetComponent("AudioSource");
	//	speed += Random.Range(-5, 5);
	b[0] = c[0];
	b[1] = a[1];

	d[0] = a[0];
	d[1] = c[1];
	playerMovement = GameObject.Find("player").GetComponent("playerMovement");
	cooldown = Time.time;
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

		if (Time.time > cooldown) {
			cooldown += 3;
			dir = Random.Range(0, 3);
			var dirvector2: Vector2;
			switch (dir) {
				case 0:
					dirvector2 = new Vector2(0, 6);
					break;
				case 1:
					dirvector2 = new Vector2(0, -6);
					break;
				case 2:
					dirvector2 = new Vector2(-6, 0);
					break;
				case 3:
					dirvector2 = new Vector2(6, 0);
					break;
			}
			var bullet = Instantiate(Resources.Load("Snowball"), transform.position + dirvector2, Quaternion.identity);

			bullet.gameObject.name = "Snowball";

			var bulletrb = bullet.GetComponent(Rigidbody2D);
			switch (dir) {
				case 0:
					bulletrb.velocity = new Vector2(0, 50);
					break;
				case 1:
					bulletrb.velocity = new Vector2(0, -50);
					break;
				case 2:
					bulletrb.velocity = new Vector2(-50, 0);
					break;
				case 3:
					bulletrb.velocity = new Vector2(50, 0);
					break;
			}
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
