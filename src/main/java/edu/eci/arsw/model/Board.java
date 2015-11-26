/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.model;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Random;
import org.springframework.stereotype.Service;

/**
 *
 * @author miguelromero
 */
public class Board {
    
    //ArrayList<ArrayList<Integer>> board;
    private final String ID;
    private static final DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
    
    private static final int width=10;
    private static final int height=10;
    
    private static final int cards2Find=5;
    Integer[][] board= new Integer[width][height];
    
    Integer[] cards=new Integer[cards2Find];
    
    public Board(){
        Calendar cal = Calendar.getInstance();
        ID = dateFormat.format(cal.getTime());
        Random rnd = new Random();
        Integer []used= new Integer[width*height];
        int val,i,j;
        for (i = 0; i < width*height; i++) used[i]=0;
        for (i = 0; i < width; i++) {
            for (j = 0; j < height; j++) {
                val=(int)(rnd.nextDouble()*width*height);
                while(used[val]!=0) val=(int)(rnd.nextDouble()*width*height);
                used[val]=1;
                board[i][j]=val;
            }
        }
        for (i = 0; i < width*height; i++) used[i]=0;
        for (i = 0; i < cards2Find; i++) {
            val=(int)(rnd.nextDouble()*width*height);
            while(used[val]!=0) val=(int)(rnd.nextDouble()*width*height);
            used[val]=1;
            cards[i]=val;
        }
    }
    
    public Integer[][] getBoard(){
        return board;
    }
    
    public Integer[] getCards(){
        return cards;
    }
    
    public Integer getWidth(){
        return width;
    }
    
    public Integer getHeight(){
        return height;
    }
    
    public Integer getCards2Find(){
        return cards2Find;
    }
    
    public String getID(){
        return ID;
    }
    
    public int cardFinded(int posX, int posY){
        int cardNumber = board[posX][posY];
        for (int i = 0; i < cards2Find; i++) {
            if(cards[i]==cardNumber){
                cards[i]=-1;
                return cardNumber;
            }
        }
        return -1;
    }
    
}
