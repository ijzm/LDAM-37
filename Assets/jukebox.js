var music: AudioSource[];

function playmusic(number: int) {
	pause();
	music[number].Play();
}

function pause() {
	for (var i = 0; i < music.length; i++) {
		music[i].Stop();
	}
}

function menu() {
	SceneManager.LoadScene("menu");
}
