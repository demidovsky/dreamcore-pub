# Dreamcore

## Deploy

1. ~~Set host in dreamcore-frontend/.env~~ Hosts are specified in package.json, no action needed
2. ```npm run webpack``` (```cd dreamcore-frontend && npm i``` if needed)
3. (optional, due to .dockerignore) Remove .tmp/public/service_worker.js
4. ```npm run build && npm run push```
5. ```ssh root@dreamcore.ru```
6. ```cd dreamcore```
7. ```docker-compose pull web && docker-compose stop web && docker-compose up -d web```


### Links

a [Sails v1](https://sailsjs.com) application

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Sun Dec 09 2018 17:18:13 GMT+0300 (MSK) using Sails v1.1.0.

<!-- Internally, Sails used [`sails-generate@1.16.2`](https://github.com/balderdashy/sails-generate/tree/v1.16.2/lib/core-generators/new). -->


This project's boilerplate is based on an expanded seed app provided by the [Sails core team](https://sailsjs.com/about) to make it easier for you to build on top of ready-made features like authentication, enrollment, email verification, and billing.  For more information, [drop us a line](https://sailsjs.com/support).


<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

