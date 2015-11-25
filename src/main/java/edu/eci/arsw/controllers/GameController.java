/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.controllers;

import edu.eci.arsw.model.Board;
import edu.eci.arsw.services.ServicePictureka;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author miguelromero
 */
@RestController
@RequestMapping("/gameControl")
public class GameController {
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
    
    @RequestMapping(value="/getBoard",method = RequestMethod.GET)
    public Board getBoard(String ID) {       
        return services.getBoardByID(ID);
    }
    
    @RequestMapping(value="/getPos",method = RequestMethod.GET)
    public String getPosition() {       
        return "Works";
    }
    
}
