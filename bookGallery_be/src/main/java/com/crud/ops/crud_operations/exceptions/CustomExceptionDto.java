package com.crud.ops.crud_operations.exceptions;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomExceptionDto {
    private String message;
    private String httpStatus;
    private int statusCode;
}
