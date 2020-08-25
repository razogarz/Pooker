//tworzymy talie do pokera 24 kartowego
let tworzenieTalii = (function(){
    //konstruktor
    function karta (id, wartosc){
        return {
            id,
            wartosc,
            tf: false
        }
    }
    //tablica kart, tworzenie poszczególnych kart pętlą
    let talia = [];
    for (let i = 0; i < 24; i++){
        let pojedynczaKarta = karta(i, i%6);
        talia.push(pojedynczaKarta);
    }
    return talia;
})();


//losujemy karty graczom
let rozdanie = function (liczbaGraczy, talia) {
    //utworzenie tablicy wylosowanych
    let otrzymaneKarty = [];
    for(let i = 0; i < liczbaGraczy; i++){
        let jednaReka = [];     //wylosowanie kart dla pojedynczego gracza
        let j = 0;
        while(j < 5) {      //iterujemy się dopóki nie trafimy na 5 niezabranych kart
            let numerKarty = Math.round(Math.random() * 23);
            if(!talia[numerKarty].tf){
                jednaReka.push(numerKarty);
                talia[numerKarty].tf = true;        //karte zabieramy z talii
                j++;
            }
        }
        jednaReka.sort(function(a,b){return a - b});    //sortujemy karty i popychamy karty jednego gracza
        otrzymaneKarty.push(jednaReka);
    }
    return otrzymaneKarty;
}


//wymiana kart
let wymiana = function(reka, kartyWymieniane, talia){
    //usuwamy karty z ręki
    reka.filter(a => !(a in kartyWymieniane) );
    //zwracamy karty do talii
    for(let a in kartyWymieniane){
        talia[a].tf = false;
    }
    console.log(reka);
    //szukamy nowych kart  w talii
    let j = reka.length - 1;
    while (j < 5) {
        let numerKarty = Math.round(Math.random() * 23);
        if(!talia[numerKarty].tf){
            reka.push(numerKarty);
            talia[numerKarty].tf = true;
            j++;
         }
    }
    reka.sort(function(a, b){return a - b;}); //sortujemy i zwracamy nową rękę
    return reka;
}

//główny obiekt
let gra = (function(tT, rd, wym){
    let gracze = prompt('Podaj ilosc graczy, najlepiej 1-3');
    let rozdanie = (gracze > 0 && gracze < 4) ? rd(gracze, tT) : ('ZA DUZO GRACZY');
    console.log(rozdanie);
    let nowe = [];
    nowe = wym(rozdanie[0], [0, 2, 4], tT);
    console.log(nowe);
    
})(tworzenieTalii, rozdanie, wymiana);