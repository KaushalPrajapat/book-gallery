package com.crud.ops.crud_operations.dtosO;

import com.crud.ops.crud_operations.dtosO.smallO.AuthorSmallODto;
import com.crud.ops.crud_operations.dtosO.smallO.BookReviewSmallODto;
import com.crud.ops.crud_operations.dtosO.smallO.BookSmallODto;
import com.crud.ops.crud_operations.models.Book;
import com.crud.ops.crud_operations.models.BookReview;
import lombok.*;

@Data
@Getter
@Setter
public class BookReviewResponseODto {

    private Long bookReviewId;
    private String bookReviewTitle;
    private String bookReview;
    private float bookReviewRating;
    private BookSmallODto book;

    private AuthorSmallODto author = new AuthorSmallODto();

    public BookReviewResponseODto(Long bookReviewId, String bookReviewTitle,
                                  String bookReview, float bookReviewRating, Book book) {
        this.bookReviewId = bookReviewId;
        this.bookReviewRating = bookReviewRating;
        this.bookReview = bookReview;
        this.bookReviewTitle = bookReviewTitle;
        this.book = new BookSmallODto(book);
    }

    public BookReviewResponseODto() {
    }


    public BookReviewResponseODto(BookReview _bookReview) {
        this.bookReviewId = _bookReview.getBookReviewId();
        this.bookReviewRating = _bookReview.getBookReviewRating();
        this.bookReview = _bookReview.getBookReview();
        this.bookReviewTitle = _bookReview.getBookReviewTitle();
        this.author = new AuthorSmallODto(_bookReview.getAuthor());
        this.book = new BookSmallODto(_bookReview.getBook());
    }

    public BookReviewResponseODto(BookReviewSmallODto _bookReview) {
        this.bookReviewId = _bookReview.getBookReviewId();
        this.bookReviewRating = _bookReview.getBookReviewRating();
        this.bookReview = _bookReview.getBookReview();
        this.bookReviewTitle = _bookReview.getBookReviewTitle();
        this.author = _bookReview.getAuthor();
    }
}
