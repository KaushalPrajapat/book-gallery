package com.crud.ops.crud_operations.services.Impl;

import com.crud.ops.crud_operations.exceptions.CustomException;
import com.crud.ops.crud_operations.models.Author;
import com.crud.ops.crud_operations.services.AuthService;
import com.crud.ops.crud_operations.services.AuthorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;


@Slf4j
@Component
public class AuthUtils {
    private final AuthorService authorService;

    public AuthUtils(AuthorService authorService) {
        this.authorService = authorService;
    }

    public Author getLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Author authorL = (Author) authentication.getPrincipal();
        Author author = authorService.findUserById(authorL.getId()); // If author not exists already handled in author service
        return author;
    }
}
