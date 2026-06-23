const items = [];
let nextId = 1;

const pacificTimeEl = document.getElementById("pacific-time");
const totalLeftoverEl = document.getElementById("total-leftover");
const leftoverValueEl = document.getElementById("leftover-value");
const addForm = document.getElementById("add-form");
const itemListEl = document.getElementById("item-list");
const emptyStateEl = document.getElementById("empty-state");

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const pacificFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

function updatePacificTime() {
  const now = new Date();
  pacificTimeEl.textContent = pacificFormatter.format(now);
  pacificTimeEl.dateTime = now.toISOString();
}

function getTotals() {
  return items.reduce(
    (acc, item) => {
      acc.quantity += item.quantity;
      acc.value += item.quantity * item.price;
      return acc;
    },
    { quantity: 0, value: 0 }
  );
}

function updateSummaryCards() {
  const { quantity, value } = getTotals();
  totalLeftoverEl.textContent = quantity;
  leftoverValueEl.textContent = currencyFormatter.format(value);
}

function renderItemList() {
  itemListEl.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");

    const info = document.createElement("div");
    info.className = "item-info";

    const name = document.createElement("p");
    name.className = "item-name";
    name.textContent = item.name;

    const meta = document.createElement("p");
    meta.className = "item-meta";
    meta.textContent = `Qty: ${item.quantity} · ${currencyFormatter.format(item.price)} each · ${currencyFormatter.format(item.quantity * item.price)} total`;

    info.append(name, meta);

    const actions = document.createElement("div");
    actions.className = "item-actions";

    const useBtn = document.createElement("button");
    useBtn.type = "button";
    useBtn.className = "btn-use";
    useBtn.textContent = "Use";
    useBtn.disabled = item.quantity <= 0;
    useBtn.addEventListener("click", () => useItem(item.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn-delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteItem(item.id));

    actions.append(useBtn, deleteBtn);
    li.append(info, actions);
    itemListEl.appendChild(li);
  });

  emptyStateEl.classList.toggle("hidden", items.length > 0);
  updateSummaryCards();
}

function addItem(name, quantity, price) {
  items.push({ id: nextId++, name, quantity, price });
  renderItemList();
}

function deleteItem(id) {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return;
  items.splice(index, 1);
  renderItemList();
}

function useItem(id) {
  const item = items.find((entry) => entry.id === id);
  if (!item || item.quantity <= 0) return;
  item.quantity -= 1;
  renderItemList();
}

addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("item-name").value.trim();
  const quantity = parseInt(document.getElementById("item-quantity").value, 10);
  const price = parseFloat(document.getElementById("item-price").value);

  if (!name || Number.isNaN(quantity) || quantity < 1 || Number.isNaN(price) || price < 0) {
    return;
  }

  addItem(name, quantity, price);
  addForm.reset();
  document.getElementById("item-quantity").value = "1";
});

updatePacificTime();
setInterval(updatePacificTime, 1000);
renderItemList();
