
var uitext: UI.Text;
var sound: AudioSource;
var text: String =
	"Ugh, I’ve got to get out of this rain! Please, any shelter will do! A restaurant, a motel, anything… wait, perfect! A library! Gosh, these doors look old…" +
	"\n" +
	"Player: I’m surprised this library was even open this late… it doesn’t look like anyone’s in here, so I may as well take a look around.";

function Start() {
	AnimateText(text);
	yield WaitForSeconds(12);
	skip();
}

function AnimateText(strComplete: String) {
	var i: int = 0;
	str = "";
	while (i < strComplete.Length) {
		str += strComplete[i++];
		uitext.text = str;
		sound.Play();
		yield WaitForSeconds(0.02);
	}
}

function skip() {
	SceneManager.LoadScene("game");
}
