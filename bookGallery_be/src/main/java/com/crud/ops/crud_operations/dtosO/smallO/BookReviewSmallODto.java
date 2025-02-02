package com.crud.ops.crud_operations.dtosO.smallO;

import com.crud.ops.crud_operations.models.Author;
import com.crud.ops.crud_operations.models.Book;
import com.crud.ops.crud_operations.models.BookReview;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

//CHECK AGAAIN
@Data
@Getter
@Setter
public class BookReviewSmallODto {
    private Long bookReviewId;
    private String bookReviewTitle;
    private String bookReview;
    private float bookReviewRating;
    private AuthorSmallODto author = new AuthorSmallODto();

    public BookReviewSmallODto(Long bookReviewId, String bookReviewTitle,
                               String bookReview, float bookReviewRating, Book book, Author author) {
        this.bookReviewId = bookReviewId;
        this.bookReviewRating = bookReviewRating;
        this.bookReview = bookReview;
        this.bookReviewTitle = bookReviewTitle;
        this.author = new AuthorSmallODto(author);
    }

    public BookReviewSmallODto() {
    }


    public BookReviewSmallODto(BookReview _bookReview) {
        this.bookReviewId = _bookReview.getBookReviewId();
        this.bookReviewRating = _bookReview.getBookReviewRating();
        this.bookReview = _bookReview.getBookReview();
        this.bookReviewTitle = _bookReview.getBookReviewTitle();
        this.author = new AuthorSmallODto(_bookReview.getAuthor());
    }


}
