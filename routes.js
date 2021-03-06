/*
* @Author: dmyang
* @Date:   2015-07-31 11:41:38
* @Last Modified by:   dmyang
* @Last Modified time: 2016-02-02 11:08:44
*/

'use strict';

var fs = require('fs');
var path = require('path');

var render = require('koa-ejs');
var proxy = require('koa-proxy');

var list = require('./src/mock/list');
var routerJSON = require('./src/configs/routes/router.json');
var APIRouterJSON = require('./src/configs/routes/APIRouter.json');

module.exports = function(router, app, staticDir) {
    // mock api
    router.get('/api/list', function*() {
        var query = this.query || {};
        var offset = query.offset || 0;
        var limit = query.limit || 10;
        var diff = limit - list.length;

        if(diff <= 0) {
            this.body = {code: 0, data: list.slice(0, limit)};
        } else {
            var arr = list.slice(0, list.length);
            var i = 0;

            while(diff--) arr.push(arr[i++]);

            this.body = {code: 0, data: arr};
        }
    });


    // proxy api
    router.get('/api/foo/bar', proxy({url: 'http://foo.bar.com'}));

    render(app, {
        root: path.join(__dirname, 'src/views'),
        layout: '../common/components/layout/layout',
        viewExt: 'hbs',
        cache: false,
        debug: true
    });


    for(var i in routerJSON){
        let a = i,
            routerNum = routerJSON[i];
        router.get(a, function*() {
            yield this.render(routerNum + '/index',{staticPath:'views' + routerNum});
        });
    }

    for(var j in APIRouterJSON) {
        let b = j,
            routerNum = APIRouterJSON[j];
        router.get(b, function*() {
            var query = this.query || {};
            var offset = query.offset || 0;
            var limit = query.limit || 10;
            var diff = limit - list.length;
            let data = require('./src/mock' + routerNum);
            /*if(diff <= 0) {
                this.body = {code: 0, data: list.slice(0, limit)};
            } else {
                var arr = list.slice(0, list.length);
                var i = 0;

                while(diff--) arr.push(arr[i++]);

                this.body = {code: 0, data: data};
            }*/
            this.body = {code: 0, data: data};
        });
    }


    router.get('/', function*() {
        var pages = fs.readdirSync(staticDir);
        pages = pages.filter(function(page) {
            return /\.html$/.test(page);
        });

        yield this.render('home', {pages: pages || []});
    });
};
