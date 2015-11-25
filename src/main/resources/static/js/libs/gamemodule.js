/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function () {
    var app = angular.module('modtwo', []);
    app.controller('game_control', function($scope,$http,$compile) {
        $scope.board = [[]];
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
                $scope.getBoard();
            });

            response.error(function(data, status, headers, config) {
                alert("The petition has failed. HTTP Status:"+status);
            });
        };
        
        $scope.getNumberCell = function(number) {
            alert(number);
        }
        
        $scope.alertPrint = function() {
            alert("number");
        }
        
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
                
                var tbl= document.getElementById("tableBoard");
                var i,j;
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
                        image.setAttribute("class","button");
                        /*
                        $("#dynamicContent").html(
                            $compile(
                                "<button ng-click='count = count + 1' ng-init='count=0'>Increment</button><span>count: {{count}} </span>"
                            )(scope)
                        );
                        var cell_button = document.createElement("input");
                        cell_button.setAttribute("value",board[i][j]);t
                        cell_button.setAttribute("class","button");
                        cell_button.setAttribute("ng-click","lo adData()");
                        td.appendChild(cell_button);
                        */
                    }
                }
                
                
            });

            response.error(function(data, status, headers, config) {
                alert("The petition has failed. HTTP Status:"+status);
            });
        }
        
    });
}) ();


