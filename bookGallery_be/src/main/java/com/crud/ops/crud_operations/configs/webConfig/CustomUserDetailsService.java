package com.crud.ops.crud_operations.configs.webConfig;

import com.crud.ops.crud_operations.exceptions.CustomException;
import com.crud.ops.crud_operations.repositories.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class CustomUserDetailsService implements UserDetailsService {


    @Autowired
    private AuthorRepository authorRepository;


    public CustomUserDetailsService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    public CustomUserDetailsService() {

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return authorRepository.findByUserId(username).orElseThrow(() ->
                new CustomException("User not exists with given  username", "USER_NOT_FOUND", 404));
    }
}
