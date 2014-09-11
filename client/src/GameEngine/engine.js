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
        engine.file = FileManager.getInstance();
        engine.ui = UIManager.getInstance();
        engine.event = EventManager.getInstance();
        engine.user = UserManager.getInstance();



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
