#pragma strict

	var speed : float;
	var jumpSpeed : float;
	var gravity : float;
	var jumpTime : float;
	public var destroyedPlayer : boolean;
	



	private var moveDirection : Vector3 = Vector3.zero;

	function Update() {
		if(gameObject == null){
			destroyedPlayer = true;
		}else{
			destroyedPlayer = false;
		}
	
		var controller : CharacterController = GetComponent(CharacterController);
			
		if (controller.isGrounded) {
			// We are grounded, so recalculate
			// move direction directly from axes
			
			moveDirection = Vector3(Input.GetAxis("Vertical"),0,0);
			moveDirection = transform.TransformDirection(moveDirection);
			moveDirection *= speed;
		
			
			if (Input.GetButtonDown("Jump")) {
				moveDirection.y = jumpSpeed;
			}
		}else
			if(Input.GetButtonUp("Jump")){
				moveDirection.y -= gravity;
			}

		// Apply gravity
		moveDirection.y -= gravity * Time.deltaTime;
		
		// Move the controller
		controller.Move(moveDirection * Time.deltaTime);
	}
	
	