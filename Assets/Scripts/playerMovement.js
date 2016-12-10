
var rb: Rigidbody2D;
var speed: int;

function Start() {
	rb = GetComponent. < Rigidbody2D > ();
}

function Update() {
	rb.velocity = new Vector2(
		Input.GetAxis("Horizontal") * speed,
		Input.GetAxis("Vertical") * speed
	);

}
