localizeTimes();

function localizeTimes() {
  document.querySelectorAll('[data-time]').forEach(element => {
    element.textContent = new Date(element.dataset.time).toLocaleString();
  });
}
