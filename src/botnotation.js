/* - botnotation JS Library - v1.0 - Beta - By Shani Shlapobersky - Licensed under the MIT license - */
var bots = [];
function bot(name) {
  if (this === window) {
    return new bot(name);
  } else {
    this.name = name;
    this.loadSource = function (src) {
      if (src.substring(src.length - 12, src.length) !== ".botnotation" && src.substring(src.length - 3, src.length) !== ".bn") {
      throw new Error("Bot Source must be a botnotation file.");
    } else {
    sendAJAXRequest(src, function (request) {
      if (JSON.parse) {
        this.BN = JSON.parse(request.responseText);
      } else {
        this.BN = eval ("(" + request.responseText + ")");
      }
      this.ready = true;
      this.details = "Bot " + this.BN['title'] + " is built";
      if (this.BN['version']) {
        this.details += " and running version " + this.BN['version'].toString();
      }
      if (this.BN['author']) {
        this.details += ".\nThis Bot was made by " + this.BN['author'];
      }
      this.details += ".";
      console.log(this.details);
      this.default = (function () {
        for(var index = 0; index < this.BN['responses'].length; index++) {
            if (this.BN['responses'][index]['default']) {
              return botnotation.eval(this.BN['responses'][index]['default']);
              break;
            }
            if (this.BN['responses'][index]['default']) {
              return this.BN['responses'][index]['default'];
              break;
            }
        }
      })();
  });
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
    } else if (this.BN['settings']['evaluate-inner-expressions'].toString() === "true") {
      if (this.BN['settings']['case-sensitive'].toString() === "true") {
        if (this.BN['responses'][index]['input'] === input) {
          return botnotation.eval(this.BN['responses'][index]['response']);
          break;
        }
      } else {
        if (this.BN['responses'][index]['input'].toUpperCase() === input.toUpperCase()) {
          return botnotation.eval(this.BN['responses'][index]['response']);
          break;
        }
      }
    } else {
      if (this.BN['settings']['case-sensitive'].toString() === "true") {
        if (this.BN['responses'][index]['input'] === input) {
          return this.BN['responses'][index]['response'];
          break;
        }
      } else {
        if (this.BN['responses'][index]['input'].toUpperCase() === input.toUpperCase()) {
          return this.BN['responses'][index]['response'];
          break;
        }
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
  }
};
