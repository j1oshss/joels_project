#pragma strict
	private var mainMenu : boolean = true;
	private var exitGame : boolean = false;

function Start () {

}

function Update () {

}

function OnGUI(){

	if(mainMenu == true){
	//Starts The Game If this is Pressed
		if(GUI.Button(Rect(10,10, 200, 200), "Start Game")){
			mainMenu = false;
			Application.LoadLevel("Game");
		}
	//Quites The Game If this is Pressed
		if(GUI.Button(Rect(10,500, 200, 200), "Quit Game")){
			exitGame = true;
			mainMenu = false;
		}
		
		
	}
	
	if(exitGame == true){
	//Returns to main menu
		if(GUI.Button(Rect(10,500, 200, 200), "Quit Game")){
			exitGame = false;
			mainMenu = true;
		}
	//Exits Game
		if(GUI.Button(Rect(10,500, 200, 200), "Quit Game")){
			Application.Quit();
		}
	}
	
}