/* - botnotation JS Library - v1 - Beta - By Shani Shlapobersky - Licensed under the MIT license - */
var botnotation = {
  about: {
    version: '1.0.7'
  }
};
console.log(botnotation.about.version);
function bot(name) {
  if (this === window) {
    return new bot(name);
  } else {
    this.name = name;
    botnotation.bots.push(this);
    this.loadSource = function (src) {
      if (src.substring(src.length - 12, src.length) !== ".botnotation" && src.substring(src.length - 3, src.length) !== ".bn") {
      throw new Error("Bot Source must be a botnotation file.");
    } else {
    sendAJAXRequest(src, function (request,_this) {
      if (JSON.parse) {
        _this.BN = JSON.parse(request.responseText);
      } else {
        _this.BN = eval ("(" + request.responseText + ")");
      }
      _this.ready = true;
      _this.details = "Bot " + _this.BN['title'] + " is built";
      if (_this.BN['version']) {
        _this.details += " and running version " + _this.BN['version'].toString();
      }
      if (_this.BN['author']) {
        _this.details += ".\nThis Bot was made by " + _this.BN['author'];
      }
      _this.details += ".";
      console.log(_this.details);
      _this.default = (function (_this) {
        for(var index = 0; index < _this.BN['responses'].length; index++) {
            if (_this.BN['responses'][index]['default']) {
              return botnotation.eval(_this.BN['responses'][index]['default']);
              break;
            }
            if (_this.BN['responses'][index]['default']) {
              return _this.BN['responses'][index]['default'];
              break;
            }
        }
      })(_this);
  },this);
}
}
/*
* @param input a string to send to the bot.
* @return the bot's response.
*/
this.send = function(input) {
  for(var index = 0; index <= this.BN['responses'].length; index++) {
    if (index === this.BN['responses'].length) {
      return this.default;
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
//AJAX Functions
var CrossBrowserAjaxObjects = [
    function () {return new XMLHttpRequest()},
    function () {return new ActiveXObject("Msxml2.XMLHTTP")},
    function () {return new ActiveXObject("Msxml3.XMLHTTP")},
    function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];
function RequestObject() {
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
/*
* @param URL a URL to send a request to.
* @param callback a function that would be executed once the request was made.
* @return void
*/
function sendAJAXRequest(URL, callback, refrence) {
  var xhttp = RequestObject();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      callback(xhttp,refrence);
    }
  };
  xhttp.open("GET", URL, true);
  xhttp.send();
};
//botnotation Functions
var botnotation = {
  /*
  * @param string a string to be analysed.
  * @return the input with all @{x} strings replaced with variable x of the window scope.
  */
  eval: function(string) {
      return string.replace(new RegExp('@{(.+?)}', 'g'), function () {
        return eval(arguments[1]);
      });
  },
  bots: []
};
