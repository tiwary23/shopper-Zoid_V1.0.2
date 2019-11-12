package com.stackroute.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.validator.constraints.Email;

import javax.persistence.*;

@Entity
@Table(name = "user")
@Data
public class AuthUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column
	@Email
	private String emailId;
	@Column
	@JsonIgnore
	private String password;
	@Column
	private String role;

}