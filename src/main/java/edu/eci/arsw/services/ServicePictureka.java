/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.services;

import edu.eci.arsw.model.Blueprint;
import edu.eci.arsw.model.Board;
import edu.eci.arsw.model.Point;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;
import org.springframework.stereotype.Service;

/**
 *
 * @author miguelromero
 */
@Service
public class ServicePictureka {
    private static ArrayList<Board> boards = new ArrayList<>();
    
    public String createBoard(){
        boards.add(new Board());
        return boards.get(boards.size()-1).getID();
    }
    
    public Board getBoardByID(String ID){
        for(Board b:boards){
            System.out.println(b.getID()+" ## "+ID);
            if(b.getID().compareTo(ID)==0){
                return b;
            }
        } 
        return null;
    }
    
    public int findCard(int i, int j, String ID){
        Board board = getBoardByID(ID);
        Integer[] cards = board.getCards();
        return board.cardFinded(i, j);
    }
}
