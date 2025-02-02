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
import org.springframework.stereotype.Service;

import java.util.*;

@Service
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
        for (var author : authors){
            authorSmallODtoList.add(new AuthorResponseODto(author));
        }
//        System.out.println(authors.getSize());
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
//        System.out.println("Fetch reviews for books " + something.getBooks().size());
        List<BookReviewResponseODto> bookReviews = new ArrayList<>();
        for (var r : bookReviewRepository.findReviewsWithBook(something.getBooks()).stream().limit(2).toList()) {
            bookReviews.add(r);
        }
//        System.out.println("Fetched reviews are : " + bookReviews.size());
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
    public Long getAuthorByEmail(String email) {
        Long authorId = authorRepository.findByEmail(email).orElseThrow(() ->
                new CustomException("Author with " + email + " doesn't exists", "EMAIL_NOT_EXISTS", 404));
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
        var user =  new AuthorSmallODto(authorRepository.findByUserId(userId).orElseThrow(() ->
                new CustomException("User with " + userId + " doesn't exists", "USERID_NOT_EXISTS", 404)));
        return user;
    }
}
