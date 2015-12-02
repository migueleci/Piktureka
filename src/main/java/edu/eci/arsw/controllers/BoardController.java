/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.controllers;

import edu.eci.arsw.model.Blueprint;
import edu.eci.arsw.model.Board;
import edu.eci.arsw.services.ServicePictureka;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author miguelromero
 */
@RestController
@RequestMapping("/boardControl")
public class BoardController {
    @Autowired
    ServicePictureka services;
    
    @RequestMapping(value="/check",method = RequestMethod.GET)        
    public String check() {
        return "REST API OK";        
    }
    
    @RequestMapping(method = RequestMethod.GET)
    public String createGame() {       
        return services.createBoard();
    }
    /*
    @RequestMapping(method = RequestMethod.GET)
    public Integer[] getCards() {       
        return services.getCards();
    }*/
        
}
