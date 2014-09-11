/**
 * Created by Jovi on 2014/9/3.
 */

var EventManagerInstance = null;

var CONN_UNDEFINED = 0;
var CONN_ESTABLISHED = 1;
var CONN_DISCONNECTED = 2;

function EventManager(){
    //RPC
    this.RPCSEQ = 0;
    this.RPCSENT = {};

    //processor
    this.HANDLE_NTF = [];
    this.FLAG_HOLDNTF = false;
    this.HOLD_NTF = [];

    //Connection
    this.TCPFD = -1;
    this.SERVER_IP = "0.0.0.0";
    this.SERVER_PORT = 0;
    this.SERVER_PID = null;
    this.SERVER_RID = null;
    this.SENDMODE = 0;
    this.CONN_STATE = CONN_UNDEFINED;
    this.AWAKE_SENT = false;

    this.SENDQUEUE = [];
    this.RPC_INSECURE_LIST = [];
}

EventManager.getInstance = function(){
    if( EventManagerInstance == null ){
        EventManagerInstance = new EventManager();
    }
    return EventManagerInstance;
};