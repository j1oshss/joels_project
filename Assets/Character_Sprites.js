#pragma strict
	
	var scrollSpeed : float = 0.2;
	var numberOfOffsets : int = 1;
	var gameTime : float = 0.0;
	var materials : Material[];
	var running : boolean = true;
	var controller : CharacterController; 
	
function Start() {
	gameTime = Time.time;
	controller = GetComponent(CharacterController);
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
	
		StickManRun();
}

//This is for the Running Animation
function StickManRun(){
		if(renderer.material == materials[1]){
	//Changes Material
		renderer.material = materials[0];
	}
		if(Time.time - gameTime == 0.5){
			gameTime = Time.time;
			if(numberOfOffsets <= 3){
			renderer.material.SetTextureOffset("_MainTex", Vector2((numberOfOffsets*scrollSpeed), 0));
			if(numberOfOffsets == 3){
					numberOfOffsets = 1;
				}else{
					numberOfOffsets++;
				}
			}
				
		}
}

//This Is for the Jumping Animation
function StickManJump(){
	if(renderer.material == materials[0]){
	//Changes Material
		renderer.material = materials[1];
	}
		if(Time.time - gameTime == 0.5){
			gameTime = Time.time;
			if(numberOfOffsets <= 3){
			renderer.material.SetTextureOffset("_MainTex", Vector2((numberOfOffsets*scrollSpeed), 0));
			if(numberOfOffsets == 3){
					numberOfOffsets = 1;
				}else{
					numberOfOffsets++;
				}
			}
				
		}
}