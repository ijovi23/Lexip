/**
 * Created by Jovi on 2014/9/3.
 */

var userManager = new UserManager();

function UserManager(){
    this.SYNC = {};
    this.INITED = false;
}

UserManager.prototype.initProfile = function(profile){
    this.PROFILE_NAME = String(profile);
    var docPath = FileUtils.getInstance().getDocumentPath();
    var profilePath = docPath + PATH_USER + this.PROFILE_NAME;
    if( FileUtils.getInstance().isFileExist(profilePath) ){
        var data = FileUtils.getInstance().getStringFromFile(profilePath);
        var userdata = utils.load(data);
        copyProperties(this, userdata);
    }else{
//        this.setData(null);
    }
    this.INITED = true;
};

UserManager.prototype.setProfile = function(profile){
    this.PROFILE_NAME = String(profile);
};

UserManager.prototype.saveProfile = function(){
    if( this.PROFILE_NAME != null ){
        var data = utils.save(this);
        var docPath = FileUtils.getInstance().getDocumentPath();
        var profilePath = docPath + PATH_USER + this.PROFILE_NAME;
        if( !FileUtils.getInstance().writeStringToFile(profilePath, data)){
            error("UserManager: Save Profile Failed");
        }
    }else{
        error("UserManager saveProfile: Profile is not initialized.");
    }
};

UserManager.prototype.clearProfile = function()
{
    var docPath = FileUtils.getInstance().getDocumentPath();
    var profilePath = docPath + PATH_USER + this.PROFILE_NAME;
    FileUtils.getInstance().removeFile(profilePath);
};

UserManager.prototype.clearAllProfiles = function()
{
    var docPath = FileUtils.getInstance().getDocumentPath();
    var profilePath = docPath + PATH_USER + "new";
    FileUtils.getInstance().removeFile(profilePath);
};

UserManager.prototype.setData = function(key, obj, sid){
    if( sid == null ){
        sid = 0;
    }
    this[key] = obj;
    this.SYNC[key] = sid;
};

UserManager.prototype.setSyncId = function(key){
    if( this[key] != null ){
        delete this[key];
        if( this.SYNC[key] != null ){
            delete this.SYNC[key];
        }
    }
};

UserManager.getInstance = function(){
    if(  userManager == null ){
        userManager = new UserManager();
    }
    return userManager;
};