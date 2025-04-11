package com.crud.ops.crud_operations.services.Impl;

import com.crud.ops.crud_operations.dtosO.*;
import com.crud.ops.crud_operations.dtosO.smallO.AuthorSmallODto;
import com.crud.ops.crud_operations.exceptions.CustomException;
import com.crud.ops.crud_operations.models.Author;
import com.crud.ops.crud_operations.models.Book;
import com.crud.ops.crud_operations.repositories.AuthorRepository;
import com.crud.ops.crud_operations.repositories.BookRepository;
import com.crud.ops.crud_operations.repositories.BookReviewRepository;
import com.crud.ops.crud_operations.services.AuthorService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.*;

//@Service
@Component
public class AuthorServiceImpl implements AuthorService {

    final AuthorRepository authorRepository;
    final BookRepository bookRepository;
    final BookReviewRepository bookReviewRepository;

    public AuthorServiceImpl(AuthorRepository authorRepository, BookRepository bookRepository, BookReviewRepository bookReviewRepository) {
        this.authorRepository = authorRepository;
        this.bookRepository = bookRepository;
        this.bookReviewRepository = bookReviewRepository;
    }

    @Override
    public List<AuthorResponseODto> getAllAuthor(Pageable page) {
        Page<Author> authors = authorRepository.findAll(page);
        List<AuthorResponseODto> authorSmallODtoList = new ArrayList<>();
        for (var author : authors) {
            authorSmallODtoList.add(new AuthorResponseODto(author));
        }
        return authorSmallODtoList;
    }

    @Override
    public List<Book> findBookOfAuthor(Long authorId) {
        List<Book> books = bookRepository.findAllByAuthor(authorRepository.findById(authorId).orElseThrow(() ->
                new CustomException("Author Not Found", "AUTHOR_NOT_FOUND", 404)));
        var v = books.stream().sorted((o1, o2) -> o1.getBookTitle().compareTo(o2.getBookTitle())).toList();
        return v;
    }

    @Override
    public AuthorResponseODto getAAuthor(Long authorId) {
        Author something = authorRepository.findById(authorId).orElseThrow(() ->
                new CustomException("Author Not Found", "AUTHOR_NOT_FOUND", 404));
        something.setBooks(bookRepository.findAllByAuthor(something));
        List<BookReviewResponseODto> bookReviews = new ArrayList<>();
        for (var r : bookReviewRepository.findReviewsWithBook(something.getBooks()).stream().limit(2).toList()) {
            bookReviews.add(r);
        }
        AuthorResponseODto authorResponseDto = new AuthorResponseODto(something);
        authorResponseDto.setReviews(bookReviews);
        return authorResponseDto;
    }

    @Override
    public AuthorSmallODto createAuthor(Author author) {
        Author authorSaved = authorRepository.save(author);
        return new AuthorSmallODto(authorSaved.getId(), authorSaved.getFirstName() + " " + authorSaved.getLastName());
    }

    @Override
    public String createAuthorUserName(Author author) {
        Author authorSaved = authorRepository.save(author);
        return authorSaved.getUsername();
    }

    @Override
    public Long getAuthorByEmail(String email) {
        Long authorId = authorRepository.findFirstByEmail(email).orElseThrow(() ->
                new CustomException("Author with " + email + " doesn't exists", "EMAIL_NOT_EXISTS", 404)).getId();
        return authorId;
    }

    @Override
    public Long getCountOfAuthor() {
        return authorRepository.count();
    }

    @Override
    public List<BookReviewResponseODto> getReviewOfAuthor(Long authorId) {
        List<Book> books = bookRepository.findAllByAuthorId(authorId);
        List<BookReviewResponseODto> bookReviews = new ArrayList<>();
        for (var r : bookReviewRepository.findReviewsWithBook(books)) {
            bookReviews.add(r);
        }
        return bookReviews.stream().sorted((o1, o2) ->
                        o1.getBook().getBookTitle().compareTo(o2.getBook().getBookTitle()))
                .toList();
    }

    @Override
    public AuthorSmallODto getAAuthorByUserId(String userId) {
        var user = new AuthorSmallODto(authorRepository.findByUserId(userId).orElseThrow(() ->
                new CustomException("User with " + userId + " doesn't exists", "USERID_NOT_EXISTS", 404)));
        return user;
    }

    @Override
    public Author findUserById(Long id) {
        return authorRepository.findById(id).orElseThrow(() -> new CustomException("user doesn't exists", "USER_NOT_FOUND", 404));
    }

    @Override
    public AuthorResponseODto getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getAuthorities().toString().contains("ROLE_ANONYMOUS")) return null;
        return new AuthorResponseODto(authorRepository.findByUserId(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found")));

    }


}
