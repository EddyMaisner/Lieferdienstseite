let menus = [
  {
    name: "Pizza Margherita",
    zutatenBeschreibung: "",
    preis: 9,
    menuImage: "./pizza-imgs/lachs.png",
    größe: " Wahl aus: Medium (ø 28cm), Classic (ø 25cm) oder Large (ø 32cm).",
  },
  {
    name: "Pizza Salami",
    zutatenBeschreibung:
      "Mit Rindersalami",
    preis: 11,
    größe: " Wahl aus: Medium (ø 28cm), Classic (ø 25cm) oder Large (ø 32cm).",
  },
  {
    name: "Pizza Tonno",
    zutatenBeschreibung:
      "mit Thunfisch und Zwiebeln",
    preis: 12,
    größe: " Wahl aus: Medium (ø 28cm), Classic (ø 25cm) oder Large (ø 32cm).",
  },
  {
    name: "Hamburger",
    zutatenBeschreibung:
      "ca 100g Rindfleisch",
    preis: 12.5,
    größe: "Fleischgrößen: small: 100g Rindfleisch  medium: 250g Rindfleisch  Big: 400g RindFleisch",
  },
  {
    name: "Cheeseburger",
    zutatenBeschreibung:
      "Nach Wahl mit  Chedder/Gouda/Schimmelkäse",
    preis: 13.5,
    größe: "Fleischgrößen: small: 100g Rindfleisch  medium: 250g Rindfleisch  Big: 400g RindFleisch",
  },
  {
    name: "Pasta con Tonno",
    zutatenBeschreibung:
      "mit Tomatensauce, Thunfisch und Kapern",
    preis: 8.9,
    größe: "",
  },
  {
    name: "Pasta Napoli",
    zutatenBeschreibung: "mit Tomatensauce",
    preis: 9.9,
    größe: "",
  },
  {
    name: "Insalata Mista",
    zutatenBeschreibung:
      "mit Gurken,Tomaten,Thunfisch,Mais,Eiern und Zwiebeln",
    preis: 11.2,
    größe: " Wahl aus: mit Balsamico-Dressing, mit French-Dressing, oder Italien-Dressing.",
  },
  {
    name: "Insalat Pollo",
    zutatenBeschreibung: "mit Gurken, Tomaten,Feta,Oliven und Mais",
    preis: 12.2,
    größe: " Wahl aus: mit Balsamico-Dressing, mit French-Dressing, oder Italien-Dressing.",
  },
];



function likeImg() { // function um das herz img zu ändern mit onclick

  let image = document.getElementById("heart");

  if (image.src.match("./img/heartUnliked.jpg")) {
    image.src = "./img/heardRed.jpg";
  } else {
    image.src = "./img/heartUnliked.jpg";
  }
}


let pizzaName = [];
let price = [];
let amount = [];


function render() { // function render() rendert den inhalt einer website mit den daten ausm JSON Array

  let content = document.getElementById("content");
  content.innerHTML = "";

  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i];
    content.innerHTML += `
        <div class="card">
        <h2>${menu.name}</h2>
        <h4>${menu.zutatenBeschreibung}</h4>
        <h3>${menu.preis.toFixed(2).replace(".", ",")}€</h3>
        <img src="${menu.menuImage}" alt="">
        <p class="p" >${menu.größe}</p>
        
        <button onclick="addToBasket(${i})">+</button>
      </div>`;
  }
}


function addToBasket(i) {

  const pizza = menus[i]; // function erhält den index (i), die Variablen erhalten den index der namen, prüft ob der name vorhanden ist.

  let index = pizzaName.indexOf(pizza.name);
  if (pizzaName.indexOf(pizza.name) === -1) {
    pizzaName.push(pizza.name);
    price.push(pizza.preis);
    amount.push(1);
  } else {
    amount[index]++;
  }
  renderbasket(); // wird aufgerufen, um den Warenkorb neu zu rendern oder zu aktualisieren
}


function renderbasket() {  // rendert den inhalt vom Warenkorb, indem sie die gerichte aus den arrays nimmt und sie in html code umwandelt, und dem html code der id "basket" hinzufügt 

  let basketContainer = document.getElementById("basket");
  basketContainer.innerHTML = "";
  for (let i = 0; i < pizzaName.length; i++) {
    const item = pizzaName[i];
    const prices = price[i];
    const amounts = amount[i];
    basketContainer.innerHTML += `               
      <div class ="basketclass">
    ${amounts}x ${item}: ${prices.toFixed(2).replace(".", ",")}€
    <div class ="plus" onclick="addtocart(${i})"><b>+</b></div> <div class ="minus" onclick="removeFromBasket(${i})"><b>-</b></div>
  </div>`;
  }
  totalprice(); // die function wird aufgerufen, um den gesamtpreis des warenkorbs zu berechnen und anzuzeigen
}

function addtocart(i) {
  // erhöht die menge von den Pizzen im warenkorb
  amount[i]++;
  renderbasket(); // rendert den warenkorb und wird dem entsprechend angezeigt
  totalprice(); // rendert den gesamtbetrag und wird dem entsprechend angezeigt
}


function totalprice() {
  // der gesamt preis wird berechnet summe * menge
  let sum = 0;
  for (let i = 0; i < price.length; i++) {
    sum += price[i] * amount[i];
  }
  let totalContainer = document.getElementById("gesamt");
  if (!totalContainer) {
    // Überprüft, ob das Element existiert.
    totalContainer = document.createElement("div"); // Erstellt ein neues <div> Element.
    totalContainer.id = "gesamt"; // gibt dem element eine neue id
    totalContainer.classList.add("gesamt"); // gibt dem element die classe hinzu für den style
    document.getElementById("basket").appendChild(totalContainer); // Fügt das Gesamtpreis-Element dem Warenkorb-Container hinzu.
  } else {
    totalContainer.innerHTML = ""; //
  }
  totalContainer.innerHTML = `<div class ="gesamtpreis"><span><b class="fullPrice" >Gesamtpreis:<b> ${sum.toFixed(2).replace(".", ",")}€
    </span><button class="payButton" onclick="payMenus()">Bestellen</button></div>`;
}


function removeFromBasket(i) { // die menge wird reduziert
  amount[i]--;
  if (amount[i] < 1) {
    pizzaName.splice(i, 1);
    price.splice(i, 1);
    amount.splice(i, 1);
  }
  renderbasket(); // jetzt wird die reduzierte menge aktualiesiert und angezeigt
  if (pizzaName.length === 0) {
    let totalContainer = document.getElementById("gesamt");
    if (totalContainer) {
      totalContainer.remove();
      let basketContainer = document.getElementById("basket");
      basketContainer.innerHTML = basketTemplate();
    }
  }
}


function basketTemplate() { // Die function dient dazu, einen html code zu erzeugen der den inhalt des warenkorbs darstellt, wenn der warenkorb leer ist. 
  return `
  <div class="basketname">
   
  </div>
  <div id="basket" class="shoppingCartLeer">
    <img src="./img/bag.png" alt="" />
    <h3>Fülle deinen Warenkorb</h3>
    <span>
      Füge einige leckere Gerichte aus der<br />
      Speisekarte hinzu und bestelle dein Essen
    </span>
  </div>
  `;
}

function payMenus(i) {
  amount[i]--;

  pizzaName.splice(i, 9); // Mit den Methoden splice() werden die entsprechenden Elemente an den Positionen i in den Arrays pizzaName, price und amount entfernt. Dabei werden jeweils 9 Elemente ab der Position i entfernt.
  price.splice(i, 9);
  amount.splice(i, 9);
  alert('Danke für ihre Bestellung, weiteres erhalten sie per E mail.'); // Es wird eine Benachrichtigung mit dem Text "Danke für ihre Bestellung, weiteres erhalten sie per E-Mail" angezeigt.
  renderbasket(); // Die Funktion renderbasket() wird aufgerufen, um den Warenkorb neu zu rendern oder zu aktualisieren.
  if (pizzaName.length === 0) { // Wenn der Warenkorb nach der Bestellung leer ist (wenn die Länge des pizzaName-Arrays gleich 0 ist), werden weitere Aktionen ausgeführt:
    let totalContainer = document.getElementById("gesamt");
    if (totalContainer) {
      totalContainer.remove(); // Das Element mit der ID "gesamt" wird entfernt, falls es existiert.
      let basketContainer = document.getElementById("basket");
      basketContainer.innerHTML = basketTemplate(); // Das HTML-Element mit der ID "basket" wird mit dem Inhalt des Warenkorbs aktualisiert, indem die Funktion basketTemplate() aufgerufen wird.
    }
  }
}

function smallWarenkorb() {   // Die function ändert die darstellung des warenkorbs auf der website indem sie die klassen des entsprechenden html elements anpasst
  let element = document.getElementById("myDiv");

  if (element.classList.contains("showCartInResponse")) {
    element.classList.remove("showCartInResponse");
    element.classList.add("shoppingCart");
  } else {
    element.classList.add("showCartInResponse");
    element.classList.remove("shoppingCart");
  }
}

function iconWarenkorb() {

  let image = document.getElementById("basketPicture");

  if (image.src.match("./img/warenkorb.jpg")) {
    image.src = "./img/minimize.jpg";
  } else {
    image.src = "./img/warenkorb.jpg";
  }

}