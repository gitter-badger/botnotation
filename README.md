# botnotation
<img src="https://img.shields.io/npm/v/botnotation.svg?maxAge=2592000" alt="npm version"> <img src="https://img.shields.io/github/license/kepempem/botnotation.svg" alt="License"> <img src="https://img.shields.io/npm/dt/botnotation.svg" alt="npm downloads"> <img src="https://img.shields.io/npm/dm/botnotation.svg" alt="Downloads per month"> <img src="https://img.shields.io/github/tag/kepempem/botnotation.svg" alt="github tag"> <img src="https://img.shields.io/github/release/kepempem/botnotation.svg" alt="github release"> <img src="https://img.shields.io/github/commits-since/kepempem/botnotation/1.0.svg" alt="commits since 1.0"> <img src="https://img.shields.io/github/issues/kepempem/botnotation.svg" alt="open issues"> <img src="https://img.shields.io/github/issues-closed-raw/kepempem/botnotation.svg" alt="Closed issues"> <img src="https://img.shields.io/github/issues-pr/kepempem/botnotation.svg" alt="Open pull requests"> <img src="https://img.shields.io/github/issues-pr-closed-raw/kepempem/botnotation.svg" alt="Closed pull requests"> <img src="https://img.shields.io/github/contributors/kepempem/botnotation.svg" alt="Contributors">

botnotation - A JS framework for bot creation.
+ [Installation](#installation)
+ [Usage](#usage)
  + [Construct](#construct)
  + [Bot source](#bot-source)
  + [Callback](#callback)
+ [Bot Making](#bot-making)
  + [Basic information](#basic-information)
    + [name](#name)
    + [author](#author)
    + [version](#version)
  + [Complex information](#complex-information)
    + [settings](#settings)
    + [responses](#responses)
    + [default](#default)

## Installation
npm:
```
npm install botnotation
```
bower:
```
bower install botnotation
```
strawberry:
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
var name_of_bot = new bot(options);
```
the ```options``` parameter is an object and is not required.
### Bot source
To load a ```botnotation``` source use the ```loadSource``` function like this:
```
name_of_bot.loadSource('path/to/bot.botnotation');
```
### callback
Since the ```loadSource``` function is using AJAX it won't load the source immediately. To detect when the bot is ready add a ```callback``` property to your bot like that:
```
name_of_bot.callback=function(){
  alert('Bot is ready');
};
```
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
The bot's settings (not working. yet.):
```
{
  "name": "My Bot",
  "author": "John Smith",
  "version": 1.0,
  "settings": {}
}
```
#### responses
The bot's responses, An array of objects. Each object should have an ```input``` property and a ```response``` property:
```
{
  "name": "My Bot",
  "author": "John Smith",
  "version": 1.0,
  "settings": {},
  "responses": [
    {"input": "Hello", "response": "Hi @{prompt('What is your name?')}!"},
    {"input": "number", "response": "42", "evaluate": true}
  ]
}
```
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
