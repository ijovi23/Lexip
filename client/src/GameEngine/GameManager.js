/**
 * Created by Jovi on 2014/9/3.
 */

var gameManager;

function GameManager(){
    this.config = {};
    this.language = "english";
}

GameManager.prototype.init = function(){

};

GameManager.getInstance = function(){
    if(  gameManager == null ){
        gameManager = new GameManager();
    }
    return gameManager;
};