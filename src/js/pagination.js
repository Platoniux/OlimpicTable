;(function() {
  'use strict';

  const table = document.querySelector('.js-medals-table');
  const allRows = table.tBodies[0].rows;
  const inputRowsPerPage = document.querySelector('.js-show__input');
  const positions = document.querySelectorAll('.js-position');
  const pagerList = document.querySelector('.js-pager__list');
  const prevPage = document.querySelector('.js-pager__prev');
  const nextPage = document.querySelector('.js-pager__next');
  const from = document.querySelector('.js-number-of-rows-from');
  const to = document.querySelector('.js-number-of-rows-to');
  const loadPage = new Event('DOMContentLoaded');

  [].forEach.call(positions, (item, i) => { item.innerHTML = i + 1; });

  let pagination = {
    currentPage: 1,
    numberOfPages: 0,
    step: 1,

    setNumberOfPage: function(arrOfRows) {
      this.numberOfPages = Math.ceil(arrOfRows.length / this.showingRows);
    },

    add: function(s, f) {
        for (var i = s; i < f; i++) {
          let anchorToPage = document.createElement('a');
          let listItem = document.createElement('li');
          anchorToPage.className = 'js-pager__page';
          anchorToPage.innerHTML = i;
          listItem.className = 'js-pager__list-item';
          listItem.appendChild(anchorToPage);
          this.pagintatorBody.appendChild(listItem);
        }
    },

    last: function() {
      let lastListItem = document.createElement('li');
      let ellipsis = document.createElement('li');
      let lastAnchor = document.createElement('a');
      lastAnchor.innerHTML = this.numberOfPages;
      lastAnchor.className = 'js-pager__page';
      lastListItem.appendChild(lastAnchor);
      ellipsis.innerHTML = '...';
      lastListItem.className = ellipsis.className = 'js-pager__list-item';
      this.pagintatorBody.appendChild(ellipsis);
      this.pagintatorBody.appendChild(lastListItem);
    },

    first: function() {
      let firstListItem = document.createElement('li');
      let ellipsis = document.createElement('li');
      let firstAnchor = document.createElement('a');
      firstAnchor.innerHTML = '1';
      firstAnchor.className = 'js-pager__page';
      firstListItem.appendChild(firstAnchor);
      ellipsis.innerHTML = '...';
      firstListItem.className = ellipsis.className = 'js-pager__list-item';
      this.pagintatorBody.appendChild(firstListItem);
      this.pagintatorBody.appendChild(ellipsis);
    },

    bind: function() {
      var a = this.pagintatorBody.getElementsByTagName('a');
      for (var i = 0; i < a.length; i++) {
        if (+a[i].innerHTML === this.currentPage) a[i].classList.toggle('js-pager__page--current');
        a[i].addEventListener('click', pagination.click, false);
      }
    },

    click: function(event) {
      event.preventDefault();
      pagination.currentPage = +this.innerHTML;
      pagination.start();
    },

    prev: function(event) {
      event.preventDefault();
      pagination.currentPage--;
      if (pagination.currentPage < 1) {
        pagination.currentPage = 1;
      }
      pagination.start();
    },

    next: function(event) {
      event.preventDefault();
      pagination.currentPage++;
      if (pagination.currentPage > pagination.numberOfPages) {
          pagination.currentPage = pagination.numberOfPages;
      }
      pagination.start();
    },

    buttons: function(pr, nx) {
      pr.addEventListener('click', pagination.prev, false);
      nx.addEventListener('click', pagination.next, false);
    },

    deactivateBtn: function() {
      this.btnPrev.classList.remove('js-visibility');
      this.btnNext.classList.remove('js-visibility');
      if (this.currentPage === 1) {
        this.btnPrev.classList.add('js-visibility');
      } else if (this.currentPage === this.numberOfPages) {
        this.btnNext.classList.add('js-visibility');
      }
    },

    counters: function() {
      this.secondIndex = this.showingRows * this.currentPage;
      this.firstIndex = this.secondIndex - (this.showingRows - 1);
      this.countFrom.innerHTML = this.firstIndex;
      this.countTo.innerHTML = this.secondIndex;
    },

    showMeRows: function() {
      [].forEach.call(this.rows, (item, i) => {
        if ((this.firstIndex - 1) <= i && i <= (this.secondIndex - 1)) {
          item.classList.remove('js-display-none');
          return;
        }
        item.classList.add('js-display-none');
      });
    },

    start: function() {
      this.pagintatorBody.innerHTML = '';
      if (this.numberOfPages < this.step * 2 + 6) {
        this.add(1, this.numberOfPages + 1);
      } else if (this.currentPage < this.step * 2 + 2) {
        this.add(1, this.step * 2 + 4);
        this.last();
      } else if (this.currentPage > this.numberOfPages - this.step * 2 - 1) {
        this.first();
        this.add(this.numberOfPages - this.step * 2 - 2, this.numberOfPages + 1);
      } else {
        this.first();
        this.add(this.currentPage - this.step, this.currentPage + this.step + 1);
        this.last();
      }
      this.bind();
      this.counters();
      this.deactivateBtn();
      this.showMeRows();
    },

    init: function(
      element,
      prev,
      next,
      arr,
      amountOfRows,
      counterFrom,
      counterTo
      ) {
      pagination.pagintatorBody = element;
      pagination.showingRows = amountOfRows;
      pagination.countFrom = counterFrom;
      pagination.countTo = counterTo;
      pagination.rows = arr;
      pagination.btnNext = next;
      pagination.btnPrev = prev;
      pagination.setNumberOfPage(arr);
      pagination.buttons(prev, next);
      pagination.start();
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    pagination.init(pagerList, prevPage, nextPage, allRows, inputRowsPerPage.value, from, to);
  });


  inputRowsPerPage.addEventListener('input', function(e) {
    getNumberOfShowingRows(e, pagination);
    document.dispatchEvent(loadPage);
  });


  function getNumberOfShowingRows(event, obj) {
    obj.showingRows = event.target.value;
  }
}());






