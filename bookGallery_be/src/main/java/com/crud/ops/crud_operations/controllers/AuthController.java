package com.crud.ops.crud_operations.controllers;


import com.crud.ops.crud_operations.dtosI.AuthorIDto;
import com.crud.ops.crud_operations.dtosI.SignInDto;
import com.crud.ops.crud_operations.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/basic/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping
    public String test() {
        return "Test at auth controller";
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody SignInDto signInDto){
        return ResponseEntity.ok(authService.signin(signInDto));
    }

//    this will register user and sign-in him Directly
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody AuthorIDto signUpDto){
        return ResponseEntity.ok(authService.signup(signUpDto));
    }
}
