#pragma strict
	
	var scrollSpeed : float = 0.2;
	var numberOfOffsets : int = 1;
	var gameTime : float = 0.0;
	var materials : Material[];
	var running : boolean = true;
	var controller : CharacterController; 
	var timer : int;
	var numberMaterial : int = 0;
	var accTimer : int = 0;
	var acc : int = 6;
	
function Start() {
	controller = GetComponent(CharacterController);
	renderer.material = materials[0];
}

function Update(){
	
	/*if(Input.GetKeyDown(KeyCode.Space)){
		running = false;
	}else
		if(controller.isGrounded == true){
			running = true;
		}*/
	
}

function FixedUpdate () {
	if(Input.GetKeyDown(KeyCode.Space)){
		numberOfOffsets = 0;
	}
	timer++;
	accTimer++;
	if(accTimer == 40){
		if(acc != 1){
			acc--;
			timer = 0;
			accTimer = 0;
			Debug.Log("Speeding Up");
		}
	}
			StickManRun();
		
}

//This is for the Running Animation
function StickManRun(){
		if(controller.isGrounded == true){
	//Changes Material
			if(numberMaterial != 0){
				renderer.material = materials[0];
				numberMaterial = 0;
			}
		}else
			if(controller.isGrounded == false)
			{
				if(numberMaterial != 1){
					renderer.material = materials[1];
					numberMaterial = 1;
				}
			}
			//If the Player is Jumping
			if(numberMaterial == 1){
				scrollSpeed = 0.33;
			}else
			//If the Player is Running
			{
				scrollSpeed = 0.2;
			}
			
			
			if(numberMaterial == 0){
			//If the player is Running
				if(timer == 1*acc){
					timer = 0;
					if(numberOfOffsets <= 4){
					renderer.material.SetTextureOffset("_MainTex", Vector2((numberOfOffsets*scrollSpeed), 0));
					Debug.Log("Still Running");
					if(numberOfOffsets == 4){
							numberOfOffsets = 0;
						}else{
							
							numberOfOffsets++;
						}
					}
						
				}
			}else{
			//If the Player is Jumping	
				if(timer == 1*acc){
					timer = 0;
					if(numberOfOffsets <= 2){
						if(numberOfOffsets == 2){
								numberOfOffsets = 2;
							}else{
								renderer.material.SetTextureOffset("_MainTex", Vector2((numberOfOffsets*scrollSpeed), 0));
								numberOfOffsets++;
							}
					}
						
				}
			}
		
}

