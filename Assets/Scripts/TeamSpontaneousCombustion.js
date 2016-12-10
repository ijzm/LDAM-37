
import UnityEngine.SceneManagement;

function Start() {
	yield WaitForSeconds(5);
	//TODO: change game->menu
	SceneManager.LoadScene("game");
}

function Update() {

}
