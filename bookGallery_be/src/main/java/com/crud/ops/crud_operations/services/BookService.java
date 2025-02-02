package com.crud.ops.crud_operations.services;


import com.crud.ops.crud_operations.dtosI.AuthorIDto;
import com.crud.ops.crud_operations.dtosI.BookIDto;
import com.crud.ops.crud_operations.dtosO.BookResponseODto;
import com.crud.ops.crud_operations.dtosO.BookReviewResponseODto;
import com.crud.ops.crud_operations.dtosO.SuccessMessageDto;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookService {
    List<BookResponseODto> getAllBook();

    List<BookResponseODto> getAllBook(Pageable page);

    BookResponseODto getABook(Long bookId);

    List<BookReviewResponseODto> getReviewsOfABook(Long bookId);

    AuthorIDto getAuthorOfABook(Long bookId);

    Long getCountOfBook();

    SuccessMessageDto createABook(BookIDto bookIDto);
}
