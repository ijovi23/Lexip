/**
 * Created by Jovi on 2014/9/3.
 */

var utils = utils || {};

utils.applyScheme = function(target, scheme, source){
    for(var shortname in source){
        var fullname = scheme[shortname];
        if( fullname != undefined )
        {
            target[fullname] = source[shortname];
        }
    }
};

utils.saveScheme = function(scheme, source){
    var ret = {};
    for(var short in scheme){
        var long = scheme[short];
        if( source[long] != null ){
            ret[short] = source[long];
        }
    }
    return ret;
};

utils.dumpObject = function(obj)
{
    debug("DUMP = "+JSON.stringify(obj));
};


utils.classRegister = {};

utils.register = function(func){
    this.classRegister[func.name] = func;
};

utils.link = function(obj){
    if( obj != null && typeof(obj) == "object" )
    {
        if( obj._ctor != null && this.classRegister[obj._ctor] != null )
        {
            obj.__proto__ = this.classRegister[obj._ctor].prototype;
        }
        for(var k in obj)
        {
            utils.link(obj[k]);
        }
    }
};

utils.unlink = function(obj){
    if( obj != null && typeof(obj) == "object" ){
        var conam = obj.constructor.name;
        if( this.classRegister[conam] != null ){
            obj._ctor = conam;
        }
        for(var k in obj){
            utils.unlink(obj[k]);
        }
    }
};

utils.save = function(obj){
    //debug("SAVING = \n"+JSON.stringify(obj));
    utils.unlink(obj);
    return JSON.stringify(obj);
};

utils.load = function load(str){
    var obj = JSON.parse(str);
    //debug("LOADING = \n"+JSON.stringify(obj));
    utils.link(obj);
    return obj;
};

//used to print cyclic object
utils.printElement = function(key, value, level, list, out){
    //insert space
    for(var i=0; i<level; ++i){
        out += "  ";
    }
    out += key + " = ";
    var type = typeof(value);
    if( type == "function" || type == "object"  ){//composite value
        //check the list
        for(var k in list){
            if( value === list[k] ){
                out += "${"+k+"}\n";
                return;
            }
        }
        //register into list
        var keyName = key;
        var keyNumber = 1;
        var keyFinal = key;
        while(true){
            for(var k in list){
                if( k === keyFinal ){
                    keyNumber++;
                    keyFinal = keyName + keyNumber;
                    continue;
                }
            }
            break;
        }
        list[keyFinal] = value;
        //print object
        for(var k in value){
            utils.printElement(k, value[k], level+1, list, out);
        }
    }
    else{//scale value
        out += JSON.stringify(value)+"\n";
    }
};

utils.markPrint = function(obj){
    var list = {};
    var str = "# MARK PRINTER #\n";
    utils.printElement("${ROOT}", obj, 0, list, str);
    debug(str);
};
