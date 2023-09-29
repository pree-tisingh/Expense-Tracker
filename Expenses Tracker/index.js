let form = document.getElementById('my-form');
let itemArray = [];
form.addEventListener('submit', addItem);

function addItem(e) {
    e.preventDefault();

    let amount = document.getElementById('exampleamount').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('inputState').value;

    if (editingItem) {
        editingItem.Amount = amount;
        editingItem.Description = description;
        editingItem.Category = category;
        editingItem = null; 
    } else {
        let nil = {
            Amount: amount,
            Description: description,
            Category: category
        };
        itemArray.push(nil);
        localStorage.setItem('exp', JSON.stringify(itemArray));
        updateTable();
    }
    document.getElementById('exampleamount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('inputState').value = '';
}

function handleItem(index, action) {
    if (action === 'Delete') {
        if (confirm('Are you sure?')) {
            if (index >= 1 && index <= itemArray.length) {
                itemArray.splice(index - 1, 1); 
                localStorage.setItem('exp', JSON.stringify(itemArray));
                updateTable();
            }
        }
    } else if (action === 'Edit') {
        if (index >= 1 && index <= itemArray.length) {
            editingItem = itemArray[index - 1];
            document.getElementById('exampleamount').value = editingItem.Amount;
            document.getElementById('description').value = editingItem.Description;
            document.getElementById('inputState').value = editingItem.Category;
            window.scrollTo(0, 0);
        }
    }
}

function updateTable() {
    let tablebody = document.getElementById('tablebody');
    let str = "";
    itemArray.forEach((element, index) => {
        str += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${element.Amount}</td>
            <td>${element.Description}</td>
            <td>${element.Category}</td>
            <td>
                <button class="btn btn btn-outline-danger" onclick="handleItem(${index + 1}, 'Delete')">Delete</button>
                <button class="btn btn btn-outline-primary" onclick="handleItem(${index + 1}, 'Edit')">Edit</button>
            </td>
        </tr>`;
    });
    tablebody.innerHTML = str;
}

if (localStorage.getItem('exp')) {
    itemArray = JSON.parse(localStorage.getItem('exp'));
    updateTable();
}
