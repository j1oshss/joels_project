#pragma strict
	public var speed: float = 3.0;
	private var amountToMove: float;

function Update () {
	//transform.Translate(-1,0,0);
	
	amountToMove = speed * Time.deltaTime;
	transform.Translate(Vector3.left * amountToMove);
	
	if(transform.position.x < -15.00){
		transform.position = new Vector3(14.9, transform.position.y, transform.position.z);
	}
}