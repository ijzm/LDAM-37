
function OnTriggerEnter2D(col: Collider2D) {
	if (col.gameObject.name == "Fireball") {
		Instantiate(Resources.Load("torch_lit"), transform.position, Quaternion.identity);
		Destroy(gameObject);
	}
}
