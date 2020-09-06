// Render LocalStorage items when page loads
window.addEventListener('DOMContentLoaded', () => {
    items = JSON.parse(localStorage.getItem('items'));

    items.forEach(function (item) {
        renderItem(item);
    })
});

// Add new item event listener
const form = document.querySelector('form')
form.addEventListener('submit', function (e) {
    const itemInput = document.getElementById('input')
    const errorHeader = document.querySelector('h3');

    let errorVerify = true

    if (!itemInput.value == '') {
        renderItem(itemInput.value)

        addItemToLocalStorage(itemInput.value)
        // remove error header if exists
        if (!errorVerify) {
            document.querySelector('h3').innerText = '';
        }

        let errorVerify = true
        itemInput.value = ''
    } else if (errorVerify) {
        errorHeader.innerText = 'Cannot Add a Blank Item to the List'
        errorVerify = false
    };

    e.preventDefault()
});

// Delete an item from list-items event listener 
document.body.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-item')) {
        e.target.parentElement.remove();

        removeItemFromLS(e.target.parentElement)
    }
})

// Check box handler event listener
document.body.addEventListener('change', function (e) {
    if (e.target.classList.contains('checkbox')) {
        if (e.target.checked == true) {
            e.target.parentElement.style.textDecoration = "line-through";

            const btn = document.createElement('button');
            btn.className = 'delete-item btn'
            btn.innerText = 'Delete'

            e.target.parentElement.appendChild(btn);
        } else {
            e.target.nextSibling.remove();
            e.target.parentElement.style.textDecoration = "none";
        }
    }
})

function renderItem(itemText) {
    const itemsList = document.getElementById('list-items')

    const li = document.createElement('li');
    const checkbox = document.createElement('input');

    li.className = 'item';
    li.innerText = itemText;

    checkbox.setAttribute("type", "checkbox");
    checkbox.className = 'checkbox'

    li.appendChild(checkbox);
    itemsList.appendChild(li);
};

function addItemToLocalStorage(item) {

    const items = JSON.parse(localStorage.getItem('items')) || [];

    items.push(item);

    // When setItem, the LS resets if using the same key. 
    // Add whatever is in the array to LS, by trasfroming it to a string
    localStorage.setItem('items', JSON.stringify(items));
};

function removeItemFromLS(item) {
    const items = JSON.parse(localStorage.getItem('items')) || [];


    let itemText = item.innerText.replace("Delete", "");

    const filteredItems = items.filter(function (loopedItem) {
        return loopedItem !== itemText
    });

    localStorage.setItem('items', JSON.stringify(filteredItems))
};

