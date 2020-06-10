const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close_modal = document.querySelector("#modal .box a")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

close_modal.addEventListener("click", () => {
    modal.classList.add("hide")
})