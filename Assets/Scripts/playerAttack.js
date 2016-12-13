
var spawn: GameObject;
var direction: String;

var playerMovement;

var healthcounter: UI.Text;

function Start() {
	playerMovement = GetComponent("playerMovement");
}

function Update() {
	healthcounter.text = playerMovement.health.ToString() + " HP";
	direction = playerMovement.looking;
	if (Input.GetKeyUp("x") &&
		GameObject.FindGameObjectsWithTag("Bullet").length == 0 &&
		playerMovement.state == 0 &&
		playerMovement.canfire == true) {

		var bullet = Instantiate(Resources.Load("Bullet"), spawn.transform.position, Quaternion.identity);
		playerMovement.music[5].Play();

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
