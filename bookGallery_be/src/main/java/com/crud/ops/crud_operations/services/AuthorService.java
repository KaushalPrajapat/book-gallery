package com.crud.ops.crud_operations.services;

import com.crud.ops.crud_operations.dtosO.AuthorResponseODto;
import com.crud.ops.crud_operations.dtosO.smallO.AuthorSmallODto;
import com.crud.ops.crud_operations.dtosO.BookReviewResponseODto;
import com.crud.ops.crud_operations.models.Author;
import com.crud.ops.crud_operations.models.Book;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AuthorService {
     List<AuthorResponseODto> getAllAuthor(Pageable page);

     List<Book> findBookOfAuthor(Long authorId);

     AuthorResponseODto getAAuthor(Long authorId);


     AuthorSmallODto createAuthor(Author author);

//     Find Author by Author name, or mailId

     Long getAuthorByEmail(String email);

     Long getCountOfAuthor();

     List<BookReviewResponseODto> getReviewOfAuthor(Long userId);

     AuthorSmallODto getAAuthorByUserId(String userId);
}
