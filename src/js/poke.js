const pokemonImage = document.querySelector(".pokemon__image");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonName = document.querySelector(".pokemon__name");
const form = document.querySelector(".form");

const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
let searchPokemon = 1;






// CONECTAR AS INFORMAÇOES DA ;


const fetchPokemon = async (pokemon) => {

  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {

    const data = await APIResponse.json();

    return data;

  }

};


const renderPokemon = async (pokemon) => {

  pokemonName.textContent = "loading";
  pokemonNumber.textContent = "....()";
  pokemonImage.src = "https://i.pinimg.com/originals/0a/50/6f/0a506fe0f6c211128cf1ed370655c6a1.gif"

  const data = await fetchPokemon(pokemon);

  console.log(data);

  if (data) {
    //  CASO TUDO DE CERTO
    pokemonImage.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default
    pokemonImage.style.width = "25%";
    pokemonNumber.textContent = data.id;
    pokemonName.textContent = data.name;
    input.value = "";
    searchPokemon = data.id;

  } else {
    // CASO DE ERRADO
    pokemonImage.src = "https://64.media.tumblr.com/18b6478cbf8e5625348d3e6c05348add/tumblr_pimj9cv1b91vm9ssvo1_r3_1280.gif";
    pokemonImage.style.width = "25%";
    pokemonNumber.textContent = "";
    pokemonName.textContent = "Not found :C"




  }







};

form.addEventListener('submit', (event) => {

  event.preventDefault();


  renderPokemon(input.value.toLowerCase());

});


buttonPrev.addEventListener("click", (Event) => {

  if (searchPokemon > 1) {

    searchPokemon -= 1;

    renderPokemon(searchPokemon);

  }


});



buttonNext.addEventListener("click", (Event) => {

  searchPokemon += 1;

  renderPokemon(searchPokemon);
});


renderPokemon(searchPokemon)