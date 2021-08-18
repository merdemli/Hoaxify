package com.hoaxify.ws.user.abstracts;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoaxify.ws.user.concrete.User;

public interface UserRepository extends JpaRepository<User, Long >{

}
