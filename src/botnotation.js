/* - botnotation JS Library - v1 - Beta - By Shani Shlapobersky - Licensed under the MIT license - */
var botnotation = {
  /*
  * @param string a string to be analysed.
  * @return the input with all @{x} strings replaced with variable x of the window scope.
  */
  eval: function(str) {
      return str.replace(new RegExp('@{(.+?)}', 'g'), function () {
        return eval(arguments[1]);
      });
  },
  bots: [],
  about: {
    version: '1.2.3'
  },
  sendAJAXRequest: function (URL, callback, refrence) {
    var CrossBrowserAjaxObjects = [
        function () {return new XMLHttpRequest()},
        function () {return new ActiveXObject("Msxml2.XMLHTTP")},
        function () {return new ActiveXObject("Msxml3.XMLHTTP")},
        function () {return new ActiveXObject("Microsoft.XMLHTTP")}
    ];
    var RequestObject=function() {
        var xmlhttp = false;
        for (var ObjectCounter = 0; ObjectCounter < CrossBrowserAjaxObjects.length; ObjectCounter++) {
            try {
                xmlhttp = CrossBrowserAjaxObjects[ObjectCounter]();
            }
            catch (e) {
                continue;
            }
            break;
        }
        return xmlhttp;
    };
    var xhttp = RequestObject();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        callback(xhttp,refrence);
      }
    };
    xhttp.open("GET", URL, true);
    xhttp.send();
  }
};
console.log(botnotation.about.version);
function bot(name) {
  if (this === window) {
    return new bot(name);
  } else {
    this.name = name;
    this.ready=false;
    botnotation.bots.push(this);
    this.loadSource = function (src) {
      botnotation.sendAJAXRequest(src, function (request,_this) {
        try {
          if (JSON.parse) {
            _this.BN = JSON.parse(request.responseText);
          } else {
            _this.BN = eval ("(" + request.responseText + ")");
          }
        } catch (e) {
          throw new window[e.name](e.message.replace(/JSON/gi,'botnotation'));
          var JSON_ERROR=true;
        }finally{
          if (typeof JSON_ERROR==='undefined'){
            var JSON_ERROR=false;
          }
        }
        if (!JSON_ERROR){
          if (_this.BN.hasOwnProperty('responses')){
            _this.ready = true;
            var details = "Bot " + _this.BN['title'] + " is built";
            if (_this.BN['version']) {
              details += " and running version " + _this.BN['version'].toString();
            }
            if (_this.BN['author']) {
              details += ".\nThis Bot was made by " + _this.BN['author'];
            }
            details += ".";
            console.log(details);
            _this.default = (function (_this) {
              var _R='';
              if (_this.BN.hasOwnProperty('default')){
                _R = botnotation.eval(_this.BN.default);
              }
              return new Function('q','return ("'+_R+'").replace(/@[~]/g,q);');
            })(_this);
          }else {
            throw new Error('The responses property is required');
          }
        }else{
          throw new Error('Bot '+_this.name+'was not initialized due to botnotation error.');
        }
    },this);
  }
/*
* @param input a string to send to the bot.
* @return the bot's response.
*/
this.send = function(input) {
  for(var index = 0; index <= this.BN['responses'].length; index++) {
    if (index === this.BN.responses.length) {
      return botnotation.eval(this.default(input));
      break;
    } else {
        if (this.BN.responses[index].input.toUpperCase() === input.toUpperCase()) {
          if (this.BN.responses[index].hasOwnProperty('evaluate')&&this.BN.responses[index].evaluate) {
            return eval(botnotation.eval(this.BN.responses[index].response));
          } else {
            return botnotation.eval(this.BN.responses[index].response);
          }
          break;
        }
    }
  }
}
}
}
