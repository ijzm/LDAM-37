
var rb: Rigidbody2D;
var speed: int;

var health: int = 3;

var looking: String = "up";
var trigger: GameObject;

var textbox: GameObject;
var uitext: UI.Text;
var towrite: String = "There's nothing to do here.";

var books: GameObject[];

var state: int = 0; //0: Default 1: Textbox

var canfire: boolean = false;

var cooldown: float;
var healthcooldown: float;
var flickercooldown: float;

var Event: String = "";
var lights: GameObject;
var charlight: GameObject;

var spriterenderer: SpriteRenderer;

var debugmoveroom: boolean = false;
var debuglittorches: boolean = false;
var rotatethingy: GameObject[];
var roommoved: boolean = false;
var littorches: boolean = false;
var hasenemies: boolean = false;

var music: AudioSource[];
var tobreak: boolean = false;
var isanimatingtext: boolean = false;
var icebookenabled: boolean = false;

function Start() {
	health = 5;
	rb = GetComponent. < Rigidbody2D > ();
	spriterenderer = GetComponent. < SpriteRenderer > ();
	cooldown = Time.time;
	healthcooldown = Time.time;
	flickercooldown = Time.time;

	music[2].Play();
	fade(100, 2);
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

	if (Input.GetKeyUp("z") && Time.time > cooldown) {
		if (isanimatingtext) {
			isanimatingtext = false;
			tobreak = true;
		}
		cooldown = Time.time + 0.3;
		if (state == 0) {
			state = 1;
			rb.velocity = Vector2.zero;
			textbox.SetActive(true);
			AnimateText(towrite);
		} else
		if (state == 1) {
			state = 0;
			textbox.SetActive(false);
			if (Event == "DarkBook") {
				dark();
			}
			if (Event == "FireBook") {
				firedialog();

			}
			if (Event == "WaterBook") {
				water();
			}
			if (Event == "IceBook") {
				ice();
			}
		}
		towrite = "There's nothing to do here.";
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



	if ((canfire && GameObject.FindGameObjectsWithTag("Enemy").length == 0 && !roommoved && hasenemies) || debugmoveroom) {
		moveroom();
		roommoved = true;
	}
	if ((roommoved && GameObject.FindGameObjectsWithTag("Torch").length == 0 && !littorches && books[2].transform.position.x == 10000) || debuglittorches) {
		finishtorches();
		littorches = true;
	}
	if (icebookenabled && GameObject.FindGameObjectsWithTag("Enemy").length == 0) {
		SceneManager.LoadScene("end");
	}
}



function OnTriggerEnter2D(col: Collider2D) {
	print(col.gameObject.name);
	switch (col.gameObject.name) {
		case "DarkBook":
			towrite = "What the heck? What’s with the dark, ominous glow on this book?";
			Event = "DarkBook";
			break;
		case "FireBook":
			towrite = "There’s a glowing book with a symbol of a flame on the cover… I wonder if it’ll help me at all.";
			Event = "FireBook";
			break;
		case "WaterBook":
			towrite = "Oh great, another magical book. What next?";
			Event = "WaterBook";
			break;
		case "IceBook":
			towrite = "Ice, huh? I can only imagine what this will do to the water...";
			Event = "IceBook";
			break;
		default:
			towrite = "There's nothing to do here.";
			Event = "";
			break;
	}

	if (col.gameObject.tag == "Enemy" && Time.time > healthcooldown) {
		music[Random.Range(3, 4)].Play();
		health--;
		healthcooldown = Time.time + 3;
	}

}

function OnTriggerExit2D(col: Collider2D) {
	towrite = "There's nothing to do here.";
	Event = "";
}

function dark() {
	music[0].Play();
	fade(2, 0);
	Event = "";
	lights.SetActive(false);
	charlight.SetActive(true);
	Instantiate(Resources.Load("DarkBookEnemies"), Vector2.zero, Quaternion.identity);
	books[0].transform.position.x = 10000;
	hasenemies = true;

	state = 1;
	towrite = "Uh oh, that can’t be good";
	AnimateText(towrite);
	rb.velocity = Vector2.zero;
	textbox.SetActive(true);
}

function fire() {
	health++;
	canfire = true;
	Event = "";
	books[1].transform.position.x = 10000;

	state = 1;
	towrite = "Thou shalt use the eternal power of the X key to summon great balls of fire.” What a strange way to write a spellbook… I wonder if it actually works?";
	AnimateText(towrite);
	rb.velocity = Vector2.zero;
	textbox.SetActive(true);
}

function moveroom() {
	rotatethingy[0].SetActive(false);
	rotatethingy[1].SetActive(true);
	state = 1;
	towrite = "You feel something around the room move.";
	AnimateText(towrite);
	rb.velocity = Vector2.zero;
	textbox.SetActive(true);
}

function water() {
	health++;
	music[7].Play();
	music[1].Play();
	fade(0, 1);
	Event = "";
	books[2].transform.position.x = 10000;
	rotatethingy[2].transform.position.y = 1000;
	rotatethingy[3].transform.position.y = 84;
	transform.position.y = 75;
	Instantiate(Resources.Load("WaterBook_Torches"), Vector2.zero, Quaternion.identity);
	spriterenderer.sortingOrder = 10;
	books[3].SetActive(true);

	state = 1;
	towrite = "Is that… water on the floor? EEK! It’s rising! It’s rising";
	AnimateText(towrite);
	rb.velocity = Vector2.zero;
	textbox.SetActive(true);
}

function finishtorches() {
	Event = "";
	state = 1;
	towrite = "You feel something around the room change.";
	AnimateText(towrite);
	rb.velocity = Vector2.zero;
	textbox.SetActive(true);
	rotatethingy[4].SetActive(false);
	rotatethingy[5].SetActive(true);
}

function ice() {
	health++;
	Event = "";
	books[3].transform.position.x = 10000;
	rotatethingy[6].SetActive(false);
	rotatethingy[7].SetActive(true);
	rotatethingy[5].SetActive(false);
	rotatethingy[8].SetActive(false);
	icebookenabled = true;
}

function AnimateText(strComplete: String) {
	var i: int = 0;
	str = "";
	isanimatingtext = true;
	while (i < strComplete.Length) {
		str += strComplete[i++];
		uitext.text = str;
		music[6].Play();
		yield WaitForSeconds(0.05);
		if (tobreak) {
			tobreak = false;
			isanimatingtext = false;
			towrite = "There's nothing to do here.";
			break;
		}
	}
	isanimatingtext = false;
}

function fade(a, b) {
	var t = 0.0;
	while (t < 1.0) {
		t += Time.deltaTime;
		if (a != 100) {
			music[a].volume = Mathf.Abs(t - 1);
		}
		music[b].volume = t;
		yield WaitForSeconds(0.1);
	}
}

function firedialog() {
	state = 1;
	towrite = "You turn to the first page of the book";
	AnimateText(towrite);
	rb.velocity = Vector2.zero;
	textbox.SetActive(true);
	fire();
}
