
var uitext: UI.Text;
var sound: AudioSource;
var text: String = "???: Enough! I will have no more of this." +
	"\n" +
	"Player: What? Who’s there? I’m not afraid of you!" +
	"\n" +
	"???: Look not with your eyes, for I am the soul and spirit of the very library you’re standing in. For many years have we waited for another to cross into our world, but alas, every time one solves each of our puzzles. I fear we simply don’t have the same “edge” we used to…" +
	"\n" +
	"Player: Hold on, so you’re the one who set this whole thing up? Luring innocent people into this old library so you could kill them and turn them into ghosts… what a horrible thing to do." +
	"\n" +
	"???: I understand if you cannot forgive me. But can you truly blame me after centuries of boredom and neglect from the outside? All I truly desire is some company." +
	"\n" +
	"Player: Dude, why didn’t you say so? I can come back here any time you want." +
	"\n" +
	"???: You would… come back to me? After all the pain I’ve brought upon you?" +
	"\n" +
	"Player: Psssh, it wasn’t THAT hard. This place could use some cleaning up, anyway." +
	"\n" +
	"???: Oh, dear mortal… I cannot thank you enough for your gratitude. This will be the beginning of a new era for us." +
	"\n" +
	"Player: One more thing. It’s been a while since I’ve found something to read on my own time, so could I get a library card? You know, so I can check out books from here." +
	"\n" +
	"???: …" +
	"\n" +
	"???: ...a what?";

function Start() {
	AnimateText(text);
	print("Ks");
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
	SceneManager.LoadScene("credits");
}
