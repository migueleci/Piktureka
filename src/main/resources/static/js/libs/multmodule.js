/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function () {
    var app = angular.module('modthree', []);
    app.controller('game_control', function($scope,$http,$compile) {
        $scope.board = [[]];
        $scope.cards = [];
        $scope.names = [];
        $scope.numFind = 0;
        $scope.width = 0;
        $scope.height= 0;
        $scope.select = "";
        $scope.ID="";
        $scope.IDPlayer="";
        /*
         * Game creation
         * @returns {undefined}
         */
        $scope.createMultGame = function() {
            
            var configList = {
                method: "GET",
                url: "gameControl/"
            };

            var response=$http(configList);

            response.success(function(data, status, headers, config) {
                $scope.ID=data;
                $scope.getBoard();
                document.getElementById("startG").style.visibility = "hidden";
                document.getElementById("dispGID").innerHTML = $scope.ID;
            });

            response.error(function(data, status, headers, config) {
                alert("The petition has failed. HTTP Status:"+status);
            });
        };
        
        $scope.joinMultGame = function() {
            var IDGame = document.getElementById("IDGame").value;
            
            var configList = {
                url: "gameControl/getBoard",
                method: "GET",
                params: {ID: IDGame}
            };

            var response=$http(configList);

            response.success(function(data, status, headers, config) {
                if(data){
                    $scope.ID = IDGame;
                    $scope.getBoard();
                    document.getElementById("startG").style.visibility = "hidden";
                } else {
                    alert("Game "+IDGame+" does not exist! Check and try again.");
                }
            });  

            response.error(function(data, status, headers, config) {
                alert("The petition has failed. HTTP Status:"+status);
            });
                
            
        };
        
        $scope.createGame = function() {
            
        };     
        
        $scope.getBoard = function() {
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
                    $scope.names[i]="cfind"+name;
                    image.setAttribute("src","images/cards/IMG0"+name+".jpg");
                    image.setAttribute("id",$scope.names[i]);
                    image.style.height = side+'px';
                    image.style.width = side+'px';
                    
                    td.appendChild(image);
                    tr.appendChild(td);
                }
                crd.appendChild(tr);
                console.log($scope.names);
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
        };
        
        /*
         * Select card
         * @param {type} cell
         * @returns {undefined}
         */
        
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
                    for (i=0;i<$scope.numFind;i++){
                        if($scope.cards[i]==ans){
                            $scope.cards[i]=-1;
                        }
                    }
                    sendMessage($scope.ID+"["+$scope.cards.toString()+"]");
                }
            });

            response.error(function(data, status, headers, config) {
                alert("The petition has failed. HTTP Status:"+status);
            });
        };
        
        /*
         * Comunication, modify cards
         * @type @exp;Stomp@call;over
         */
        
        $scope.updateCards= function(cards) {
            var picked = 0;
            for (i=0;i<$scope.numFind;i++){
                $scope.cards[i] = cards[i];
                if($scope.cards[i]<0){
                    picked += 1;
                    document.getElementById($scope.names[i]).style.visibility = "hidden";
                }
            }
            if(picked==$scope.numFind){
                alert("Juego Terminado.\nGracias por Jugar.");
                //location.replace();
                location.reload("newGame.html");
            }
        };
        
        /*
         * WebSocket
         */
        
        var stompClient = null;
        
        function connect() {
            var socket = new SockJS('/ws');
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function (frame) {
                console.log('Connected: ' + frame);
                stompClient.subscribe('/topic/messages', function (data) {
                    showServerMessage(data.body);
                });
            });
        }

        function disconnect() {
            if (stompClient != null) {
            stompClient.disconnect();
            }
            console.log("Disconnected");
        }

        function sendMessage(data) {
            stompClient.send("/app/message", {}, JSON.stringify(data));
        }

        function showServerMessage(cc) {
            var i,j, cad="", arr = [];
            for (i=1;i<cc.length-1;i++){
                if(cc[i]!='['){
                    cad+=cc[i];
                } else {
                    break;
                }
            }
            if(cad==$scope.ID){
                cad = "";
                for (j=i+1;j<cc.length-1;j++){
                    if(cc[j]!=','){
                        cad+=cc[j];
                    } else {
                        arr.push(parseInt(cad));
                        cad = "";
                    }
                }
                arr.push(parseInt(cad));
                $scope.updateCards(arr);
            }
        }

        function init() {
        //   var btnSend = document.getElementById('send');
        //   btnSend.onclick=sendMessage;

            var btnJoin = document.getElementById('joinG');
            btnJoin.onclick=connect;
            var btnCreate = document.getElementById('createG');
            btnCreate.onclick=connect;

        //   var btnDisconnect = document.getElementById('disconnect');
        //   btnDisconnect.onclick=disconnect;
            disconnect();
        }

        window.onload = init;

        
    });
}) ();


