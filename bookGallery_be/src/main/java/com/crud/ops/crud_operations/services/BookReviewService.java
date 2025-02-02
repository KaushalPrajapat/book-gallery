package com.crud.ops.crud_operations.services;


import com.crud.ops.crud_operations.dtosI.BookReviewIDto;
import com.crud.ops.crud_operations.dtosO.SuccessMessageDto;
import org.springframework.stereotype.Service;

@Service
public interface BookReviewService {
    SuccessMessageDto createABookReview(BookReviewIDto bookReviewInput);
}
