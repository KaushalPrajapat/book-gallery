package com.crud.ops.crud_operations.controllers;


import com.crud.ops.crud_operations.dtosO.AuthorResponseODto;
import com.crud.ops.crud_operations.dtosO.BookReviewResponseODto;
import com.crud.ops.crud_operations.dtosO.smallO.AuthorSmallODto;
import com.crud.ops.crud_operations.models.Author;
import com.crud.ops.crud_operations.models.Book;
import com.crud.ops.crud_operations.services.AuthorService;
import com.crud.ops.crud_operations.services.BookReviewService;
import com.crud.ops.crud_operations.services.BookService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/basic")
public class AuthorController {

    final AuthorService authorService;
    final BookService bookService;
    final BookReviewService bookReviewService;

    public AuthorController(AuthorService authorService, BookService bookService, BookReviewService bookReviewService) {
        this.authorService = authorService;
        this.bookService = bookService;
        this.bookReviewService = bookReviewService;
    }

    @GetMapping("/author")
    public ResponseEntity<?> getAllAuthor(@RequestParam(name = "size") int count,
                                          @RequestParam(name = "page") int pageNumber) {
        Pageable page = PageRequest.of(pageNumber, count);

        return ResponseEntity.ok(authorService.getAllAuthor(page));
    }

//    @PostMapping("/create/author")
//    public ResponseEntity<?> createAuthor(@RequestBody Author author) {
//        return ResponseEntity.ok(authorService.createAuthor(author));
//    }

    @GetMapping("/author/count")
    public ResponseEntity<Long> getCountOfAuthor() {
        return ResponseEntity.ok(authorService.getCountOfAuthor());
    }

    @GetMapping("/author/review/{userId}")
    public ResponseEntity<List<BookReviewResponseODto>> getReviewOfAuthor(@PathVariable(name = "userId") Long userId) {
        return ResponseEntity.ok(authorService.getReviewOfAuthor(userId));
    }

    @GetMapping("/author/{authorId}")
    public ResponseEntity<AuthorResponseODto> getAAuthor(@PathVariable Long authorId) {
        return ResponseEntity.ok(authorService.getAAuthor(authorId));
    }

    @GetMapping("/author/profile")
    public ResponseEntity<AuthorResponseODto> getProfile() {
        return ResponseEntity.ok(authorService.getProfile());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<AuthorSmallODto> getAAuthorByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(authorService.getAAuthorByUserId(userId));

    }

    @GetMapping("/author/{authorId}/book")
    public ResponseEntity<List<Book>> getAllBookOfAuthor(@PathVariable Long authorId) {
        return ResponseEntity.ok(authorService.findBookOfAuthor(authorId));
    }

}
