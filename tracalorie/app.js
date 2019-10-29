// ================================= STORAGE CONTROLLER ========================================= //
const storageCtrl = (function() {
  // Public Methods
  return {
    storeItem: function(item) {
      let items;
      // Check to see if any items in local storage
      if (localStorage.getItem('items') === null) {
        items = [];
        // Push new items
        items.push(item);
        // Set local storage
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        //Get what is already in local storage
        items = JSON.parse(localStorage.getItem('items'));
        // Push new items
        items.push(item);
        // Re set local sotrage
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: function() {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateItemStorage: function(updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item, index) {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      // Re set local sotrage
      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteItemFromStorage: function(id) {
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item, index) {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });
      // Re set local sotrage
      localStorage.setItem('items', JSON.stringify(items));
    },
    clearItemsFromStorage: function() {
      localStorage.removeItem('items');
    }
  };
})();
// ================================= ITEM CONTROLLER ========================================= //
const itemCtrl = (function() {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure
  const data = {
    // items: [
    //   // { id: 0, name: 'Stake Dinner', calories: 1200 },
    //   // { id: 1, name: 'Cookie', calories: 400 },
    //   // { id: 2, name: 'Eggs', calories: 300 }
    // ],
    items: storageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  };

  // Public methods
  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, calories) {
      let ID;
      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new item
      const newItem = new Item(ID, name, calories);

      // Add to items array
      data.items.push(newItem);

      return newItem;
    },
    getItemById: function(id) {
      let found = null;
      // Loop through items
      data.items.forEach(function(item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    updateItem: function(name, calories) {
      // Calories to number
      calories = parseInt(calories);
      let found = null;
      data.items.forEach(function(item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },
    clearAllItems: function() {
      data.items = [];
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function() {
      return data.currentItem;
    },
    getTotalCalories: function() {
      let total = 0;

      // Lopp through items and add cals
      data.items.forEach(function(item) {
        total += item.calories;
        console.log(item);
      });

      // Set total cal in data structure
      data.totalCalories = total;

      // return total
      return data.totalCalories;
    },
    deleteItem: function(id) {
      // Get ids
      ids = data.items.map(function(item) {
        return item.id;
      });
      // Get index
      const index = ids.indexOf(id);
      //Remove item
      data.items.splice(index, 1);
    },
    logData: function() {
      return data;
    }
  };
})();

// ================================= UI CONTROLLER ========================================= //
const uiCtrl = (function() {
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  };

  // Public Methods
  return {
    populateItemList: function(items) {
      let html = '';

      items.forEach(item => {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });

      // Insert List Items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },
    addListItem: function(item) {
      // Show items if 1 or more
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      //Add ID
      li.id = `item-${item.id}`;
      //Add HMTL
      li.innerHTML = `
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>`;
      // Insert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement('beforeend', li);
    },
    updateListItem: function(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Turn node list into array
      listItems = Array.from(listItems);

      listItems.forEach(function(listItem) {
        const itemId = listItem.getAttribute('id');
        if (itemId === `item-${item.id}`) {
          document.querySelector(`#${itemId}`).innerHTML = `<strong>${
            item.name
          }: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });
    },
    deleteListItem: function(id) {
      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    addItemToForm: function() {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = itemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = itemCtrl.getCurrentItem().calories;
      uiCtrl.showEditState();
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    removeItems: function() {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Turn Node list into array
      listItems = Array.from(listItems);
      listItems.forEach(function(item) {
        item.remove();
      });
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    clearEditState: function() {
      uiCtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    getSelectors: function() {
      return UISelectors;
    }
  };
})();

// ================================= APP CONTROLLER ========================================= //
const appCtrl = (function(itemCtrl, uiCtrl, storageCtrl) {
  // Load event listeners
  const loadEventListeners = function() {
    // Get UI Selector
    const UISelectors = uiCtrl.getSelectors();
    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener('click', itemAddSubmit);

    // Disable submit on enter
    document.addEventListener('keypress', function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener('click', itemEditClick);

    // Update Item event
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener('click', itemUpdateSubmit);

    // Delete button
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener('click', itemDeleteSubmit);

    // back button
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener('click', uiCtrl.clearEditState());

    // Clear button event
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener('click', clearAllItemsClick);
  };

  // Add item submit
  const itemAddSubmit = function(e) {
    // Get form input from UI controller
    const input = uiCtrl.getItemInput();
    // Check for name and calorie input
    if (input.name !== '' && input.calories !== '') {
      // Add item
      newItem = itemCtrl.addItem(input.name, input.calories);
      // Add item to UI list
      uiCtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = itemCtrl.getTotalCalories();
      // Add total calories
      uiCtrl.showTotalCalories(totalCalories);

      // Store in local storage
      storageCtrl.storeItem(newItem);

      // Clear fields
      uiCtrl.clearInput();
    }
    e.preventDefault();
  };

  // Item Edit Click
  const itemEditClick = function(e) {
    if (e.target.classList.contains('edit-item')) {
      // Get the list item id (item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArr = listId.split('-');
      // get actual id
      const id = parseInt(listIdArr[1]);
      //get item
      const itemToEdit = itemCtrl.getItemById(id);
      // Set current item
      itemCtrl.setCurrentItem(itemToEdit);
      // Add item to form
      uiCtrl.addItemToForm();
    }

    e.preventDefault();
  };

  // Item Update Submit
  const itemUpdateSubmit = function(e) {
    // Get item input
    const input = uiCtrl.getItemInput();
    // update item
    const updateItem = itemCtrl.updateItem(input.name, input.calories);
    // Update Ui
    uiCtrl.updateListItem(updateItem);

    // Get total calories
    const totalCalories = itemCtrl.getTotalCalories();
    // Add total calories
    uiCtrl.showTotalCalories(totalCalories);

    // Update local storage
    storageCtrl.updateItemStorage(updateItem);

    uiCtrl.clearEditState();

    e.preventDefault();
  };

  // Delete button event
  const itemDeleteSubmit = function(e) {
    // Get current item
    const currentItem = itemCtrl.getCurrentItem();
    // Delete from data structure
    itemCtrl.deleteItem(currentItem.id);
    // Delete from UI
    uiCtrl.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = itemCtrl.getTotalCalories();
    // Add total calories
    uiCtrl.showTotalCalories(totalCalories);

    // Delete from local storage
    storageCtrl.deleteItemFromStorage(currentItem.id);

    uiCtrl.clearEditState();
    e.preventDefault();
  };

  // Clear all items button event
  const clearAllItemsClick = function(e) {
    // Deletge all items from data stucture
    itemCtrl.clearAllItems();
    // Get total calories
    const totalCalories = itemCtrl.getTotalCalories();
    // Add total calories
    uiCtrl.showTotalCalories(totalCalories);
    // Remove from UI
    uiCtrl.removeItems();
    // Hide the UL
    uiCtrl.hideList();
    // Remove from Local Storage
    storageCtrl.clearItemsFromStorage();

     e.preventDefault();
  };

  // Public methods
  return {
    init: function() {
      // Clear edit state / set inital state
      uiCtrl.clearEditState();
      // Fetch items from data structure
      const items = itemCtrl.getItems();

      // Check if any items
      if (items.length === 0) {
        uiCtrl.hideList();
      } else {
        // Populate list with items
        uiCtrl.populateItemList(items);
      }

      // Load event listeners
      loadEventListeners();
    }
  };
})(itemCtrl, uiCtrl, storageCtrl);

// Initialise App
appCtrl.init();
