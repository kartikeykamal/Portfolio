const selectAllBtn = document.querySelector('.select-all');
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;
let lastChecked;

function handleCheck(e) {
  let inBetween = false;

  if (e.shiftKey && this.checked) {
    const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }
      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }
  updateItemCount();
  lastChecked = this;
}

function selectAll() {
  const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
  const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
  checkboxes.forEach(checkbox => {
    checkbox.checked = !allChecked;
  });
  updateItemCount();
}

function updateItemCount() {
  const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
  const totalItems = checkboxes.length;
  const checkedItems = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
  const countDisplay = document.querySelector('.inbox-count');
  countDisplay.textContent = `${checkedItems}/${totalItems} items`;
}

function toggleTheme() {
  if (html.classList.contains('dark-mode')) {
    html.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  }
}

// Add new item
const addItemForm = document.getElementById('add-item-form');
const newItemInput = document.getElementById('new-item-input');
const itemsContainer = document.querySelector('.items-container');

addItemForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const value = newItemInput.value.trim();
  if (!value) return;
  const itemDiv = document.createElement('div');
  itemDiv.className = 'item';
  itemDiv.innerHTML = `
    <label class="checkbox-container">
      <input type="checkbox">
      <span class="checkmark"></span>
    </label>
    <p class="item-text">${value}</p>
    <button class="delete-item" title="Delete" style="background: none; border: none; color: var(--text-secondary); font-size: 1.2rem; cursor: pointer; margin-right: 1rem;">🗑️</button>
  `;
  itemsContainer.appendChild(itemDiv);
  newItemInput.value = '';
  attachItemListeners(itemDiv);
  updateItemCount();
});

// Delete item
function attachItemListeners(itemDiv) {
  const checkbox = itemDiv.querySelector('input[type="checkbox"]');
  const deleteBtn = itemDiv.querySelector('.delete-item');
  checkbox.addEventListener('click', handleCheck);
  deleteBtn.addEventListener('click', function() {
    itemDiv.remove();
    updateItemCount();
  });
}

// Attach listeners to initial items
Array.from(document.querySelectorAll('.item')).forEach(attachItemListeners);

// Initialize theme from localStorage
if (localStorage.getItem('theme') === 'dark') {
  html.classList.add('dark-mode');
}

// Event listeners
selectAllBtn.addEventListener('click', selectAll);
themeToggle.addEventListener('click', toggleTheme);

// Initial count update
updateItemCount(); 