let date = new Date();

const renderCalendar = () => {
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  document.querySelector('.year-month').innerHTML = `${viewYear}년 ${
    viewMonth + 1
  }월`;

  const prevLast = new Date(viewYear, viewMonth, 0); //지난달 마지막 날
  const thisLast = new Date(viewYear, viewMonth + 1, 0); //이번달 마지막 날

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay(); //getDay()는 일요일부터 0

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  // prevDate, thisDates, nextDates 를 concat함
  const dates = prevDates.concat(thisDates, nextDates);

  const firstDateIndex = dates.indexOf(1); //indexOf로 찾는 문자열이 없으면 -1을 return.
  const lastDateIndex = dates.lastIndexOf(TLDate);
  dates.forEach((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other';
    dates[
      i
    ] = `<div class="date"><span class="${condition}">${date}</span></div>`;
  });
  document.querySelector('.dates').innerHTML = dates.join('');

  //today date
  const today = new Date();
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll('.this')) {
      if (+date.innerText === today.getDate()) {
        date.classList.add('today');
        break;
      }
    }
  }
};
renderCalendar();

const prevBtn = document.querySelector('.go-prev');
const nextBtn = document.querySelector('.go-next');
const todayBtn = document.querySelector('.go-today');

prevBtn.addEventListener('click', () => {
  date.setDate(1);
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});
nextBtn.addEventListener('click', () => {
  date.setDate(1);

  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});
todayBtn.addEventListener('click', () => {
  date = new Date();
  renderCalendar();
});
