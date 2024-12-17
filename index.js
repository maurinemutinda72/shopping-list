// Initialize an array to store items
const shoppingList = [];

// DOM Elements
const itemInput = document.getElementById("item-input");
const addButton = document.getElementById("add-button");
const clearButton = document.getElementById("clear-button");
const shoppingListContainer = document.getElementById("shopping-list");

// Function to render the list
function renderList() {
    
    // Clear the current list
    shoppingListContainer.innerHTML = "";

    // Iterate through the shopping list array
    shoppingList.forEach((item, index) => {
        const listItem = document.createElement("li");

        // Add purchased class if the item is purchased
        listItem.className = item.purchased ? "purchased" : "";

        // Create the item structure
        listItem.innerHTML = `
            <span>${item.name}</span>
            <div>
                <button class="purchase-btn">${item.purchased ? "Undo" : "Mark Purchased"}</button>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        // Add event listeners to buttons
        const purchaseButton = listItem.querySelector(".purchase-btn");
        const editButton = listItem.querySelector(".edit-btn");
        const deleteButton = listItem.querySelector(".delete-btn");

        // Mark as purchased
        purchaseButton.addEventListener("click", () => togglePurchased(index));

        // Edit item
        editButton.addEventListener("click", () => editItem(index));

        // Delete item
        deleteButton.addEventListener("click", () => deleteItem(index));

        shoppingListContainer.appendChild(listItem);
    });
}

// Add new item to the list
addButton.addEventListener("click", () => {
    const newItem = itemInput.value.trim();

    if (newItem) {
        // Add the item to the array
        shoppingList.push({ name: newItem, purchased: false });
        itemInput.value = ""; // Clear input
        renderList(); // Update the list
    } else {
        alert("Please enter an item before adding.");
    }
});

// Mark an item as purchased
function togglePurchased(index) {
    shoppingList[index].purchased = !shoppingList[index].purchased;
    renderList();
}

// Edit an item
function editItem(index) {
    const newName = prompt("Edit the item:", shoppingList[index].name);
    if (newName) {
        shoppingList[index].name = newName.trim();
        renderList();
    }
}

// Delete an item with confirmation
function deleteItem(index) {
    const itemName = shoppingList[index]?.name; // Get the item name safely
    if (confirm(`Are you sure you want to delete "${itemName}"?`)) {
        shoppingList.splice(index, 1); // Remove the item
        renderList(); // Update the list
        alert(`"${itemName}" has been deleted successfully.`); // User feedback
    }
}

// Clear the entire list with double confirmation
clearButton.addEventListener("click", () => {
    if (shoppingList.length === 0) {
        alert("Your list is already empty.");
        return; // Prevent unnecessary prompts
    }

    if (confirm("Are you sure you want to clear the entire list?")) {
        if (confirm("This action cannot be undone. Do you really want to proceed?")) {
            shoppingList.length = 0; // Clear the array
            renderList(); // Update the list
            alert("Your shopping list has been cleared successfully.");
        }
    }
});



// Initial render
renderList();
