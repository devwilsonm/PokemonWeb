setTimeout(() => {
    console.log('Hola');
}, 0);

let p = new Promise(resolve => {
    resolve('Saludos');
});

p.then(r => console.log(r));

console.log('Adios');

