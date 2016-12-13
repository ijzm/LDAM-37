function OnTriggerEnter2D(col: Collider2D) {
	if (col.gameObject.name == "Fireball") {
		var newtorch = Instantiate(Resources.Load("torch_lit"), transform.position, Quaternion.identity);
		if (transform.localScale.x == -1) {
			newtorch.transform.localScale.x = -1;
		}
		Destroy(gameObject);
	}
}
