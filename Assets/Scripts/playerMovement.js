
var rb: Rigidbody2D;
var speed: int;

var health: int = 3;

var looking: String = "up";
var trigger: GameObject;

var textbox: GameObject;
var uitext: UI.Text;

var books: GameObject[];

var state: int = 0; //0: Default 1: Textbox

var cooldown: float;
var healthcooldown: float;
var flickercooldown: float;

var Event: String = "";
var lights: GameObject;
var enemies: GameObject;

var spriterenderer: SpriteRenderer;

function Start() {
	rb = GetComponent. < Rigidbody2D > ();
	spriterenderer = GetComponent. < SpriteRenderer > ();
	cooldown = Time.time;
	healthcooldown = Time.time;
	flickercooldown = Time.time;
}

function Update() {
	if (health <= 0) {
		SceneManager.LoadScene("menu");
	}
	if (state == 0) {
		rb.velocity = new Vector2(
			Input.GetAxis("Horizontal") * speed,
			Input.GetAxis("Vertical") * speed
		);
	}

	if (Input.GetAxis("Vertical") > 0 && state == 0) {
		looking = "up";
		trigger.transform.localPosition = new Vector2(0, 4);
	} else
	if (Input.GetAxis("Vertical") < 0 && state == 0) {
		looking = "down";
		trigger.transform.localPosition = new Vector2(0, -6);
	} else
	if (Input.GetAxis("Horizontal") > 0 && state == 0) {
		looking = "right";
		trigger.transform.localPosition = new Vector2(4, 0);
	} else
	if (Input.GetAxis("Horizontal") < 0 && state == 0) {
		looking = "left";
		trigger.transform.localPosition = new Vector2(-4, 0);
	}

	if (Input.GetAxis("Fire1") && Time.time > cooldown) {
		cooldown = Time.time + 0.3;
		if (state == 0) {
			state = 1;
			rb.velocity = Vector2.zero;
			textbox.SetActive(true);
		} else
		if (state == 1) {
			state = 0;
			textbox.SetActive(false);
			if (Event == "DarkBook") {
				dark();
				Destroy(books[0]);
			}
		}
	}

	if (Time.time < healthcooldown) {
		if (Time.time > flickercooldown) {
			flickercooldown = Time.time + 0.3;
			if (spriterenderer.enabled == true) {
				spriterenderer.enabled = false;
			} else {
				spriterenderer.enabled = true;
			}
		}
	} else {
		spriterenderer.enabled = true;
	}



}


function OnTriggerStay2D(col: Collider2D) {
	if (col.gameObject.layer != 8) {
		print(col.gameObject.name);
		switch (col.gameObject.name) {
			case "DarkBook":
				uitext.text = "Darkbook";
				Event = "DarkBook";
				break;
			default:
				uitext.text = "default";
				Event = "";
				break;
		}
	}

	if (col.gameObject.tag == "Enemy" && Time.time > healthcooldown) {
		health--;
		healthcooldown = Time.time + 3;
	}

}

function OnTriggerExit2D(col: Collider2D) {
	uitext.text = "There's nothing to do here";
}

function dark() {
	Event = "";
	lights.SetActive(false);
	Instantiate(Resources.Load("DarkBookEnemies"), Vector2.zero, Quaternion.identity);
}
