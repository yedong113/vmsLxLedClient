
var options = process.execArgv;

process.on('message', function(m) {
    options=m;
    console.log('Child listen:', m);
    process.send(options);
});

console.log(options);



process.send({ message: 'You love me'});


