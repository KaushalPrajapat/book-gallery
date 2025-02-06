package com.crud.ops.crud_operations.controllers;

import com.crud.ops.crud_operations.dtosI.BookReviewIDto;
import com.crud.ops.crud_operations.services.AuthorService;
import com.crud.ops.crud_operations.services.BookReviewService;
import com.crud.ops.crud_operations.services.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/basic")
public class BookReviewController {
    final AuthorService authorService;
    final BookService bookService;
    final BookReviewService bookReviewService;

    public BookReviewController(AuthorService authorService, BookService bookService, BookReviewService bookReviewService) {
        this.authorService = authorService;
        this.bookService = bookService;
        this.bookReviewService = bookReviewService;
    }

    @GetMapping("/book/reviews/{bookId}")
    public ResponseEntity<?> getReviewsOfABook(@PathVariable Long bookId) {
        return ResponseEntity.ok(bookService.getReviewsOfABook(bookId));
    }

    @GetMapping("/book/author/{bookId}")
    public ResponseEntity<?> getAuthorOfABook(@PathVariable Long bookId) {
        return ResponseEntity.ok(bookService.getAuthorOfABook(bookId));
    }

    @PostMapping("/create/book-review")
    public ResponseEntity<?> createABookReview(@RequestBody BookReviewIDto bookReviewInput) {
        return ResponseEntity.ok(bookReviewService.createABookReview(bookReviewInput));
    }
}
