// Grab values
const button = document.querySelector('.btn');
const input = document.getElementById('input')
const itemsList = document.getElementById('list-items')
const errorHeader = document.querySelector('h3');

let errorVerify = true

// Event listeners
button.addEventListener('click', addItem);
document.body.addEventListener('click', deleteItem)
document.body.addEventListener('change', checkboxFunction)

// Add item to list
function addItem(e) {
    if (!input.value == '') {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');

        li.className = 'item';
        li.innerText = input.value;

        checkbox.setAttribute("type", "checkbox");
        checkbox.className = 'checkbox'

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

// Delete item
function deleteItem(e) {
    if (e.target.classList.contains('delete-item')) {
        console.log('delete item')
        e.target.parentElement.remove();
    }
}


function checkboxFunction(e) {
    if (e.target.classList.contains('checkbox')) {
        if (e.target.checked == true) {
            console.log('check');
            e.target.parentElement.style.textDecoration = "line-through";

            const btn = document.createElement('button');
            btn.className = 'delete-item btn'
            btn.innerText = 'Delete'
            // btn.style.float = 'right'
            console.log(e.target.parentElement)
            e.target.parentElement.appendChild(btn);
        } else {

            console.log(e.target.nextSibling)
            e.target.nextSibling.remove();
        }
    }
}

