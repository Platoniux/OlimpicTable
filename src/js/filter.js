;(function() {
  'use strict';
  const filterInput = document.querySelector('.filter__input');
  const countries = document.getElementsByClassName('country');
  const table = document.getElementById('medals-table');
  const allRows = table.tBodies[0].rows;


  filterInput.addEventListener('input', function(e) {
    filter(e, countries, allRows);
  });

  function filter(event, arrOfCells, arrOfRows) {
    let value = event.target.value.toLowerCase();
    let content = [];
    [].forEach.call(arrOfCells, i => {
      content.push(i.textContent.toLowerCase());
    });
    [].forEach.call(arrOfRows, i => i.classList.remove('js-display-none'));
    if (value) {
      content.forEach((item, i) => {
        if (!(~item.indexOf(value))) {
          arrOfRows[i].classList.add('js-display-none');
        }
      });
    }
  }
}());