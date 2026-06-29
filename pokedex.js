const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const randomBtn = document.getElementById("randomBtn");

const searchTab = document.getElementById("searchTab");
const randomTab = document.getElementById("randomTab");

const searchSection = document.getElementById("searchSection");
const randomSection = document.getElementById("randomSection");

const pokemonContainerSearch = document.getElementById("pokemonContainerSearch");
const pokemonContainerRandom = document.getElementById("pokemonContainerRandom");

const errorMsg = document.getElementById("error");


async function fetchPokemon(identifier, container) {
  try {
    errorMsg.textContent = "";
    errorMsg.classList.add("hidden");
    container.innerHTML = "Loading... ⏳";

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);

    if (!response.ok) {
      throw new Error("Pokemon not found");
    }

    const data = await response.json();
    displayPokemon(data, container);

  } catch (error) {
    container.innerHTML = "";
    errorMsg.textContent = "Pokemon not found ❌";
    errorMsg.classList.remove("hidden");
  }
}


function displayPokemon(pokemon, container) {
  const types = pokemon.types.map(t => t.type.name).join(", ");

  container.innerHTML = `
    <div class="pokemon-card">
      <h2>#${pokemon.id} ${pokemon.name.toUpperCase()}</h2>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <p><strong>Type:</strong> ${types}</p>
      <p><strong>Height:</strong> ${pokemon.height}</p>
      <p><strong>Weight:</strong> ${pokemon.weight}</p>
    </div>
  `;
}


searchBtn.addEventListener("click", () => {
  const value = searchInput.value.toLowerCase().trim();
  if (value) fetchPokemon(value, pokemonContainerSearch);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchBtn.click();
});


randomBtn.addEventListener("click", () => {
  const randomId = Math.floor(Math.random() * 898) + 1;
  fetchPokemon(randomId, pokemonContainerRandom);
});


function showSection(tab) {
  if (tab === 'search') {
    searchTab.classList.add("active");
    randomTab.classList.remove("active");
    searchSection.classList.remove("hidden");
    randomSection.classList.add("hidden");
  } else {
    randomTab.classList.add("active");
    searchTab.classList.remove("active");
    randomSection.classList.remove("hidden");
    searchSection.classList.add("hidden");
  }
}

searchTab.addEventListener("click", () => showSection('search'));
randomTab.addEventListener("click", () => showSection('random'));
