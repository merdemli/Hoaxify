package com.hoaxify.ws.user.concrete;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.user.abstracts.UserRepository;
import com.hoaxify.ws.user.abstracts.UserService;

@Service
public class UserManager implements UserService {
	
	
	private UserRepository userRepository;
	
	private PasswordEncoder passwordEnchoder;
 
	
	public UserManager(UserRepository userRepository) {
		
		this.userRepository = userRepository;
		this.passwordEnchoder = new BCryptPasswordEncoder();
	}

	@Override
	public void add(User user) {
		
//		String encryptedPassword = this.passwordEnchoder.encode(user.getPassword());
//		user.setPassword(encryptedPassword);
		
		user.setPassword(this.passwordEnchoder.encode(user.getPassword()));
		userRepository.save(user);
		
		
	}

}
