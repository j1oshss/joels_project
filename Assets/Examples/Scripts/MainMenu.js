#pragma strict
	private var mainMenu : boolean = true;
	private var exitGame : boolean = false;
	var menuFont : Font;


function Start () {

}

function Update () {

}

function OnGUI(){
	GUI.skin.box.font = menuFont;
	GUI.skin.button.font = menuFont;
	GUI.backgroundColor = new Color(255,255,255,0f);
	GUI.skin.box.fontSize = 40;
	GUI.skin.button.fontSize = 25;
	 
	if(mainMenu == true){
	 GUI.Box(Rect(Screen.width /2 - 225,Screen.height /2 - 100,500,150),"Sketch Jump");
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
	 GUI.Box(Rect(Screen.width /2 -250,Screen.height /2 - 125,600,100),"Do you really want to Quit?");
	//Returns to main menu
		if(GUI.Button(Rect(Screen.width /2 + 100,Screen.height /2 - 75,250,50), "No")){
			exitGame = false;
			mainMenu = true;
		}
	//Exits Game
		if(GUI.Button(Rect(Screen.width /2 - 250,Screen.height /2 - 75,250,50), "Yes")){
			Application.Quit();
		}
	
	}
}