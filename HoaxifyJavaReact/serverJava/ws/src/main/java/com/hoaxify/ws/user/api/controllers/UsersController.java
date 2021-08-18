package com.hoaxify.ws.user.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

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
	public GenericResponse add(@RequestBody User user) {
		
		userService.add(user);
		return new GenericResponse("User created");
		
		
		
		
		
	}

}
