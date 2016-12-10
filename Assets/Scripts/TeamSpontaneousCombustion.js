
import UnityEngine.SceneManagement;

function Start() {
	yield WaitForSeconds(5);
	SceneManager.LoadScene("menu");
}

function Update() {

}
