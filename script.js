const shoppingListContainer = document.getElementById('shoppingList');
const itemInput = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');

// Load shopping list from local storage on page load
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

// Render the shopping list
function renderList() {
    shoppingListContainer.innerHTML = ''; // Clear the current list in the DOM
    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.text; // Set the text of the list item
        if (item.purchased) {
            li.classList.add('purchased'); // Mark as purchased if true
        }

        // Event listener to mark items as purchased
        li.addEventListener('click', () => {
            item.purchased = !item.purchased; // Toggle purchase status
            saveToLocalStorage(); // Save updated list
            renderList(); // Re-render the list to reflect changes
        });

        // Event listener to edit items
        li.addEventListener('dblclick', () => {
            const newItem = prompt('Edit item', item.text);
            if (newItem) {
                item.text = newItem; // Update the item text
                saveToLocalStorage(); // Save updated list
                renderList(); // Re-render the list
            }
        });

        shoppingListContainer.appendChild(li); // Add the item to the list in the DOM
    });
}

// Function to save shopping list to local storage
function saveToLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Event listener for the "Add" button
addButton.addEventListener('click', () => {
    const itemText = itemInput.value.trim();
    if (itemText) {
        shoppingList.push({ text: itemText, purchased: false }); // Add new item object
        saveToLocalStorage(); // Save updated list
        renderList(); // Render the updated list
        itemInput.value = ''; // Clear the input field
    }
});

// Event listener for the "Clear List" button
clearButton.addEventListener('click', () => {
    shoppingList.length = 0; // Clear the array
    saveToLocalStorage(); // Clear local storage
    renderList(); // Render the empty list
});

// Initial render of the shopping list on page load
renderList();