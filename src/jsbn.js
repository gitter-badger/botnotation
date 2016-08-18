/* - JSBN JS Handler - v1.0 - Beta - By Shani Shlapobersky - Licensed under the MIT license - */
var bots = [];
function bot(name) {
  if (this === window) {
    return new bot(name);
  } else {
    this.name = name;
    this.loadSource = function (src) {
      if (src.substring(src.length - 5, src.length) !== ".jsbn") {
      throw new Error("Bot Source must be a JSBN file.");
    } else {
    sendAJAXRequest(src, function (request) {
      if (JSON.parse) {
        this.JSBN = JSON.parse(request.responseText);
      } else {
        this.JSBN = eval ("(" + request.responseText + ")");
      }
      if (this.JSBN['title'] !== this.name) {
        throw new Error("Bot name must be identical to the property 'title' in your bot's JSBN file.");
      } else {
        this.ready = true;
        var details = "Bot " + this.JSBN['title'] + "is built";
        if (this.JSBN['version']) {
          details += " and running version " + this.JSBN['version'].toString();
        }
        if (JSBNC['author']) {
          details += ".\n\n\nBot by " + this.JSBN['author'];
        }
        details += ".";
        this.default = (function () {
          for(var index = 0; index < this.JSBN['responses'].length; index++) {
            if (this.JSBN['settings']['evaluate-inner-expressions'].toString() === "true") {
              if (this.JSBN['responses'][index]['default']) {
                return JSBN.eval(this.JSBN['responses'][index]['default']);
                break;
              }
            } else {
              if (this.JSBN['responses'][index]['default']) {
                return this.JSBN['responses'][index]['default'];
                break;
              }
            }
          }
        })();
        
    }
  });
}
////
}
////
this.send = function(input) {
          for(var index = 0; index <= this.JSBN['responses'].length; index++) {
            if (index === this.JSBN['responses'].length) {
              return this.default;
              break;
            } else if (this.JSBN['settings']['evaluate-inner-expressions'].toString() === "true") {
              if (this.JSBN['settings']['case-sensitive'].toString() === "true") {
                if (this.JSBN['responses'][index]['input'] === input) {
                  return JSBN.eval(this.JSBN['responses'][index]['response']);
                  break;
                }
              } else {
                if (this.JSBN['responses'][index]['input'].toUpperCase() === input.toUpperCase()) {
                  return JSBN.eval(this.JSBN['responses'][index]['response']);
                  break;
                }
              }
            } else {
              if (this.JSBN['settings']['case-sensitive'].toString() === "true") {
                if (this.JSBN['responses'][index]['input'] === input) {
                  return this.JSBN['responses'][index]['response'];
                  break;
                }
              } else {
                if (this.JSBN['responses'][index]['input'].toUpperCase() === input.toUpperCase()) {
                  return this.JSBN['responses'][index]['response'];
                  break;
                }
              }
            }
          }
        }
////
}
////
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
function sendAJAXRequest(URL, callback) {
  var xhttp = RequestObject();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      callback(xhttp);
    }
  };
  xhttp.open("GET", URL, true);
  xhttp.send();
};
var JSBN = {
  eval: function(string) {
      return string.replace(new RegExp('@{(.+?)}', 'g'), function () {
        return eval(arguments[1]);
      });
  }
};
