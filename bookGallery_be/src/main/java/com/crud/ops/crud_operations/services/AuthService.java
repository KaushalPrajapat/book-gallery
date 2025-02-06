package com.crud.ops.crud_operations.services;


import com.crud.ops.crud_operations.dtosI.AuthorIDto;
import com.crud.ops.crud_operations.dtosI.SignInDto;
import com.crud.ops.crud_operations.dtosO.LoginResponse;
import com.crud.ops.crud_operations.dtosO.SuccessMessageDto;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {

    LoginResponse signin(SignInDto signInDto);

    LoginResponse signup(AuthorIDto signUpDto);
}
