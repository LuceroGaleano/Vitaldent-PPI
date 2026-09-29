package com.odontologia.Vitaldent_PPI.domain.exceptions;

public class BusinessException extends RuntimeException{
    public BusinessException(String message){
        super(message);
    }
}
