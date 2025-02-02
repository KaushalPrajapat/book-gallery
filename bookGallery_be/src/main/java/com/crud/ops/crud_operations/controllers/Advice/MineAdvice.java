package com.crud.ops.crud_operations.controllers.Advice;


import com.crud.ops.crud_operations.exceptions.CustomException;
import com.crud.ops.crud_operations.exceptions.CustomExceptionDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class MineAdvice {

    @ExceptionHandler(CustomException.class)
    @ResponseBody
    public ResponseEntity<?> handleCustomException(CustomException ex) {
        return new ResponseEntity(CustomExceptionDto.builder()
                .message(ex.getMessage())
                .httpStatus(ex.getHttpStatus())
                .statusCode(ex.getStatusCode())
                .build(), HttpStatusCode.valueOf(ex.getStatusCode()));
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ResponseEntity<?> handleGlobalException(Exception ex) {
        return new ResponseEntity(CustomExceptionDto.builder()
                .message(ex.getMessage())
                .httpStatus(ex.getLocalizedMessage())
                .statusCode(HttpStatus.FORBIDDEN.value())
                .build(), HttpStatusCode.valueOf(HttpStatus.FORBIDDEN.value()));
    }

}
