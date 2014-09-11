/**
 * Created by Jovi on 2014/9/3.
 */

var FileManagerInstance;

function FileManager(){
    this.PLATFORM = null;
}

FileManager.prototype.createDirectory = function(path){
    jsb.fileUtils.createDirectory(path);
};

FileManager.prototype.removeExtension = function(filename){
    var nameLen = filename.lastIndexOf(".");
    if( nameLen > 0 ){
        return filename.substr(0, nameLen)
    }else{
        return filename;
    }
};

FileManager.prototype.getDocumentPath = function(){
    return jsb.fileUtils.getWritablePath();
};

FileManager.prototype.getStringFromFile = function(filename){
    return jsb.fileUtils.getStringFromFile(filename);
};

FileManager.prototype.writeStringToFile = function(filename, string){
    return jsb.fileUtils.writeStringToFile(filename, string);
};

FileManager.prototype.removeFile = function(filename){
    return jsb.fileUtils.removeFile(filename);
};

FileManager.prototype.isFileExist = function(filename){
    return jsb.fileUtils.isFileExist(filename);
};

FileManager.getInstance = function(){
    if( FileManagerInstance == null ){
        FileManagerInstance = new FileManager();
    }
    return FileManagerInstance;
};