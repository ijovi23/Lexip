/**
 * Created by Jovi on 2014/9/3.
 */

var GameManagerInstance;

function GameManager(){
    this.config = {};
    this.language = "english";
}

GameManager.prototype.init = function(){

};

GameManager.getInstance = function(){
    if(  GameManagerInstance == null ){
        GameManagerInstance = new GameManager();
    }
    return GameManagerInstance;
};