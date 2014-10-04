/**
 * Created by Jovi on 2014/9/3.
 */

var engine = {
    init: initEngine,
    start: startEngine,
    reboot: reboot
};

function initEngine(){
    try{
        // Base Manager
        engine.ui = uiManager;
        engine.event = eventManager;
        engine.user = userManager;



    }catch(e){
	// TODO: handle exception
    }
}

function startEngine(){

}

function reboot(){

}

function splash(){

}
