const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http);
var players = [];
var MainAdverse=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var pioche = ['2l','3l','bin','cani','chip','cri','doi','x2','nin','non','ray','stop','tun','tur'];
var defausse =[];
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
shuffle(pioche);
io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    players.push(socket.id);

    console.log(players.length);
    console.log(pioche);
    console.log(defausse);
    console.log(MainAdverse);

    io.emit('parametres',pioche,defausse,MainAdverse);
    io.emit('NumberPlayer',players.length);
    

    socket.on('pioche', function (playerid) {
        io.emit('pioche',playerid);
        pioche.pop();
        MainAdverse[playerid]++;
    });

    socket.on('cardPlayed', function (gameObject, NumberPlayer) {
        io.emit('cardPlayed', gameObject, NumberPlayer);
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        players = players.filter(player => player !== socket.id);
    });
});

http.listen(3000, function () {
    console.log('Server started!');
});