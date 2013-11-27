#pragma strict

	private var stageEndLeft: GameObject;
	private var player1 : GameObject;
	private var positionOfRayCast : Vector3;
	
function Start () {
 stageEndLeft = GameObject.FindWithTag("StageEndLeft");
 player1 = GameObject.FindGameObjectWithTag("Player");
}

function Update () {
	positionOfRayCast = (Vector3(gameObject.transform.position.x, (gameObject.transform.position.y - 0.5), gameObject.transform.position.z));
	//changed the destroyer to y position for test CHAGE BACK!!

	
	//for testing purposes//
	//this.transform.Translate(Vector3.down * (Time.deltaTime*2), Space.World);
	
	if((this.transform.position.x) >= (15)){
		Destroy(gameObject);
	}
	//	var hit : RaycastHit;
	//	var obsticalPosition : ;
		//var p1 : Vector3 = transform.position + charCtrl.center;
		// Cast a sphere wrapping character controller 10 meters forward, to see if it is about to hit anything
		//if (Physics.SphereCast (p1, charCtrl.height / 2, transform.forward, hit, 10)) {
		//	Destroy(player1);
	//	}
}


//Kills the player if he touches an Obstical
