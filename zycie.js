var początek = [];
var InitWiersz = [];
var ilePokolen = 1;


var pierwsze = document.getElementById('pierwsze').innerText;
document.getElementById('pierwsze').innerText='';

for (var i = 1; i <=1; i++) {


	for (var j = 0; j <=pierwsze.length; j++) {
		if (pierwsze[j] === ' ' || j==pierwsze.length) {
			j++;
			początek.push(InitWiersz);
			InitWiersz = [];
		}
		InitWiersz.push(pierwsze[j]);
		
	}
}

var pokolenia = [];
pokolenia.push(początek);

// console.log("Pierwsze pokolenie: ");
// console.log(pokolenia);
// console.log(pokolenia.length);

var nowyWiersz = [];
var nowePokolenie = [];

function sasiedzi37Pok(nowePokolenie)
{
	let ZycieWDrugimWierszu = 0;
	if (nowePokolenie[0][17]=='X') {ZycieWDrugimWierszu++}
	if (nowePokolenie[0][18]=='X') {ZycieWDrugimWierszu++}
	if (nowePokolenie[0][19]=='X') {ZycieWDrugimWierszu++}

	if (nowePokolenie[1][17]=='X') {ZycieWDrugimWierszu++}
	if (nowePokolenie[1][19]=='X') {ZycieWDrugimWierszu++}

	if (nowePokolenie[2][17]=='X') {ZycieWDrugimWierszu++}
	if (nowePokolenie[2][18]=='X') {ZycieWDrugimWierszu++}
	if (nowePokolenie[2][19]=='X') {ZycieWDrugimWierszu++}
		console.log('W 37 Pokoleniu komórka w drugim wierszu i 19 kolumnie ma '+ZycieWDrugimWierszu+' sąsiadów.');
}

function ileWDrugim(drugie, które){
	let ileZyc = 0;
	for (var wiersz =0; wiersz <=11; wiersz++) {
		for (var kolumna = 0; kolumna <= 19; kolumna++) {
			if (drugie[wiersz][kolumna] == 'X') ileZyc++;
		}
	}
	console.log('W '+które+' pokoleniu jest '+ileZyc+' żyjących komórek!');
}

function identyczyUkladJakWPoprzednimPok(wszystkiePok){
	let flaga = 0;
	for (var pok = 0 ; pok <=98; pok++) {
		if (((wszystkiePok[pok].toString()) === (wszystkiePok[pok+1].toString()))&& !flaga) {
			ileWDrugim(wszystkiePok[pok], (pok+2));
			if (flaga == 0) console.log('Układ ten ustali się w '+(pok+2)+' pokoleniu.');
			flaga = 1;
		}
	}
	if (flaga == 0) console.log('Układ ten nigdy się nie ustali w zadanym przedziale o 1-100 pokolenia!'); 
}

function liczZycia(ktoreP, wiersz, ktory) {
	let ile = 0;
	var obecnaK = pokolenia[ktoreP][wiersz][ktory];
//console.log('Obecna: '+obecnaK);
	window.srodek = ktory;
	window.obecny = wiersz;
	var gora = wiersz - 1;
		if (wiersz == 0) gora = 11;
	var dol = wiersz + 1;
		if (wiersz == 11) dol = 0;
	var lewo = ktory - 1;
		if (ktory == 0) lewo = 19;
	window.prawo = ktory + 1;
		if (ktory == 19) window.prawo = 0;

	if (pokolenia[ktoreP][gora][lewo]=='X') {ile++}
	if (pokolenia[ktoreP][gora][window.srodek]=='X') {ile++}
	if (pokolenia[ktoreP][gora][window.prawo]=='X') {ile++}

	if (pokolenia[ktoreP][window.obecny][lewo]=='X') {ile++}
	if (pokolenia[ktoreP][window.obecny][window.prawo]=='X') {ile++}

	if (pokolenia[ktoreP][dol][lewo]=='X') {ile++}
	if (pokolenia[ktoreP][dol][window.srodek]=='X') {ile++}
	if (pokolenia[ktoreP][dol][window.prawo]=='X') {ile++}

	var nastepna;
		if ((ile == 2 || ile == 3) && obecnaK == "X") {nastepna = "X";}
		else if (ile == 3 && obecnaK == ".") {nastepna = "X";}
		else nastepna = ".";

	nowyWiersz.push(nastepna);
		if (nowyWiersz.length == 20) {
			nowePokolenie.push(nowyWiersz);
			nowyWiersz = [];
			console.log('Dodano nowy wiersz!');

			if (nowePokolenie.length==12) {
				pokolenia.push(nowePokolenie);
				if (ilePokolen==36) sasiedzi37Pok(nowePokolenie);
				if (ilePokolen==1) ileWDrugim(nowePokolenie, 2);
				nowePokolenie = [];
				ilePokolen++;
			}
		}
}

var nastPok = 0;
var nastWiersz = 0;	


while(ilePokolen < 100) {

if (window.srodek == 19 && window.obecny == 11) {nastPok++}
if (window.srodek == 19 ) {nastWiersz++}

	if (window.prawo === undefined) {window.prawo = 0;}
	if (nastWiersz == 12) {nastWiersz = 0;}

	liczZycia(nastPok, nastWiersz ,window.prawo);
}
identyczyUkladJakWPoprzednimPok(pokolenia);
console.log('Końcowe pokolenia');
console.log(pokolenia);
//console.log('Wywołań: '+ileWywolan);
