const localStorageKey = 'to-do-list-dj';  

function validateIfExistsNewTask() {  //function to check if the tasks are duplicated,if so, there'll be an alert
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
    let inputValue = document.getElementById('input-task').value
    let exists = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

function newTask() {
    let input = document.getElementById('input-task')
    input.style.border = ''  //to start without the red border
    
    if (!input.value) {
        input.style.border = '1px solid red'  //the border will be red when the user don't write anything
        alert('Type some task to add to your list')
        
    } else if (validateIfExistsNewTask()) {
        alert('You already have a task with this description')
        
    } else {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey, JSON.stringify(values))
        showValues()
    }
    input.value = ''   //to clean the input every time you add a task
};

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
    let list = document.getElementById('to-do-list')
    list.innerHTML = '';
    for (let i = 0; i < values.length; i++) {   
        list.innerHTML += `<li>${values[i]['name']}<button id='btn-ok' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"> <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/></svg></button></li>`
    }
};

function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
    let index = values.findIndex(x => x.name == data)
    values.splice(index, 1)  // it will get the index position and delete it
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    showValues()  //call again, so it will update your site without the items you removed from.
}

showValues(); //call this function again, so when you reload your page it doesn't clean.