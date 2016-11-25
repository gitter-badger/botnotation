# botnotation
<img src="https://img.shields.io/npm/v/botnotation.svg?maxAge=2592000" alt="npm version"> <img src="https://img.shields.io/github/license/kepempem/botnotation.svg" alt="License"> <img src="https://img.shields.io/npm/dt/botnotation.svg" alt="npm downloads"> <img src="https://img.shields.io/npm/dm/botnotation.svg" alt="Downloads per month"> <img src="https://img.shields.io/github/tag/kepempem/botnotation.svg" alt="github tag"> <img src="https://img.shields.io/github/release/kepempem/botnotation.svg" alt="github release"> <img src="https://img.shields.io/github/commits-since/kepempem/botnotation/1.0.svg" alt="commits since 1.0"> <img src="https://img.shields.io/github/issues/kepempem/botnotation.svg" alt="open issues"> <img src="https://img.shields.io/github/issues-closed-raw/kepempem/botnotation.svg" alt="Closed issues"> <img src="https://img.shields.io/github/issues-pr/kepempem/botnotation.svg" alt="Open pull requests"> <img src="https://img.shields.io/github/issues-pr-closed-raw/kepempem/botnotation.svg" alt="Closed pull requests"> <img src="https://img.shields.io/github/contributors/kepempem/botnotation.svg" alt="Contributors">

botnotation - A JS framework for bot creation.
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
