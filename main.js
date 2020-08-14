// Grab values
const button = document.querySelector('.btn');
const input = document.getElementById('input')
const itemsList = document.getElementById('list-items')
const errorHeader = document.querySelector('h3');

let errorVerify = true

// Event listeners
// button.addEventListener('click', addItem);
document.body.addEventListener('click', deleteItem)
document.body.addEventListener('change', checkboxFunction)
document.body.addEventListener('click', saveLocal)

function saveLocal(e) {
    console.log('hello')
    console.log(document.querySelector('input').value);
    console.log(input)
    console.log(input.value)
    e.preventDefault();
}
// Local Storage
// button.addEventListener('click', function (e) {


//     localStorage.setItem('name', input.value);
// // localStorage.clear();


// })




function checkboxFunction(e) {
    if (e.target.classList.contains('checkbox')) {
        if (e.target.checked == true) {
            e.target.parentElement.style.textDecoration = "line-through";

            const btn = document.createElement('button');
            btn.className = 'delete-item btn'
            btn.innerText = 'Delete'
            e.target.parentElement.appendChild(btn);
        } else {
            e.target.nextSibling.remove();
        }
    }
}

// Delete item
function deleteItem(e) {
    if (e.target.classList.contains('delete-item')) {
        e.target.parentElement.remove();
    }
}



// Add item to list
function addItem(e) {
    if (!input.value == '') {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');

        li.className = 'item';
        li.innerText = input.value;

        checkbox.setAttribute("type", "checkbox");
        checkbox.className = 'checkbox'
        // checkbox.style.float = 'left'

        li.appendChild(checkbox);
        itemsList.appendChild(li);


        input.value = ''

        // remove error header if exists
        if (!errorVerify) {
            document.querySelector('h3').innerText = '';
        }

        errorVerify = true

    } else if (errorVerify) {
        errorHeader.innerText = 'write something dumbass TEST'
        errorVerify = false
    }

    e.preventDefault()
};

