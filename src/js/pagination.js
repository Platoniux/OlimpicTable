;(function() {
  'use strict'

  const table = document.querySelector('.js-medals-table');
  const allRows = table.tBodies[0].rows;
  const inputRowsPerPage = document.querySelector('.js-show__input');
  const positions = document.querySelectorAll('.js-position');
  const pagerList = document.querySelector('.js-pager__list');
  const prevPage = document.querySelector('.js-pager__prev');
  const nextPage = document.querySelector('.js-pager__next');
  const rowsInfoFrom = document.querySelector('.js-number-of-rows-from');
  const rowsInfoTo = document.querySelector('.js-number-of-rows-to');
  const from = document.querySelector('.js-number-of-rows-from');
  const to = document.querySelector('.js-number-of-rows-to');
  const loadPage = new Event('DOMContentLoaded');
  const onInput = new Event('input');

  [].forEach.call(positions, (item, i) => { item.innerHTML = i + 1; });

  let Pagination = {
    currentPage: 1,
    numberOfPages: 0,
    step: 1,

    SetNumberOfPage: function(arrOfRows) {
      Pagination.numberOfPages = Math.ceil(arrOfRows.length / Pagination.showingRows);
    },

    Add: function(s, f) {
        for (var i = s; i < f; i++) {
          let anchorToPage = document.createElement('a');
          let listItem = document.createElement('li');
          anchorToPage.className = 'js-pager__page';
          anchorToPage.innerHTML = i;
          listItem.className = 'js-pager__list-item';
          listItem.appendChild(anchorToPage);
          Pagination.pagintatorBody.appendChild(listItem);
        }
    },

    Last: function() {
      let lastListItem = document.createElement('li');
      let ellipsis = document.createElement('li');
      let lastAnchor = document.createElement('a');
      lastAnchor.innerHTML = Pagination.numberOfPages;
      lastAnchor.className = 'js-pager__page';
      lastListItem.appendChild(lastAnchor);
      ellipsis.innerHTML = '...';
      lastListItem.className = ellipsis.className = 'js-pager__list-item';
      Pagination.pagintatorBody.appendChild(ellipsis);
      Pagination.pagintatorBody.appendChild(lastListItem);
    },

    First: function() {
      let firstListItem = document.createElement('li');
      let ellipsis = document.createElement('li');
      let firstAnchor = document.createElement('a');
      firstAnchor.innerHTML = '1';
      firstAnchor.className = 'js-pager__page';
      firstListItem.appendChild(firstAnchor);
      ellipsis.innerHTML = '...';
      firstListItem.className = ellipsis.className = 'js-pager__list-item';
      Pagination.pagintatorBody.appendChild(firstListItem);
      Pagination.pagintatorBody.appendChild(ellipsis);
    },

    Bind: function() {
      var a = Pagination.pagintatorBody.getElementsByTagName('a');
      for (var i = 0; i < a.length; i++) {
        if (+a[i].innerHTML === Pagination.currentPage) a[i].classList.toggle('js-pager__page--current');
        a[i].addEventListener('click', Pagination.Click, false);
      }
    },

    Click: function(event) {
      event.preventDefault();
      Pagination.currentPage = +this.innerHTML;
      Pagination.Start();
    },

    Prev: function(event) {
      event.preventDefault();
      Pagination.currentPage--;
      if (Pagination.currentPage < 1) {
        Pagination.currentPage = 1;
      }
      Pagination.Start();
    },

    Next: function(event) {
      event.preventDefault();
      Pagination.currentPage++;
      if (Pagination.currentPage > Pagination.numberOfPages) {
          Pagination.currentPage = Pagination.numberOfPages;
      }
      Pagination.Start();
    },

    Buttons: function(pr, nx) {
      pr.addEventListener('click', Pagination.Prev, false);
      nx.addEventListener('click', Pagination.Next, false);
    },

    DeactivateBtn: function() {
      Pagination.btnPrev.classList.remove('js-visibility');
      Pagination.btnNext.classList.remove('js-visibility');
      if (Pagination.currentPage === 1) {
        Pagination.btnPrev.classList.add('js-visibility');
      } else if (Pagination.currentPage === Pagination.numberOfPages) {
        Pagination.btnNext.classList.add('js-visibility');
      }
    },

    Counters: function() {
      Pagination.secondIndex = Pagination.showingRows * Pagination.currentPage;
      Pagination.firstIndex = Pagination.secondIndex - (Pagination.showingRows - 1);
      Pagination.countFrom.innerHTML = Pagination.firstIndex;
      Pagination.countTo.innerHTML = Pagination.secondIndex;
    },

    ShowMeRows: function() {
      [].forEach.call(Pagination.rows, (item, i) => {
        if ((Pagination.firstIndex - 1) <= i && i <= (Pagination.secondIndex - 1)) {
          item.classList.remove('js-display-none');
          return;
        }
        item.classList.add('js-display-none');
      });
    },

    Start: function() {
      Pagination.pagintatorBody.innerHTML = '';
      if (Pagination.numberOfPages < Pagination.step * 2 + 6) {
        Pagination.Add(1, Pagination.numberOfPages + 1);
      } else if (Pagination.currentPage < Pagination.step * 2 + 2) {
        Pagination.Add(1, Pagination.step * 2 + 4);
        Pagination.Last();
      } else if (Pagination.currentPage > Pagination.numberOfPages - Pagination.step * 2 - 1) {
        Pagination.First();
        Pagination.Add(Pagination.numberOfPages - Pagination.step * 2 - 2, Pagination.numberOfPages + 1);
      } else {
        Pagination.First();
        Pagination.Add(Pagination.currentPage - Pagination.step, Pagination.currentPage + Pagination.step + 1);
        Pagination.Last();
      }
      Pagination.Bind();
      Pagination.Counters();
      Pagination.DeactivateBtn();
      Pagination.ShowMeRows();
    },

    Init: function(
      element,
      prev,
      next,
      arr,
      amountOfRows,
      counterFrom,
      counterTo
      ){
      Pagination.pagintatorBody = element;
      Pagination.showingRows = amountOfRows;
      Pagination.countFrom = counterFrom;
      Pagination.countTo = counterTo;
      Pagination.rows = arr;
      Pagination.btnNext = next;
      Pagination.btnPrev = prev;
      Pagination.SetNumberOfPage(arr);
      Pagination.Buttons(prev, next);
      Pagination.Start();
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    Pagination.Init(pagerList, prevPage, nextPage, allRows, inputRowsPerPage.value, from, to);
  });


  inputRowsPerPage.addEventListener('input', function(e) {
    getNumberOfShowingRows(e, Pagination);
    document.dispatchEvent(loadPage);
  });


  function getNumberOfShowingRows(event, obj) {
    obj.showingRows = event.target.value;
  }
}());






