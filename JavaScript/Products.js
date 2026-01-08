const search = document.getElementById('search');

const local_kapott_alap = localStorage.getItem("Termekek");
const local_alakitott_alap = JSON.parse(local_kapott_alap);

let Termek = []

const local_kapott = localStorage.getItem("TermekekUj");
const local_alakitott = JSON.parse(local_kapott);

for(let index in local_alakitott_alap){
    Termek[index] = local_alakitott_alap[index];
}
/*
  file = event.target.files[0];
  console.log(file)

  const olvaso = new FileReader();

olvaso.onload = function(e) {
    const base64Kod = e.target.result; 
    
    console.log(base64Kod);
    
    console.log("Átalakítás kész!");
};

olvaso.readAsDataURL(file);
*/

for(let index in local_alakitott){
    Termek[index] = local_alakitott[index];
}

console.log(Termek)

const Submit_btn = document.getElementById('Submit_btn');
const Add_btn = document.getElementById('Add_btn');

document.getElementById('NewProduct').style.display = "none"
document.getElementById('Product_Update').style.display = "none"

function Add_Products(){
    document.getElementById('NewProduct').style.display = "";
}

function Close_Btn(){
    document.getElementById('NewProduct').style.display = "none"
    window.location.reload();
}

function Submit_Btn(){
    const NewProducts = {
        TermekNeve: document.getElementById('Product_Name').value,
        TermekAra: Number(document.getElementById('Product_Price').value)
    }

    Termek.push(NewProducts)
    localStorage.setItem("TermekekUj",JSON.stringify(Termek))

    document.getElementById('NewProduct').style.display = "none"
    window.location.reload();
}

let TorlesElem = 0;
let New_tomb = []
function Delete_btn(){
    TorlesElem = event.target.id;

    for(let index in Termek){
        if(index != TorlesElem){
            New_tomb.push(Termek[index])
        }
    }

    Termek = []

    for(let index in New_tomb){
        Termek[index] = New_tomb[index];
    }

    localStorage.clear();
    localStorage.setItem("TermekekUj",JSON.stringify(Termek));
    window.location.reload();
}

const Cards = document.getElementById('Cards');

let IndexedikElem = 0;

// modositas gomb

function Update_Btn(){
    Termek[IndexedikElem].TermekNeve = document.getElementById('Product_Current_Name').value;
    Termek[IndexedikElem].TermekAra = Number(document.getElementById('Product_Current_Price').value);
    localStorage.setItem("TermekekUj",JSON.stringify(Termek))
    window.location.reload();
}

// Menu Gomb

function Update_btn(){
    document.getElementById('Product_Update').style.display = "";
    document.getElementById('Product_Current_Name').value = Termek[event.target.id].TermekNeve;
    document.getElementById('Product_Current_Price').value = Termek[event.target.id].TermekAra;
    IndexedikElem = event.target.id;
}

document.addEventListener('DOMContentLoaded', e =>{
    e.preventDefault()

    for(let index in Termek){
        const Card_div = document.createElement('div');
        Card_div.setAttribute("class","card_main");

        const Card_img = document.createElement('img');
        Card_img.setAttribute("class","card_img");
        Card_img.setAttribute("src", `${index}`)
        Card_img.src = `../IMG/Termek1.png`;

        const Card_Info_div = document.createElement('div');
        Card_Info_div.setAttribute("class","card_description");

        const Card_h1 = document.createElement('h1');
        Card_h1.setAttribute("class","card_products_name");
        Card_h1.textContent = Termek[index].TermekNeve;

        const Card_a = document.createElement('a');
        Card_a.setAttribute("class","card_products_price");
        Card_a.textContent = Termek[index].TermekAra;

        const Card_Button = document.createElement('button');
        Card_Button.setAttribute("class","Delete_btn");
        Card_Button.textContent = "Termék Törlése";
        Card_Button.setAttribute("id",index);
        Card_Button.setAttribute('onclick',"Delete_btn()")

        const Update_button = document.createElement('button');
        Update_button.setAttribute("class","Update_btn");
        Update_button.textContent = "Termék módosítása";
        Update_button.setAttribute("id",index);
        Update_button.setAttribute('onclick',"Update_btn()");


        Cards.appendChild(Card_div);
        Card_div.appendChild(Card_img);
        Card_div.appendChild(Card_Info_div);
        Card_Info_div.appendChild(Card_h1);
        Card_Info_div.appendChild(Card_a);
        Card_Info_div.appendChild(Card_Button);
        Card_Info_div.appendChild(Update_button)
    }
})


function Kereses() {
    const keresett = search.value.toLowerCase();
    const cards = document.querySelectorAll(".card_main");

    for (let i = 0; i < Termek.length; i++) {
        if (Termek[i].TermekNeve.toLowerCase().includes(keresett)) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}
