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
	public var acc : float;
	public var obstical: GameObject;
	public var theObstical1: GameObject;
	public var theObstical2: GameObject;
	public var theObstical3: GameObject;
	public var amountToMove: float;
	public var speed: float = 3.00;
	private var obsticals: GameObject[];
	private var acceleration : float;
	private var gameLength : float;
	private var score : float;
	public var pwr : float;
	public var timeForNextMultiPlyer : float = 2;
	private var multiplyer : float;
	
		
function Start () {

}

function FixedUpdate () {
//? Acceleration Part (1)
	//As time get longer the acceleration should also increase
	//this is going to be the number ontop of the fraction
			gameLength = Time.time;
}

function Update () {
	
	

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
					theObstical1 = Instantiate(obstical, obsticalSpawner1.transform.position, obsticalSpawner1.transform.rotation);
					object1Spawned = true;
				}else
					if(spawn == 1){
						theObstical1 = Instantiate(obstical, obsticalSpawner2.transform.position, obsticalSpawner2.transform.rotation);
						object1Spawned = true;
					}
			}
//2			//second Object spawned
			if(object2Spawned == false){
				spawn = Random.Range(0,2);
				if(spawn == 0){
					theObstical2 = Instantiate(obstical, obsticalSpawner1_2.transform.position, obsticalSpawner1_2.transform.rotation);
					object2Spawned = true;
				}else
					if(spawn == 1){
						theObstical2 = Instantiate(obstical, obsticalSpawner2_2.transform.position, obsticalSpawner2_2.transform.rotation);
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
		if(theObstical3.transform.position.x < 10){
			objectsSpawned = false;
			object1Spawned = false;
			object2Spawned = false;
			object3Spawned = false;
		}
		
	obsticals = GameObject.FindGameObjectsWithTag("Obsticals");
	amountToMove = speed * Time.deltaTime*(acceleration);
	
//? Some Error is being thrown here...Please check it out if u can, the game does seem to work
	for(var i = 0; i < obsticals.length; i++){
	obsticals[i].transform.Translate(Vector3.left * amountToMove);
	}

//? Acceleration Part (2)		
	//this will be the fractio
				acceleration = ((10+gameLength)/acc);
				
//* Point System
		if(gameLength > timeForNextMultiPlyer){
			timeForNextMultiPlyer = (gameLength + 2);
			multiplyer = (Mathf.Pow(2, pwr));
			pwr++;
		}
		score = (amountToMove*multiplyer);
		
		Debug.Log("TimeForNExtMultiPlyer: "+timeForNextMultiPlyer+"\n Score: "+score+" - Multiplyer: "+pwr+"X");
		Debug.Log("Game Length: "+gameLength);
}


			
	