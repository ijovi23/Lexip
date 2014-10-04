/**
 * Created by Jovi on 2014/9/3.
 */

var DebugRecorders = DebugRecorders || [];


var _TYPE_ERROR = 1;
var _TYPE_WARN = 2;
var _TYPE_DEBUG = 3;

function _debugLog(type, msg) {
    var ret;
    switch (type){
        case _TYPE_DEBUG:
            ret = "[debug]"+msg;
            break;
        case _TYPE_WARN:
            ret = "[warning]"+msg;
            break;
        case _TYPE_ERROR:
            ret = "[error]"+msg;
            break;
        default: ret = "";
    }
    for( var k in DebugRecorders ){
        DebugRecorders[k].addDebugMsg(ret, type);
    }
    return ret;
}

function error(msg){
    _debugLog(_TYPE_ERROR, msg);
}

function warn(msg){
    _debugLog(_TYPE_WARN, msg);
}

function debug(msg){
    _debugLog(_TYPE_DEBUG, msg);
}

function display(key, val){
    try{
        var str = JSON.stringify(val);
    }
    catch(e){//in case of cyclic object
        str = undefined;
    }
    if( str == undefined ){
        str = ""+val;
    }
    cc.log("[print]"+key+" = "+str);
}

function checkNull(val, str){
    if( val == null ){
        cc.log("[check NULL]"+str);
        return true;
    }
    return false;
}

function traceStack(){
    try{
        error("#TRACE STACK#");
        //print values
        for(var k in arguments){
            error("ENV["+k+"]="+JSON.stringify(arguments[k])+"\n");
        }
        //make the exception
        var some = null;
        var thing = some.evil;
    }
    catch(e){
        traceError(e);
    }
}

function traceError(err){
    var fileName = err.fileName;
    if( fileName == null ){
        fileName = "no file";
    }
    else{
        var lios = fileName.lastIndexOf("/")+1;
        fileName = fileName.substring(lios);
    }
    var msg = err.message;
    if( msg == undefined ) msg = err;
    error("---ERROR---\n"
            + msg+" @"+ fileName+" :"+ err.lineNumber
            +"\n---STACK---\n"
            + err.stack
    );
}

function printArray(ary){
    var str = "---ARRAY---\n";
    for(var k in ary){
        str += "["+k+"] = "+JSON.stringify(ary[k])+"\n";
    }
    cc.log(str);
}


/********* Debug Recorder *********/

function DebugRecorder(){
    this.DebugMessages = "";
    this.Name = "DefaultDebugMsg";
    this.SavePath = "";
    this.Level = Infinity; //0-disableAll 1-enableType1 2-enableType1&2 ... Infinity-enableAll
    this.inited = false;
}

DebugRecorder.prototype.init = function(fileName, level){
    this.DebugMessages = "";
    var docPath = fileUtils.getDocumentPath();
    if( fileName != null ) this.Name = fileName;
    if( level != null ){
        this.Level = Number(level);
    }
    this.SavePath = docPath + PATH_DEBUG + this.Name;
    DebugRecorders[this.Name] = this;
    this.inited = true;
    cc.log("[DebugRecorder] Init " + this.Name);
};

DebugRecorder.prototype.addDebugMsg = function(msg, debugType){
    if( !this.inited ) return;
    if( debugType != null && debugType > this.Level ) return;
    this.DebugMessages += msg+"\n";
};

DebugRecorder.prototype.saveDebugMsg = function(){
    if( !this.inited ) return;
    fileUtils.writeStringToFile(this.SavePath, this.DebugMessages);
    cc.log("[DebugRecorder] Save " + this.Name);
};

DebugRecorder.prototype.cleanDebugMsg = function(){
    if( !this.inited ) return;
    this.DebugMessages = "";
    cc.log("[DebugRecorder] Clean " + this.Name);
};

DebugRecorder.prototype.deleteDebugMsgFile = function(){
    if( !this.inited ) return;
    fileUtils.removeFile(this.SavePath);
    cc.log("[DebugRecorder] Delete " + this.Name);
};

DebugRecorder.prototype.uninit = function() {
    this.DebugMessages = "";
    this.SavePath = "";
    DebugRecorders[this.Name] = null;
    this.inited = false;
    cc.log("[DebugRecorder] Uninit " + this.Name);
};