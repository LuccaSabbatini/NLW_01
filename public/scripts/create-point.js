// Dados da entidade

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]") /* seleciona o elemento select com name = "uf" */
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
        .then( res => res.json() ) /* (res) => { return res.json() } */
        .then( states => {
            for ( const state of states ) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        } )
}

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    const indexOfSelectedState = event.target.selectedIndex
    
    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`
    citySelect.disabled = true

    fetch(url)
        .then( res => res.json() )
        .then( cities => {           
            for (const city of cities ) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        } )
}

populateUFs()

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) /* Escuta para o evento "mudança" no valor do elemento especificado para executar a função getCities. */

// Itens de coleta

function handleSelectedItem(event) {
    const itemLi = event.target
    const itemId = itemLi.dataset.id

    // Adicionar ou remover uma clase HTML com JavaScript:
    itemLi.classList.toggle("selected")

    // Achar o index do item clicado para ver se ele já está selecionado ou não.
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })

    // Se já estiver selecionado, tirar da seleção.
    if (alreadySelected >= 0) {
        // Tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsEqual = item != itemId
            return itemIsEqual
        })

        selectedItems = filteredItems
    } else { // Se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId) // Adicionar à seleção
    }
    // Atualizar o campo escondido com os itens selecionados.
    collectedItems.value = selectedItems
}

const itemsToCollect = document.querySelectorAll(".items-grid li")
const itemsInput = document.querySelector("input[name=items]")
const collectedItems = document.querySelector("input[name=items]")
let selectedItems = [];

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}
