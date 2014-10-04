/**
 * Created by Jovi on 2014/9/4.
 */

var tableUtils = tableUtils || {};

var TablesContainer = {};

tableUtils.tablesPath = "src/Tables/";

tableUtils.setTablesPath = function (strPath) {
    if( typeof(strPath) == "string" ){
        this.tablesPath = strPath;
    }
};

tableUtils.loadTableFile = function(tablename){
    var fullname = tablename + ".jsc";
    if( !FileUtils.getInstance().isFileExist(fullname) ){
        fullname = tablename + ".js";
    }
    try{
        cc.loader.loadJs(this.tablesPath + fullname, function(err){
            if( err ) return cc.log("Load Failed.");
            cc.log("Load table:" + fullname);
            TablesContainer[tablename] = ExtJsData[tablename];
        });
    }catch(e){
        error("failed to load table("+fullname+") with Exception:\n"+ e);
        return null;
    }
};

tableUtils.queryTableByIndex = function(tablename, index){
    if( TablesContainer[tablename] != undefined ){
        var ret = TablesContainer[tablename][index];
        if( ret == null ){
            error("tableUtils.queryTableByIndex: Not Found.");
        }
        return ret;
    }
};

tableUtils.queryTableByKey = function (tablename, key, value) {
    var ret = [];
    if( TablesContainer[tablename] != undefined ){
        for( var k in TablesContainer[tablename] ){
            if( TablesContainer[tablename][k][key] != null
                && TablesContainer[tablename][k][key] == value ){
                ret.push(TablesContainer[tablename][k]);
            }
        }
        return ret;
    }else{
        return null;
    }
};

tableUtils.getTableLength = function(tablename){
    if( TablesContainer[tablename] != undefined ){
        return TablesContainer[tablename].length;
    }
    return null;
};

tableUtils.getTable = function(tablename){
    if( TablesContainer[tablename] != undefined ){
        return TablesContainer[tablename];
    }
};

tableUtils.unloadTable = function(tablename){
    if( TablesContainer[tablename] != undefined ){
        delete TablesContainer[tablename];
    }
};

tableUtils.unloadAllTable = function(){
    TablesContainer = {};
};