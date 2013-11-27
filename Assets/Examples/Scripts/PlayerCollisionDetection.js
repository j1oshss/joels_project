#pragma strict

// var destroyingAll : boolean = PlayerControls.destroyedPlayer;
// public var playerControls : Script;
	private var deathTimer : int = 150;
	private var isDead : boolean = false;
	private var showIsDead : boolean = false;
	public var isDeadTexture : GameObject;
	private var isDeadTextureSpawner : GameObject;
	private var isDeadTextureSpwned : GameObject;
	
function Start () {
	isDeadTextureSpawner = GameObject.FindGameObjectWithTag("IsDeadTextureSpawner");

}


function OnTriggerEnter(collision: Collider){
//DeathTimer So the player can't hit multiple obsticals before he spawns	
	if(isDead == false){
	//Destects if the player is hit
	if(collision.tag == "Player"){
		Destroy(GameObject.FindGameObjectWithTag("Player"));
		isDead = true;
		showIsDead = true;
		// HELLO JOEL POLL
		}
	}
	
}

function Update(){
	if(showIsDead == true){
		isDeadTextureSpwned = Instantiate(isDeadTexture, isDeadTextureSpawner.transform.position, isDeadTextureSpawner.transform.rotation);
		showIsDead = false;
	}else
		if(showIsDead == false){
			Destroy(GameObject.FindGameObjectWithTag("IsDeadTexture"));
		}
}

function FixedUpdate () {
	
	if(isDead == true){
		deathTimer--;
		if(deathTimer <= 0){
			Destroy(GameObject.FindGameObjectWithTag("IsDeadTexture"));
			isDead = false;
			deathTimer = 150;
		}
	}

	
	//if(destroyingAll == true){
	//	Destroy(gameObject);
	//}

}

