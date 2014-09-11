/**
 * Created by Jovi on 2014/9/3.
 */
/* Here are some common functions */

function copyProperties(target, source){
    if( source != null && target != null ){
        for(var k in source){
            target[k] = source[k];
        }
    }
}

function mergeProperties(target, source){
    if( source != null ){
        for(var k in source){
            if( target[k] == null ){
                target[k] = source[k];
            }
            else{
                target[k] += source[k];
            }
        }
    }
}

function compareProperties(result, subtrahend, minuend){
    if( subtrahend != null && minuend != null){
        for(var k in minuend){
            if( typeof(minuend[k]) == "number" ){
                if( subtrahend[k] == null ){
                    result[k] = minuend[k];
                }
                else{
                    result[k] = minuend[k] - subtrahend[k];
                }
            }
        }
        for(var k in subtrahend){
            if( typeof(subtrahend[k]) == "number" ) {
                if (minuend[k] == null) {
                    result[k] = -subtrahend[k];
                }
            }
        }
    }
}