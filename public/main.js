const conseguirLugares = ()=>{
    fetch('')
    .then(response => response.json())
    .then(lugares => {
        console.log(lugares);
    });
};
conseguirLugares();