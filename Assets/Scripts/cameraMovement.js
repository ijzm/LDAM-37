var player: GameObject;
var maxX: int;
var minX: int;
var maxY: int;
var minY: int;

function Update() {
	transform.position.x = Mathf.Clamp(player.transform.position.x, minX, maxX);
	transform.position.y = Mathf.Clamp(player.transform.position.y, minY, maxY);

}
