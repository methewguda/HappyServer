const Hapi = require('hapi');
const Path = require('path');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

server.register(require('vision'), function(err){

    if(err){
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply){
            reply.view('index');
        }
    });

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: './views'
    });
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});