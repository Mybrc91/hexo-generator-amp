'use strict';

var hasha  = require('hasha');
var fs     = require('fs');
var pathFn = require('path');
var tp     = require('./templatePath.js');


// simple update checker
module.exports.chkUpdate = function(config) {
    
    if(!config.generator_amp)return "0";
    var pobj = tp.getPath(config);
    if(!pobj)return "0";
    
    var settingsStr                         = "";
    var pjson                               = require('../package.json');
    settingsStr                             += pjson.version;
    settingsStr                             += JSON.stringify(config.generator_amp);
    if(config.authorDetail) settingsStr     += JSON.stringify(config.authorDetail);
    if(config.copyright_notice) settingsStr += JSON.stringify(config.copyright_notice);
    if(fs.existsSync( pobj.ampEjsTmplPath )){
        var ejsStr = fs.readFileSync( pobj.ampEjsTmplPath , "utf-8");
        settingsStr += ejsStr;
    }
    if(fs.existsSync( pobj.cssFilePath )){
        var cssStr = fs.readFileSync( pobj.cssFilePath , "utf-8");
        settingsStr += cssStr;
    }
    var shash = hasha(settingsStr , {algorithm: 'md5'} );
    return shash;
};

module.exports.getMD5 = function(inStr) {
    if(!inStr || inStr == "") return "";
    
    var shash = hasha(inStr , {algorithm: 'md5'} );
    return shash;
};