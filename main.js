// Grab values
const button = document.querySelector('.btn');
const input = document.getElementById('input')
const items = document.getElementById('items-list')
let errorVerify = true

// add item
button.addEventListener('click', function (e) {
    if (!input.value == '') {
        const li = document.createElement('li')
        li.className = 'item'
        li.innerText = input.value

        const btn = document.createElement('button');
        btn.id = 'delete'
        btn.innerText = 'Delete'
        li.appendChild(btn);
        items.appendChild(li);
        input.value = ''

        // console.log(errorEle)
        cobra = true
    } else if (errorVerify) {
        let errorEle = document.getElementById('error');

        let p = document.createElement('p');
        p.innerText = 'Cannot Add a Blank Item to the List'

        errorEle.appendChild(p);
        errorVerify = false
    } else {
        console.log('heyo');
    }

    e.preventDefault()
});

// delete item


