#pragma strict


function Start () {


}

function Update () {

}


function OnTriggerEnter(collision: Collider){

if(collision.tag == "Player")
	Destroy(GameObject.FindGameObjectWithTag("Player"));


}