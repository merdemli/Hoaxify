package com.hoaxify.ws.user.api.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.ws.error.ApiError;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.user.abstracts.UserService;
import com.hoaxify.ws.user.concrete.User;


@RestController
public class UsersController {
	
	
	private UserService userService;
	
	@Autowired
	public UsersController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/api/1.0/users")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> add(@RequestBody User user) {
		
		ApiError error = new ApiError(400,"Validation error","/api/1.0/users");
		Map<String, String>validationErrors= new HashMap<>();
		
		String username = user.getUsername();
		String displayName = user.getDisplayName();
		
		if(username==null || username.isEmpty() )
		{
			validationErrors.put("username", "username can not be null");
			
		}
		
		if(displayName==null || displayName.isEmpty() ) {
			validationErrors.put("displayName", "can not be null");
		}
		
		if(validationErrors.size()>0) {
			error.setValidationErrors(validationErrors);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);	
		}	
		userService.add(user);
		return ResponseEntity.ok(new GenericResponse("User created"));
		
		
		
		
	}
	
	

}
