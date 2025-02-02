package com.crud.ops.crud_operations.dtosI;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@Getter
@Setter
public class BookReviewIDto {
    private Long bookReviewId;

    private String bookReviewTitle;
    private String bookReview;
    private float bookReviewRating;

    private Long bookReviewAuthor;
    private Long book;


}
