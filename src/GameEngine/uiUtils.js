/**
 * Created by Jovi on 2014/9/5.
 */

var uiUtils = uiUtils || {};

uiUtils.createBlackMask = function(size){
    var maskSize = cc.winSize;
    if( size != null && ( size.width != null || size.height != null ) ){
        if( size.width != null ) maskSize.width = size.width;
        if( size.height != null ) maskSize.height = size.height;
    }
    return new cc.LayerColor(cc.color(0,0,0,204), maskSize.width, maskSize.height);
};