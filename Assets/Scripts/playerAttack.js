
var spawn: GameObject;
var direction: String;

var playerMovement;


function Start() {
	playerMovement = GetComponent("playerMovement");
}

function Update() {
	direction = playerMovement.looking;
	if (Input.GetAxis("Fire2") &&
		GameObject.FindGameObjectsWithTag("Bullet").length == 0 &&
		playerMovement.state == 0) {

		var bullet = Instantiate(Resources.Load("Bullet"), spawn.transform.position, Quaternion.identity);

		bullet.gameObject.name = "Fireball";

		var bulletrb = bullet.GetComponent(Rigidbody2D);
		switch (direction) {
			case "up":
				bulletrb.velocity = new Vector2(0, 50);
				break;
			case "down":
				bulletrb.velocity = new Vector2(0, -50);
				break;
			case "left":
				bulletrb.velocity = new Vector2(-50, 0);
				break;
			case "right":
				bulletrb.velocity = new Vector2(50, 0);
				break;
		}
	}

}
