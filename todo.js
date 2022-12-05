let taskVal = document.getElementById("task")
let hintVal = document.getElementById("hint")
let display = document.getElementById("items")
let check = 0, idStore
let arrItems = []

function getAll(){
    let get = localStorage.getItem("store")
    let lists = JSON.parse(get)
    let arrange = ''
    lists.forEach((el, i)=>{
        arrange += `<div id="item" class="item"> 
                <span class="new">* ${el.task}</span> <br><span>Hint -- ${el.hint}</span>
                <span class="delete" id=${i} onclick="delOne(event)">&times;</span>
                <span class="delete" id=${i} onclick="editOne(event)">edit</span>
                </div>`
    })
            
    display.innerHTML = arrange
    taskVal.value = '', hintVal.value = ''
}
getAll()

function addTask(){
    let task = taskVal.value
    let hint = hintVal.value
    let storeValues = {task, hint} 
    if(task.length !== 0 && hint.length !== 0){
        if(check){
            arrItems.splice(idStore, 1, storeValues)
            localStorage.setItem("store", JSON.stringify(arrItems))
            check = 0
        } else {
            arrItems.push(storeValues)
            localStorage.setItem("store", JSON.stringify(arrItems))
        }
    } else {
        alert("input field can't be empty")
    }
    getAll()
}

function editOne(e){
    let get = localStorage.getItem("store")
    let lists = JSON.parse(get)[e.target.id]
    taskVal.value = lists.task
    hintVal.value = lists.hint
    check= 1, idStore = e.target.id
}

function delOne(e){
    arrItems.splice(e.target.id, 1)
    localStorage.setItem("store", JSON.stringify(arrItems))
    getAll()
}

function delAll(){
    arrItems = []
    localStorage.clear()
    display.innerHTML = ""
}