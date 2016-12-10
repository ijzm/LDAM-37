
var rb: Rigidbody2D;
var speed: int;

var looking: String = "up";
var trigger: GameObject;

var textbox: GameObject;
var uitext: UI.Text;

var state: int = 0; //0: Default 1: Textbox

var cooldown: float;

function Start() {
	rb = GetComponent. < Rigidbody2D > ();
	cooldown = Time.time;
}

function Update() {
	if (state == 0) {

		rb.velocity = new Vector2(
			Input.GetAxis("Horizontal") * speed,
			Input.GetAxis("Vertical") * speed
		);

		if (Input.GetAxis("Vertical") > 0) {
			looking = "up";
			trigger.transform.localPosition = new Vector2(0, 20);
		} else
		if (Input.GetAxis("Vertical") < 0) {
			looking = "down";
			trigger.transform.localPosition = new Vector2(0, -20);
		} else
		if (Input.GetAxis("Horizontal") > 0) {
			looking = "right";
			trigger.transform.localPosition = new Vector2(20, 0);
		} else
		if (Input.GetAxis("Horizontal") < 0) {
			looking = "left";
			trigger.transform.localPosition = new Vector2(-20, 0);
		}
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
		}
	}
}


function OnTriggerStay2D(col: Collider2D) {
	if (col.gameObject.layer != 8) {
		switch (col.gameObject.name) {
			case "book":
				uitext.text = "book";
				break;
			default:
				uitext.text = "default";
				break;
		}
	}
}

function OnTriggerExit2D(col: Collider2D) {
	uitext.text = "There's nothing to do here";
}
