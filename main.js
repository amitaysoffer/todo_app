// Grab values
const itemInput = document.getElementById('input')
const itemsList = document.getElementById('list-items')
const errorHeader = document.querySelector('h3');
const form = document.querySelector('form')

let errorVerify = true

// Event listeners
form.addEventListener('submit', addItem);
document.body.addEventListener('click', deleteItem)
document.body.addEventListener('change', checkboxFunction)

// Add item to list
function addItem(e) {
    if (!itemInput.value == '') {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');

        li.className = 'item';
        li.innerText = itemInput.value;

        checkbox.setAttribute("type", "checkbox");
        checkbox.className = 'checkbox'

        li.appendChild(checkbox);
        itemsList.appendChild(li);

        // Store in localstorage
        addItemToLocalStorage(itemInput.value)

        itemInput.value = ''

        // remove error header if exists
        if (!errorVerify) {
            document.querySelector('h3').innerText = '';
        }

        errorVerify = true
    
        
    } else if (errorVerify) {
        errorHeader.innerText = 'Cannot Add a Blank Item to the List'
        errorVerify = false
    };

    e.preventDefault()
};

// Delete item
function deleteItem(e) {
    if (e.target.classList.contains('delete-item')) {
        e.target.parentElement.remove();

        // LS function
        removeItemFromLS(e.target.parentElement)

    }
}

// Add to LocalStorage
function addItemToLocalStorage(item) {
    let items;

    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        // inject existing LS items in items array by parsing them to an object
        // and creating a the items array
        items = JSON.parse(localStorage.getItem('items'));
        console.log(items);
    }

    // add input to items array
    items.push(item);

    // When setItem, the LS resets if using the same key. 
    // Add whatever is in the array to LS, by trasfroming it to a string
    localStorage.setItem('items', JSON.stringify(items));

};

// Render LS items on page
(function () {

    console.log('iffy func');
    items = JSON.parse(localStorage.getItem('items'));

    items.forEach(function (item) {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');

        li.className = 'item';
        li.innerText = item;

        checkbox.setAttribute("type", "checkbox");
        checkbox.className = 'checkbox'

        li.appendChild(checkbox);
        itemsList.appendChild(li);
    })

})();



// Delete item from LS
function removeItemFromLS(item) {
    let items;

    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
        console.log(items);
    }

    let itemText = item.innerText.replace("Delete", "");
    for (index in items) {
        if (itemText === items[index]) {
            items.splice(index, 1)
        }
    }
    localStorage.setItem('items', JSON.stringify(items))
}

// checkbox function
function checkboxFunction(e) {
    if (e.target.classList.contains('checkbox')) {
        if (e.target.checked == true) {
            console.log('check');
            e.target.parentElement.style.textDecoration = "line-through";

            const btn = document.createElement('button');
            btn.className = 'delete-item btn'
            btn.innerText = 'Delete'

            e.target.parentElement.appendChild(btn);
        } else {

            console.log(e.target.nextSibling)
            e.target.nextSibling.remove();
        }
    }
}

