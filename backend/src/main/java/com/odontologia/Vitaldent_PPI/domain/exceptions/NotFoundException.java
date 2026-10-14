package com.odontologia.Vitaldent_PPI.domain.exceptions;

public class NotFoundException extends RuntimeException{
    public NotFoundException(String message){
        super(message);
    }
}
