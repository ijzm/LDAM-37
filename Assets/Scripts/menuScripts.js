var select: AudioSource;

function play() {
	select.Play();
	SceneManager.LoadScene("start");
}

function credits() {
	select.Play();
	SceneManager.LoadScene("credits");
}

function jukebox() {
	select.Play();
	SceneManager.LoadScene("jukebox");
}

function menu() {
	select.Play();
	SceneManager.LoadScene("menu");
}

function quit() {
	select.Play();
	Application.Quit();
}
