//*******************************************************************************
//*																							*
//*							Written by Grady Featherstone								*
//*									© Copyright 2011										*
//*******************************************************************************
var mainMenuSceneName : String;
var pauseMenuFont : Font;
private var pauseEnabled = false;			
var hoveringResume : boolean;
var hoveringQuit : boolean;
var hoveringMain : boolean;

function Start(){
	pauseEnabled = false;
	Time.timeScale = 1;
	AudioListener.volume = 1;
	Screen.showCursor = false;
}

function Update(){
	//Hover State On Resume Button
		if(Input.mousePosition.y <= Screen.height /2 +150 && Input.mousePosition.y <= Screen.height /2){
			hoveringResume = true;
			hoveringQuit = false;
			hoveringMain = false;
		}else
			if(Input.mousePosition.y <= Screen.height /2 && Input.mousePosition.y <= Screen.height /2 + 75){
				hoveringQuit = true;
				hoveringResume = false;
				hoveringMain = false;
			}else{
				hoveringQuit = false;
				hoveringResume = false;
				hoveringMain = true;
			}

	//check if pause button (escape key) is pressed
	if(Input.GetKeyDown("escape")){
	
		//check if game is already paused		
		if(pauseEnabled == true){
			//unpause the game
			pauseEnabled = false;
			Time.timeScale = 1;
			AudioListener.volume = 1;
			Screen.showCursor = false;			
		}
		
		//else if game isn't paused, then pause it
		else if(pauseEnabled == false){
			pauseEnabled = true;
			AudioListener.volume = 0;
			Time.timeScale = 0;
			Screen.showCursor = true;
		}
	}
}

private var showGraphicsDropDown = false;

function OnGUI(){

GUI.skin.box.font = pauseMenuFont;
GUI.skin.button.font = pauseMenuFont;
	GUI.backgroundColor = new Color(255,255,255,0f);
	GUI.skin.box.fontSize = 50;
	GUI.skin.button.fontSize = 30;

	GUI.color = Color.black;

	if(pauseEnabled == true){
		
		//Make a background box
		GUI.Box(Rect(Screen.width /2 - 225,Screen.height /2 -150,500,150), "Pause Menu");
			//Hover State On Resume Button
			if(hoveringResume == true){
				GUI.skin.button.fontSize = 40;
			}
		//Make Resume Button
		if(GUI.Button(Rect(Screen.width /2 - 100,Screen.height /2 - 50,250,50), "Resume")){
			pauseEnabled = false;
			Time.timeScale = 1;
			AudioListener.volume = 1;
			Screen.showCursor = false;	
		}
			GUI.skin.button.fontSize = 30;
				//Hover State On Resume Button
			if(hoveringMain == true){
				GUI.skin.button.fontSize = 40;
			}
		
		//Make Main Menu button
		if(GUI.Button(Rect(Screen.width /2 - 100,Screen.height /2 ,250,50), "Main Menu")){
			Application.LoadLevel("mainMenu");
		}
			GUI.skin.button.fontSize = 30;
		//Make Change Graphics Quality button
			/*if(GUI.Button(Rect(Screen.width /2 - 100,Screen.height /2 +50,250,50), "Change Graphics Quality")){
			
			if(showGraphicsDropDown == false){
				showGraphicsDropDown = true;
			}
			else{
				showGraphicsDropDown = false;
			}
		}
		
		//Create the Graphics settings buttons, these won't show automatically, they will be called when
		//the user clicks on the "Change Graphics Quality" Button, and then dissapear when they click
		//on it again....
		if(showGraphicsDropDown == true){
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 ,250,50), "Fastest")){
				QualitySettings.currentLevel = QualityLevel.Fastest;
			}
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 + 50,250,50), "Fast")){
				QualitySettings.currentLevel = QualityLevel.Fast;
			}
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 + 100,250,50), "Simple")){
				QualitySettings.currentLevel = QualityLevel.Simple;
			}
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 + 150,250,50), "Good")){
				QualitySettings.currentLevel = QualityLevel.Good;
			}
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 + 200,250,50), "Beautiful")){
				QualitySettings.currentLevel = QualityLevel.Beautiful;
			}
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 + 250,250,50), "Fantastic")){
				QualitySettings.currentLevel = QualityLevel.Fantastic;
			}
			
			if(Input.GetKeyDown("escape")){
				showGraphicsDropDown = false;
			}
		}*/
			//Hover State On Resume Button
			if(hoveringQuit == true){
				GUI.skin.button.fontSize = 40;
			}
		//Make quit game button
		if (GUI.Button (Rect (Screen.width /2 - 100,Screen.height /2 + 75,250,50), "Quit To Menu")){
			Application.Quit();
		}

	}
}