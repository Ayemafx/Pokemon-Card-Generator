const url = " https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById('card');
const button = document.getElementById('btn');

const typeColor =
{
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
    steel: "#dfe6e9",
    dark: "#2d3436"
}

let getPokeData = () => {
    let id = Math.floor(Math.random() * 999) + 1;

    const finalUrl = url + id;
    fetch(finalUrl).then((response) => response.json()).
    then((data) => {
        generateCard(data);
    })
}


let generateCard = (data) =>{
    console.log(data);
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.front_default;
    const name = data.name[0].toUpperCase() + data.name.slice(1);
    const attack = data.stats[1].base_stat; 
    const defense = data.stats[2].base_stat;
    const speed = data.stats[5].base_stat;

    const themeColor = typeColor[data.types[0].type.name];

    card.innerHTML = `
    <p class="hp">
    <span>HP</span>
    ${hp}
    </p>
    <img src=${imgSrc} alt="demo">
    <h2 class="poke-name">${name}</h2>
    <div class="types">

    </div>
    <div class="stats">
        <div id = "attack">
        <h3>Attack</h3>
        <p>${attack}</p>
       
        </div>

        <div id = "defense">
            <h3>Defense</h3>
            <p>${defense}</p>
        </div>

        <div id = "speed">
            <h3>Speed</h3>
            <p>${speed}</p>
        </div>
    </div>
    `;

    appendTypes(data.types);
    styleCard(themeColor); 
};

let appendTypes = (types) =>
{
    let typesContainer = document.querySelector(".types");
    types.forEach((type)=>{
        let typeSpan = document.createElement("span");
        typeSpan.innerText = type.type.name;
        typesContainer.appendChild(typeSpan);
    })
};

let styleCard = (themeColor) =>
{
    card.style.background = `radial-gradient(circle at 50% 0%, ${themeColor} 36%, #ffffff 36%)`;
    card.querySelectorAll(".types span").forEach((type) =>
    {

        type.style.background = typeColor[type.innerText];

    });
};

btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);

var darkBtn = document.getElementById("dark-btn");

darkBtn.onclick = function(){
    darkBtn.classList.toggle("dark-btn-on");
    document.body.classList.toggle("dark-theme");

    if(localStorage.getItem("theme") == "light"){
        localStorage.setItem("theme", "dark");
    }

    else{
        localStorage.setItem("theme", "light");
    }

}

if(localStorage.getItem("theme") == "light"){
    darkBtn.classList.remove("dark-btn-on");
    document.body.classList.remove("dark-theme");
}
else if(localStorage.getItem("theme") == "dark"){
    darkBtn.classList.add("dark-btn-on");
    document.body.classList.add("dark-theme");
}

else{
    localStorage.setItem("theme", "light");
}