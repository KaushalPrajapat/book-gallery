package com.crud.ops.crud_operations.exceptions;


import lombok.Data;

@Data
public class CustomException extends RuntimeException{
    private int statusCode;
    private String httpStatus;
    public CustomException(String message, String httpStatus, int statusCode){
        super(message);
        this.httpStatus = httpStatus;
        this.statusCode = statusCode;
    }
}
