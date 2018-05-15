# Ember Guides App [![Build Status](https://travis-ci.org/ember-learn/guides-app.svg?branch=master)](https://travis-ci.org/ember-learn/guides-app) [![Build status](https://ci.appveyor.com/api/projects/status/leil0lxhqtuvh7ga/branch/master?svg=true)](https://ci.appveyor.com/project/sivakumar-kailasam/guides-app/branch/master)

This repository contains the Ember App that powers the [Ember.js
Guides](https://guides.emberjs.com).

This app is essentially a static site generator that pulls in
the markdown that makes up the [Guides Source](https://github.com/ember-learn/guides-source) and
outputs three things:

- JSON that contains that content
- an Ember App that  is designed to consume that JSON
- static html that is powered by [Prember](https://github.com/ef4/prember) and
[FastBoot](https://www.ember-fastboot.com/)

If that all sounds a bit scary don't worry, thanks to
Ember's _Zero Config_ approach you don't need to worry about any of that to contribute 🎉

Looking for repositories for the other parts of [emberjs.com](https://emberjs.com)? Check out
[website](https://github.com/emberjs/website),
[ember-api-docs](https://github.com/ember-learn/ember-api-docs), [super-rentals
tutorial](https://github.com/ember-learn/super-rentals),
[statusboard](https://github.com/ember-learn/statusboard),
[deprecation-app](https://github.com/ember-learn/deprecation-app), and
[styleguide](https://github.com/ember-learn/ember-styleguide).

## Contributing

Welcome and thanks for your help!

First-time contributors are encouraged to choose issues that are
labeled "help wanted" or "good for new contributors." If you have questions or want a buddy to pair
with, you can join the #-team-learning channel in the [Ember Community
Slack](https://ember-community-slackin.herokuapp.com/).

If you were hoping to help with the contents of the Guides instead of the App that powers it then check out the [contributing instructions for the Guides Source](https://github.com/ember-learn/guides-source/blob/master/CONTRIBUTING.md)

## Prerequisites for running this app

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)

## Installation

* `git clone https://github.com/ember-learn/guides-app.git`
* `cd guides-app`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)


## Local Development alongside the Guides Source

If you are trying to make changes to the Guides App (this repo) and the [Guides
Source](https://github.com/ember-learn/guides-source) and want see your changes locally you need
both repositories on your computer.

```sh
git clone git://github.com/ember-learn/guides-app.git
git clone git://github.com/ember-learn/guides-source.git

cd guides-source
npm link

cd ../guides-app/
npm i
npm link @ember/guides-source
npm start
```  
