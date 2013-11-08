#pragma strict

//--VariablesForPlatFormSpawnersGameObjects--//
public var stageEndLeft : GameObject;
public var stageMid : GameObject;
public var stageEndRight : GameObject;

//--VariablesForPlatFormsSpawnersRandomly--//
private var platformNumber : int;

//--VariablesToStateWhenTheSpawnWillHappen--//
private var canSpawn: boolean;
private var distanceFromStage: float;

	//--Obsticals--//
	public var obstical1 : GameObject;
	public var obstical2 : GameObject;
	public var obstical3 : GameObject;
	public var obstical4 : GameObject;
	private var theObstical : GameObject;
	private var isTriggering : boolean = false;
	
//--ThePlayerVariables--//
private var thePlayer: GameObject;


function Start () {
	
	thePlayer = GameObject.FindWithTag("Player");
}

function Update () {

}

function OnTriggerExit(other : Collider){
	
	platformNumber = Random.Range(1, 4);
	Debug.Log(platformNumber);
	
	if(platformNumber == 1 && isTriggering == false){
		
		theObstical = Instantiate(obstical1, stageMid.transform.position, stageMid.transform.rotation);
		
	}else
		if(platformNumber == 2 && isTriggering == false){
		
		theObstical = Instantiate(obstical2, stageMid.transform.position, stageMid.transform.rotation);
		
		}else
			if(platformNumber == 3 && isTriggering == false){
		
			theObstical = Instantiate(obstical3, stageMid.transform.position, stageMid.transform.rotation);
		
			}else
				if(platformNumber == 4 && isTriggering == false){
		
				theObstical = Instantiate(obstical4, stageMid.transform.position, stageMid.transform.rotation);
		
				}
	
}

function OnTriggerEnter(other2 : Collider){
	isTriggering = true;
}
