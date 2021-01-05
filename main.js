const fs = require("fs");
module.exports = {
  parse: function(text){
    var lines = text.replace(/\r/g, "").split("\n");
    var ret = {};
    var o = {};
    for(var i=0; i<lines.length; i++){
      var line = lines[i].trim();
      var mc = line.match(/^\[([^\]]+)\]$/);
      if(mc){
        var name = mc[1];
        o = {};
        ret[name]=o;
      }
      else if(line.match(/^([^;][^=]*)=(.*)$/)){
        var mc = line.match(/^([^;][^=]*)=([^;]*)$/);
        o[mc[1]]=mc[2];
      }
    }
    return ret;
  },
  load: async function(fn){
    var me = this;
    return new Promise(function (resolve, reject) {
      fs.readFile(fn, function(error, data){
        resolve(me.parse((data||"").toString()));
      });
    });
  }
};

