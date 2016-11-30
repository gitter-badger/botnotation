# botnotation
<img src="https://img.shields.io/npm/v/botnotation.svg?maxAge=2592000" alt="npm version"> <img src="https://img.shields.io/github/license/kepempem/botnotation.svg" alt="License"> <img src="https://img.shields.io/npm/dt/botnotation.svg" alt="npm downloads"> <img src="https://img.shields.io/npm/dm/botnotation.svg" alt="Downloads per month"> <img src="https://kepempem.com/awesome.svg" alt="awesome">

botnotation - A JS framework for bot creation.
+ [botnotation](#botnotation)
  + [Installation](#installation)
  + [Usage](#usage)
    + [Construct](#construct)
    + [Bot source](#bot-source)
      + [External File](#external-file)
      + [JS Object](#js-object)
    + [Callback](#callback)
    + [Sending Query](#sending-query)
    + [filter function](#filter-function)
  + [Bot Making](#bot-making)
    + [Basic information](#basic-information)
      + [name](#name)
      + [author](#author)
      + [version](#version)
    + [Complex information](#complex-information)
      + [settings](#settings)
      + [responses](#responses)
        + [Evaluation](#evaluation)
      + [default](#default)
  + [TODO List](#todo-list)

## Installation
:package: npm:
```
npm install botnotation
// Then require: require('botnotation');
```
:bird: bower:
```
bower install botnotation
// Then require: <script src="bower_components/botnotation/lib/botnotation.js"></script>
```
:strawberry: strawberry:
```
//HTML:
<strawberry src="kepempem/strawberry"></strawberry>
//JS:
strawberry.install('kepempem/botnotation');
```
## Usage
### Construct
To create a new bot, add this code to your JS file:
```
var name_of_bot = new bot({});
```
the ```options``` parameter is an object and is not required.
### Bot source
#### External file
To load a ```botnotation``` source from an external file use the ```load``` function like this:
```
name_of_bot.load('path/to/bot.botnotation');
```
#### JS object
To load ```botnotation``` as a JS object set the ```notation``` property of the ```options``` parameter to the ```botnotation``` object like this:
```
var name_of_bot = new bot({
    notation: {
      name: 'My Bot',
      author: 'John Smith',
      version: 1.0,
      settings: {
        evaluate_all: false
      },
      responses: [
        {input: 'Hello', response: 'Hi @{prompt('What is your name?')}!'}
      ],
      default: ["I don't know what @{~} means", false]
    }
  });
```
Or use the ```load``` function like this:
```
var name_of_bot = new bot();
name_of_bot.load({
  name: 'My Bot',
  author: 'John Smith',
  version: 1.0,
  settings: {
    evaluate_all: false
  },
  responses: [
    {input: 'Hello', response: 'Hi @{prompt('What is your name?')}!'}
  ],
  default: ["I don't know what @{~} means", false]
});
```
### callback
Since the ```load``` function is using AJAX if the botnotation is stored in an external file it won't load the source immediately. To detect when the bot is ready add a ```callback``` property to your bot like that when constructing:
```
var name_of_bot = bot({
    callback: function(){
      alert('Bot is ready');
    }
  });
```
### sending query
In order to send query to your bot use the ```send``` function like this:
```
name_of_bot.send(query);
```
The returned value is the bots response.
### filter function
By default, botnotation is case insensitive which means if the query ```Hello``` is sent to a bot the response will be the same as if the query is ```hELLo```. Each time a query is sent botnotation goes through all the bot's input templates and checks if the query matches the current input template it's checking. The way it is checking for a match is with the ```bot.filter``` function. The default function is:
```
function(input,bot_input){
  return (input.toUpperCase()===bot_input.toUpperCase());
}
```
Which means the ```send``` function will return the response which will be identical to the input regardless of case. To override this function, set a ```filter``` property for the ```options``` object. For example, if you want the matching to be case insensitive and space insensitive do it like that:
```
var name_of_bot = bot({
    filter:function(input,bot_input){
      return (input.toUpperCase().replace(' ','')===bot_input.toUpperCase().replace(' ',''));
    }
  });
```
Then, sending the query ```A b c``` will be the same as sending ``` AB c```.
## Bot making
Bots used by botnotation are written in botnotation files (.botnotation or .bn file extensions). botnotation files are just like JSON. [Example botnotation](./examples/MyBot.botnotation).
### Basic information
#### name
The name of the bot:
```
{
  "name": "My Bot"
}
```
#### author
The author of the bot:
```
{
  "name": "My Bot",
  "author":"John Smith"
}
```
#### version
The version of the bot:
```
{
  "name": "My Bot",
  "author": "John Smith",
  "version": 1.0
}
```
### Complex information
#### settings
The bot's settings:
```
{
  "name": "My Bot",
  "author": "John Smith",
  "version": 1.0,
  "settings": {
    "evaluate_all": false, // When true, all of the bot's responses will be evaluated
    "regular_expressions": true //When true, every time a query is sent to a bot instead of checking whether the input is identical to the current input it's checking it'll check whether it matches the current input as a regular expression.
  }
}
```
#### responses
The bot's responses, An array of objects. Each object should have an ```input``` property and a ```response``` property:
```
{
  "name": "My Bot",
  "author": "John Smith",
  "version": 1.0,
  "settings": {
      "evaluate_all": false,
      "regular_expressions": true
    },
  "responses": [
    {"input": "Hello", "response": "Hi @{prompt('What is your name?')}!"},
    {"input": "number", "response": "42", "evaluate": true}
  ]
}
```
##### Evaluation
As you can see in the first response, I am calling the prompt function. Anything that will be written inside an at sign and curly braces will be evaluated, Therefore, ```Hi @{prompt('What is your name?')}!``` will return ```Hi ```, the returned value from the ```prompt``` function and ```!```. For example, if you'll define a variable named ```x``` to the value ```10``` then set the response to ```X IS: @{x}```, it'll look like that: ```X IS: 10```.
The second response has an ```evaluate``` property. The default type of the ```(new Bot()).send``` function return value is string. If the ```evaluate``` property is set to ```true``` it will return an evaluated value. For example if response is set to ```"42"``` and ```evaluate``` is set to ```true``` the returned value will be the integer ```42``` and not the string ```42```.
#### default
The default property is what being returned by the ```(new bot()).send``` function if the input is not set in the ```botnotation``` file. A simple ```default``` property looks like that:
```
...
"default": "I don't know"
...
```
And if the bot won't recognize the input it will return ```I don't know```.
If you want to use the query sent in the response you can use ```@{~}```, It will be replaced with the query sent. Example:
```
...
"default": "I don't know what @{~} means."
...
```
If you want to return an evaluated default response you can do it like that:
```
...
"default": ["42", true]
...
```
This will return the integer 42.

## TODO List
- [x] ```RegExp``` support



Copyright (c) 2016 Shani Shlapobersky. Licensed under the MIT license. [License](./LICENSE.md)
