package com.crud.ops.crud_operations.services.Impl;

import com.crud.ops.crud_operations.dtosI.AuthorIDto;
import com.crud.ops.crud_operations.dtosI.SignInDto;
import com.crud.ops.crud_operations.dtosO.LoginResponse;
import com.crud.ops.crud_operations.dtosO.SuccessMessageDto;
import com.crud.ops.crud_operations.exceptions.CustomException;
import com.crud.ops.crud_operations.models.Author;
import com.crud.ops.crud_operations.models.RefreshToken;
import com.crud.ops.crud_operations.repositories.AuthorRepository;
import com.crud.ops.crud_operations.repositories.RefreshTokenRepository;
import com.crud.ops.crud_operations.configs.jwt.JwtUtils;
import com.crud.ops.crud_operations.services.AuthService;
import com.crud.ops.crud_operations.services.AuthorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Slf4j
@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private AuthorService authorService;
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public LoginResponse signin(SignInDto signInDto) {
        log.info(signInDto.getUsername() + ' ' + signInDto.getPassword());
        Authentication authentication = null;
        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInDto.getUsername(), signInDto.getPassword()));
        } catch (AccountExpiredException ex) {
            log.warn("Account expired status - {}", ex.getMessage());
            throw new CustomException(ex.getMessage(), "Account expied", 401);
        } catch (AccountStatusException ex) {
            log.warn("Account Status Exception - {}", ex.getMessage());
            throw new CustomException(ex.getMessage(), "Account Locked", 401);
        } catch (InternalAuthenticationServiceException ex) {
            log.warn(ex.getMessage());
            throw new CustomException(ex.getMessage(), "Account Internal issue", 401);
        } catch (AuthenticationException ex) {
            log.warn("Bad credentials Authentication failed {} ", ex.getMessage());
            throw new CustomException(ex.getMessage(), "Wrong Credentials", 401);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        Author author = (Author) authentication.getPrincipal();
        Author user = authorService.findUserById(author.getId());
        String accessToken;
        String refreshToken;
        if (refreshTokenRepository.existsByAuthor(user)) {
            accessToken = jwtUtils.generateAccessToken(author);
            RefreshToken token = refreshTokenRepository.findByAuthor(user);
            refreshToken = token.getRefreshToken();
            token.setLastAccessToken(accessToken);
            refreshTokenRepository.save(token);
        } else {
            accessToken = jwtUtils.generateAccessToken(author);
            refreshToken = jwtUtils.generateRefreshTokenToken(author);
            RefreshToken refreshTokenEntity = new RefreshToken();
            refreshTokenEntity.setRefreshToken(refreshToken);
            refreshTokenEntity.setLastAccessToken(accessToken);
            refreshTokenEntity.setAuthor(user);
            refreshTokenRepository.save(refreshTokenEntity);
        }


        return LoginResponse.builder().
                accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public LoginResponse signup(AuthorIDto signUpDto) {
        log.info("check user if already exists");
        Author authorDummy = null;
        Optional<Author> doAuthorExists = Optional.ofNullable(authorDummy);
        if (signUpDto.getUserId() != null)
            doAuthorExists = authorRepository.findByUserId(signUpDto.getUserId());
        if (doAuthorExists.isPresent())
            throw new CustomException("Author with given Username - " + signUpDto.getUserId() + " already exists", "DUPLICATE_AUTHOR", 409);

        if (signUpDto.getEmail() != null)
            doAuthorExists = authorRepository.findFirstByEmail(signUpDto.getEmail());
        if (doAuthorExists.isPresent()) {
            throw new CustomException("Author with given Email - " + signUpDto.getEmail() + " already exists", "DUPLICATE_AUTHOR", 409);
        }
        if (signUpDto.getUserId() == null) {
            String[] parts = signUpDto.getEmail().split("@");
            signUpDto.setUserId(parts[0] + signUpDto.getPhone().substring(0, 3));
        }
        Author newAuthor = new Author();
        BeanUtils.copyProperties(signUpDto, newAuthor);
        newAuthor.setRole("Author");
        newAuthor.setPassword(passwordEncoder.encode(newAuthor.getPassword()));
        String userName = authorService.createAuthorUserName(newAuthor);
        return this.signin(new SignInDto(userName, signUpDto.getPassword()));
    }
}
