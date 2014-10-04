/**
 * Created by Jovi on 2014/9/3.
 */

var fileUtils = fileUtils || {};

fileUtils.createDirectory = function(path){
    jsb.fileUtils.createDirectory(path);
};

fileUtils.removeExtension = function(filename){
    var nameLen = filename.lastIndexOf(".");
    if( nameLen > 0 ){
        return filename.substr(0, nameLen)
    }else{
        return filename;
    }
};

fileUtils.getDocumentPath = function(){
    return jsb.fileUtils.getWritablePath();
};

fileUtils.getStringFromFile = function(filename){
    return jsb.fileUtils.getStringFromFile(filename);
};

fileUtils.writeStringToFile = function(filename, string){
    return jsb.fileUtils.writeStringToFile(filename, string);
};

fileUtils.removeFile = function(filename){
    return jsb.fileUtils.removeFile(filename);
};

fileUtils.isFileExist = function(filename){
    return jsb.fileUtils.isFileExist(filename);
};
