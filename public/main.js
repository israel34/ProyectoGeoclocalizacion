const conseguirLugares = ()=>{
    fetch('json')
    .then(response => response.json())
    .then(lugares => {
        console.log(lugares);
    });
};
conseguirLugares();