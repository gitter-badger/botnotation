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
    version: '1.4.4'
  },
  init_data: function(_this){
    if(typeof _this!=='undefined'&&_this instanceof bot){
      var details = "Bot " + _this.notation.name + " is built";
      if (_this.notation.version) {
        details += " and running version " + _this.notation.version.toString();
      }
      if (_this.notation.author) {
        details += ".\nThis Bot was made by " + _this.notation.author;
      }
      details += ".";
      console.log(details);
      _this.default = (function (_this) {
        var _R='';
        var _E = false;
        if (_this.notation.hasOwnProperty('default')){
          if (Array.isArray(_this.notation.default)&&_this.notation.default.length>0){
            _R = (_this.notation.default)[0];
            if (_this.notation.default.length>1) {
              _E = Boolean((_this.notation.default)[1]);
            }
          } else {
            _R = (_this.notation.default);
          }
        }
        if (!_E){
          return new Function('q','return ('+JSON.stringify(_R)+').replace(/@{~}/g,q).replace(/@{'~'}/g,JSON.stringify(q));');
        }else {
          return new Function('q','return eval('+JSON.stringify(_R)+'.replace(/@{~}/g,q).replace(/@{'~'}/g,JSON.stringify(q)));');
        }
      })(_this);
      if (_this.notation.hasOwnProperty('settings')){
        if (_this.notation.settings.hasOwnProperty('evaluate_all')&&Boolean(_this.notation.settings.evaluate_all)){
          for(var i=0;i<_this.notation.responses.length;i++){
            if(_this.notation.responses[i].hasOwnProperty('evaluate')){
              if(_this.notation.responses[i].evaluate.toString().toUpperCase()==='TRUE'){
                _this.notation.responses[i].evaluate=true;
              }else if(_this.notation.responses[i].evaluate.toString().toUpperCase()==='false'){
                _this.notation.responses[i].evaluate=false;
              }
            }else {
              _this.notation.responses[i].evaluate=true;
            }
          }
        }
      }
    }
  },
  AJAX: function (URL='',callback=function(){},refrence=new bot()) {
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
console.log("botnotation version: "+botnotation.about.version);
function bot(options={}) {
  if (this===window){
    return new bot(options);
  }else{
    if(typeof options==='object'&&!Array.isArray(options)){
    this.options=options;
  }else{
    this.options={};
  }
    this.ready=false;
    if(!(this.options.hasOwnProperty('callback')&&typeof this.options.callback==='function')){
      this.options.callback=function(){};
    }
    if(!(this.options.hasOwnProperty('filter')&&typeof this.options.filter==='function')){
      this.options.filter=function(input='',bot_input=''){
        return (input.toUpperCase()===bot_input.toUpperCase());
      };
    }
    this.id="#"+botnotation.bots.length.toString(16);
    botnotation.bots.push(this);
    this.load = function (source) {
      if(typeof source==='string'){
        botnotation.AJAX(source, function (request,_this) {
          try {
            if (JSON.parse) {
              _this.notation = JSON.parse(request.responseText);
            } else {
              _this.notation = eval ("(" + request.responseText + ")");
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
            if (_this.notation.hasOwnProperty('responses')){
              _this.ready = true;
              _this.options.callback();
              botnotation.init_data(_this);
            }else {
              throw new Error('The responses property is required');
            }
          }else{
            throw new Error('Bot '+_this.id+' was not initialized due to botnotation error.');
          }
      },this);
    }else if(typeof source==='object'&&!Array.isArray(source)){
      if(source.hasOwnProperty('responses')){
        this.notation=source;
        botnotation.init_data(this);
        this.ready=true;
        this.options.callback();
      }else{
        throw new Error('Bot '+this.id+' was not initialized due to botnotation error.');
      }
    }
  }
    if (this.options.hasOwnProperty('notation')&&typeof this.options.notation==='object'&&!Array.isArray(this.options.notation)&&this.options.notation.hasOwnProperty('responses')){
      this.load(this.options.notation);
    }
/*
* @param input a string to send to the bot.
* @return the bot's response.
*/
this.send = function(input) {
  for(var index = 0; index <= this.notation.responses.length; index++) {
    if (index === this.notation.responses.length) {
      return botnotation.eval(this.default(input));
      break;
    } else {
        if (this.options.filter(input, this.notation.responses[index].input)&&(function(_this,input,bot_input){
          if (_this.notation.hasOwnProperty('settings')&&_this.notation.settings.hasOwnProperty('regular_expressions')&&Boolean(_this.notation.settings.regular_expressions)){
            return (input.match(new RegExp('^'+bot_input+'$'))!==false);
          }
        })(this,input,this.notation.responses[index].input)) {
          if (this.notation.responses[index].hasOwnProperty('evaluate')&&this.notation.responses[index].evaluate) {
            return eval(botnotation.eval(this.notation.responses[index].response.replace(/@{~}/g,input).replace(/@{'~'}/g,JSON.stringify(input))));
          } else {
            return botnotation.eval(this.notation.responses[index].response.replace(/@{~}/g,input).replace(/@{'~'}/g,JSON.stringify(input)));
          }
          break;
        }
    }
  }
}
}
}
