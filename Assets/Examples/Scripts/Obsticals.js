#pragma strict
	public var spawn: int;
	public var obsticalSpawner1: GameObject;
	public var obsticalSpawner2: GameObject;
	public var obsticalSpawner1_2: GameObject;
	public var obsticalSpawner2_2: GameObject;
	public var obsticalSpawner1_3: GameObject;
	public var obsticalSpawner2_3: GameObject;
	private var objectsSpawned: boolean = false;
	private var object1Spawned: boolean = false;
	private var object2Spawned: boolean = false;
	private var object3Spawned: boolean = false;
	public var obstical: GameObject;
	public var obstical1: GameObject;
	public var theObstical1: GameObject;
	public var theObstical2: GameObject;
	public var theObstical3: GameObject;
	public var amountToMove: float;
	public var speed: float = 3.00;
	private var obsticals: GameObject[];
	
//Acceleration Variables
	public var maxAcceleration : float = 10;
	private var acceleration : float;
	public var acc : float;
	private var gameLength : float;

	
//GUI Variables
	private var startGame : boolean = false;
	private var exitGame : boolean = false;
	private var mainMenu : boolean = true;
	private var pause : boolean = false;
	public var myFontStyle : Font;
	
//Life System Variables
	private var player : GameObject;
	public var playerSpawner : GameObject;
	public var playerMod : GameObject;
	private var respawnPlayer : GameObject;
	private var deathGUI : boolean = false;
	private var livesX : String;
	private var lives : int = 3;
	
//Score Variables
	private var secondsTimer : int;
	private var seconds : int;
	private var score : float;
	private var multiplyer : float;
	public var timeForNextMultiPlyer : float = 2;
	public var pwr : float = 0;

	
		
function Start () {

}

function FixedUpdate () {
//Timer
	secondsTimer++;
		if(secondsTimer == 50){
			seconds++;
		}
//Score System
	if(seconds == 3000){
		multiplyer = (Mathf.Pow(2, pwr));
	}
		score = (seconds*multiplyer);
//? Acceleration Part (1)
	//As time get longer the acceleration should also increase
	//this is going to be the number ontop of the fraction
			gameLength = Time.time;
}

function Update () {
	if(deathGUI == false){
		Screen.showCursor = false;
	}else
		if(deathGUI == true){
			Screen.showCursor = true;
	}
//Life System
	player = GameObject.FindGameObjectWithTag("Player");
	if(player == null){
		//Destroy(GameObject.FindGameObjectWithTag("Obstical"));
		if(lives > 0){
			lives--;
			respawnPlayer = Instantiate(playerMod, playerSpawner.transform.position, playerSpawner.transform.rotation);
		}else{
			deathGUI = true;
		}
	}
	//The lives Lable
	if(lives == 3){
			livesX = "X X";
		}else
			if(lives == 2){
				livesX = "X";
			}else
				if(lives == 1){
					livesX = " ";
				}
	
//If the game is Paused the game must freeze
	if(pause == true){
		Time.timeScale = 0;
	}
//checks that the objects have spawned
	if(objectsSpawned == true){
		
	}else
	//if they havn't they are then spawned
	
			if(objectsSpawned == false){

//Objects						

//1			//first Object spawned
			if(object1Spawned == false){
				spawn = Random.Range(0,2);
				if(spawn == 0){
					theObstical1 = Instantiate(obstical1, obsticalSpawner1.transform.position, obsticalSpawner1.transform.rotation);
					object1Spawned = true;
				}else
					if(spawn == 1){
						theObstical1 = Instantiate(obstical1, obsticalSpawner2.transform.position, obsticalSpawner2.transform.rotation);
						object1Spawned = true;
					}
			}
//2			//second Object spawned
			if(object2Spawned == false){
				spawn = Random.Range(0,2);
				if(spawn == 0){
					theObstical2 = Instantiate(obstical1, obsticalSpawner1_2.transform.position, obsticalSpawner1_2.transform.rotation);
					object2Spawned = true;
				}else
					if(spawn == 1){
						theObstical2 = Instantiate(obstical1, obsticalSpawner2_2.transform.position, obsticalSpawner2_2.transform.rotation);
						object2Spawned = true;
					}
			}
//3			//last Object Spawned
			if(object3Spawned == false){
				spawn = Random.Range(0,2);
				if(spawn == 0){
					theObstical3 = Instantiate(obstical, obsticalSpawner1_3.transform.position, obsticalSpawner1_3.transform.rotation);
					object3Spawned = true;
				}else
					if(spawn == 1){
						theObstical3 = Instantiate(obstical, obsticalSpawner2_3.transform.position, obsticalSpawner2_3.transform.rotation);
						object3Spawned = true;
					}
			}
			//End of Spawning Objects
//Check that Objects have all Spawned
			if(object1Spawned == true && object2Spawned == true && object3Spawned == true){
				objectsSpawned = true;
			}
			
		}
//Checks if the Respawns can start which is when the obsticals are far enough down the path	
		if(theObstical3.transform.position.x > -9){
			objectsSpawned = false;
			object1Spawned = false;
			object2Spawned = false;
			object3Spawned = false;
		}
		
	obsticals = GameObject.FindGameObjectsWithTag("Obsticals");
	amountToMove = speed * Time.deltaTime*(acceleration);
	
//? Some Error is being thrown here...Please check it out if u can, the game does seem to work
	for(var i = 0; i < obsticals.length; i++){
	obsticals[i].transform.Translate(Vector3.right * amountToMove);
	}


//? Acceleration Part (2)		
	//this will be the ractio
			if(acceleration <= maxAcceleration){
				acceleration = ((10+gameLength)/acc);
			}else{
				acceleration = acceleration;
			}
				
				
//* Point System
	/*if(){
		
	}*/
		
		//Debug.Log("TimeForNExtMultiPlyer: "+timeForNextMultiPlyer+"\n Score: "+score+" - Multiplyer: "+pwr+"X");
		//Debug.Log("Game Length: "+gameLength);

}

//GUI 
function OnGUI(){
	//Score Lable
	GUI.skin.label.font = myFontStyle;
	GUI.skin.label.fontSize = 35;
	GUI.backgroundColor = new Color(255,255,255,0f);
	GUI.color = Color.black;
		GUI.Label (Rect (Screen.width/2-350 ,Screen.height/2 -300, 600, 500), "Score: "+score+" x"+multiplyer);
		GUI.Label (Rect (Screen.width/2-350 ,Screen.height/2 -250, 200, 500), "Lifes: "+livesX);
		///////////////////Death GUI//////////////////////
		if(deathGUI == true){
			//
			GUI.Box(Rect(Screen.width /2 - 225,Screen.height /2 -150,500,150), "Game Over");
			//Make Retry button
			if(GUI.Button(Rect(Screen.width /2 - 100,Screen.height /2 - 50,250,50), "Retry")){
				Application.LoadLevel("Main");
				deathGUI = false;
			}
			//Make MainMenu button
			if(GUI.Button(Rect(Screen.width /2 - 100,Screen.height /2,250,50), "Main Menu")){
				Application.LoadLevel("MainMenu");	
				Screen.showCursor = true;
				deathGUI = false;
			}
		}
	}

			
	