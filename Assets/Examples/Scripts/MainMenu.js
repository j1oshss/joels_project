#pragma strict
	private var mainMenu : boolean = true;
	private var exitGame : boolean = false;

function Start () {

}

function Update () {

}

function OnGUI(){
	 
	if(mainMenu == true){
	 GUI.Box(Rect(Screen.width /2 - 100,Screen.height /2 - 100,250,150),"Sketch Jump");
		//Starts The Game If this is Pressed
			if(GUI.Button(Rect(Screen.width /2 - 100,Screen.height /2 - 50,250,50), "Start Game")){
				mainMenu = false;
				Application.LoadLevel("Game");
			}
		//Quites The Game If this is Pressed
			if(GUI.Button(Rect(Screen.width /2 - 100,Screen.height /2 ,250,50), "Quit Game")){
				exitGame = true;
				mainMenu = false;
			}
			
	}	

		
	if(exitGame == true){
	 GUI.Box(Rect(Screen.width /2 - 100,Screen.height /2 - 100,250,150),"Do you really want to Quit?");
	//Returns to main menu
		if(GUI.Button(Rect(Screen.width /2 - 100,Screen.height /2 ,250,50), "No")){
			exitGame = false;
			mainMenu = true;
		}
	//Exits Game
		if(GUI.Button(Rect(Screen.width /2 - 100,Screen.height /2 - 50,250,50), "Yes")){
			Application.Quit();
		}
	
	}
}