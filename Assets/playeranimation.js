
var a: Animator;

function Start() {
	a = GetComponent("Animator");
}

function Update() {
	print(Input.GetAxis("Vertical") + "," + Input.GetAxis("Horizontal") + "," + a.GetInteger("state"));
	if (Input.GetAxis("Vertical") > 0) {
		a.SetInteger("state", 1);
	} else
	if (Input.GetAxis("Vertical") < 0) {
		a.SetInteger("state", 2);
	}
	if (Input.GetAxis("Horizontal") > 0) {
		a.SetInteger("state", 3);
		transform.localScale.x = 1;
	} else
	if (Input.GetAxis("Horizontal") < 0) {
		a.SetInteger("state", 3);
		transform.localScale.x = -1;
	}
	if (Input.GetAxis("Vertical") == 0 && Input.GetAxis("Horizontal") == 0) {
		a.SetInteger("state", 0);
	}
}
