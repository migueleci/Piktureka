/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function () {
    var app = angular.module('modone', []);
    app.controller('game_control', function($scope,$http) {
        $scope.board = [[]];
        $scope.cards = [];
        $scope.numFind = 0;
        $scope.width = 0;
        $scope.height= 0;
        $scope.select = "";
        $scope.ID="";

        $scope.loadData = function() {
            var configList = {
                method: "GET",
                url: "gameControl/"
            };
            
            var response=$http(configList);
            response.success(function(data, status, headers, config) {
                $scope.ID=data;
                document.getElementById("textID").innerHTML = "Game ID: "+$scope.ID;
                $scope.getBoard();
            });

            response.error(function(data, status, headers, config) {
                alert("The petition has failed. HTTP Status:"+status);
            });
        };
        
        $scope.setIDGameMult = function() {
            var ID = document.getElementById('IDGame').value;
            
            
            var configList = {
                url: "gameControl/setIDMG",
                method: "POST",
                params: {ID: ID}
            };
            
            var response=$http(configList);
            
            response.success(function(data, status, headers, config) {
                
            });
            
            response.error(function(data, status, headers, config) {
                alert("The petition has failed. HTTP Status:"+status);
            });
        }
        
        $scope.selectCard= function(cell) {
            var configList = {
                url: "gameControl/findCard",
                method: "GET",
                params: {card: cell,ID: $scope.ID}
            };
            
            var response=$http(configList);
            
            response.success(function(data, status, headers, config) {
                var ans = data;
                if(ans>0){
                    var name = "";
                    if (ans<10){
                        name = "0"+ans;
                    } else {
                        name = ""+ans;
                    }
                    document.getElementById("cfind"+name).style.display="none";
                }
            });

            response.error(function(data, status, headers, config) {
                alert("The petition has failed. HTTP Status:"+status);
            });
        }
        
        $scope.getIDGameMult = function() {
            var configList = {
                url: "gameControl/getIDMG",
                method: "GET"
            };
            
            var response=$http(configList);
            
            response.success(function(data, status, headers, config) {
                $scope.ID = data;
                $scope.getBoard();
            });
            
            response.error(function(data, status, headers, config) {
                alert("The petition has failed. HTTP Status:"+status);
            });
        }
        
        $scope.getBoard = function() {
            alert($scope.ID);
            var configList = {
                url: "gameControl/getBoard",
                method: "GET",
                params: {ID: $scope.ID}
            };
            
            var response=$http(configList);
            
            response.success(function(data, status, headers, config) {
                $scope.board = data.board;
                $scope.width = data.width;
                $scope.height = data.height;
                $scope.cards = data.cards;
                $scope.numFind = data.cards2Find;
                
                var crd= document.getElementById("cardsFind");
                var side = $(window).width()/15;
                var i,j;
                
                var tr = document.createElement('TR');
                for (i=0;i<$scope.numFind;i++){
                    var td = document.createElement('TD');
                    var image = document.createElement("img");
                    var name = "";
                    if ($scope.cards[i]<10){
                        name = "0"+$scope.cards[i];
                    } else {
                        name = ""+$scope.cards[i];
                    }

                    image.setAttribute("src","images/cards/IMG0"+name+".jpg");
                    image.setAttribute("id","cfind"+name);
                    image.style.height = side+'px';
                    image.style.width = side+'px';
                    td.appendChild(image);
                    tr.appendChild(td);
                }
                crd.appendChild(tr);
                
                var tbl= document.getElementById("tableBoard");
                
                for (i=0;i<$scope.width;i++){
                    for (j=0;j<$scope.height;j++){
                        var image = document.getElementById("cell"+i+j);
                        var name = "";
                        if ($scope.board[i][j]<10){
                            name = "0"+$scope.board[i][j];
                        } else {
                            name = ""+$scope.board[i][j];
                        }
                        image.setAttribute("src","images/cards/IMG0"+name+".jpg");
                        //image.setAttribute("class","button");
                        image.style.height = side+'px';
                        image.style.width = side+'px';
                    }
                }
                
                /* Generate Table Dynamically
                for (i=0;i<$scope.width;i++){
                    var tr = document.createElement('TR');
                    for (j=0;j<$scope.height;j++){
                        var td = document.createElement('TD');
                        var image = document.createElement("img");
                        var name = "";
                        if ($scope.board[i][j]<10){
                            name = "0"+$scope.board[i][j];
                        } else {
                            name = ""+$scope.board[i][j];
                        }
                        
                        image.setAttribute("src","images/cards/IMG0"+name+".jpg");
                        image.setAttribute("class","button");
                        image.setAttribute("id","cell"+i+j);
                        td.appendChild(image);
                        tr.appendChild(td);
                    }
                    tbl.appendChild(tr);
                }*/
                
                
            });

            response.error(function(data, status, headers, config) {
                alert("The petition has failed. HTTP Status:"+status);
            });
        }
        
    });
}) ();


