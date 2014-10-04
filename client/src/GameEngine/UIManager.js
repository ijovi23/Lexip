/**
 * Created by Jovi on 2014/9/3.
 */

/*UIManager*/

var uiManager = new UIManager();

function UIManager(){
    this.LAYERS = [];
    this.curScene = null;
    this.curLayer = null;
}

UIManager.prototype.start = function(assign){

};

UIManager.prototype.newScene = function(assign){
    while( this.curLayer != null ){
        this.popLayer();
    }

    var scene = new cc.Scene();
    this.LAYERS = [];
    this.curScene = scene;
    this.curNode = new cc.Node;

    cc.director.runScene(scene);
    //autoAdaptResolution();
    var layer =  this.newLayer(assign);
    layer.setKeypadEnabled(true);
    this.curScene.addChild(this.curNode);
};

UIManager.prototype.newLayer = function(assign){
    if( this.curLayer != null ){
        disableLayer(this.curLayer);
    }

    var layer = new cc.Layer();
    layer.MENUS = [];
    copyProperties(layer, assign);
    this.LAYERS.push(layer);
    this.curLayer = layer;

    if( layer.onNotify != null ){
        //todo?
    }

    if( layer.onActivate != null ){
        layer.onActivate();
    }

    this.curNode.addChild(layer);
    return layer;
};

UIManager.prototype.popLayer = function(){
    //engine.event.removeNTFHandler(this.curLayer);

    this.curNode.removeChild(this.curLayer);
    this.LAYERS.pop();
    if( this.LAYERS.length > 0 ){
        this.curLayer = this.LAYERS[this.LAYERS.length - 1];
        enableLayer(this.curLayer);
    }else{
        this.curLayer = null;
    }
};

UIManager.prototype.removeLayer = function(layer){
    if( layer === this.curLayer ) {
        this.popLayer();
    }else{
        var thiz = this;
        this.LAYERS = this.LAYERS.filter(function(l){
            if( l === layer ){
//                engine.event.removeNTFHandler(l);
                thiz.curNode.removeChild(l);
                return false;
            }
            return true;
        });
    }
};

UIManager.prototype.registerMenu = function(menu){
    if( this.curLayer != null ){
        this.curLayer.MENUS.push(menu);
    }else{
        warn("UIManager.registerMenu: No layer available.");
    }
};

UIManager.prototype.unRegisterMenu = function(menu){
    for( var i = this.LAYERS.length -1; i >= 0; i-- ){
        var layer = this.LAYERS[i];
        for( var k in layer.MENUS ){
            if( layer.MENUS[k] === menu ){
                layer.MENUS.splice(k, 1);
                return;
            }
        }
    }
};

UIManager.getInstance = function(){
    if( uiManager == null ){
        uiManager = new UIManager();}
    return uiManager;
};

/*some functions UIManager needs*/

function enableLayer(layer){
    for( var k in layer.MENUS){
        var menu = layer.MENUS[k];
    }
}

function disableLayer(layer){
    try{
        for( var k in layer.MENUS){
            var menu = layer.MENUS[k];
            if( menu.setEnabled != null ) menu.setEnabled(false);
            else if( menu.setTouchEnabled != null ) menu.setTouchEnabled(false);
            else error("UI::disableLayer: Not a valid menu.");
        }
        if( layer.onDeactivate != null ){
            layer.onDeactivate();
        }
    }catch(e){
        traceError(e);
    }
}
