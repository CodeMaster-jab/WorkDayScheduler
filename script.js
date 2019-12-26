/* eslint-disable func-names */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-plusplus */
var dataTemp = [];
const dataHour = {
  hour: 24,
  text: '',
};
const currDate = moment().format('dddd, MMMM Do YYYY');
$('#currentDay').html(currDate);

function getCurrentHour() {
  const dt = new Date();
  const hour = dt.getHours();
  return hour;
}
const currHour = getCurrentHour();

// Set the Colors for Past, Present, and Future hours
$('.hour').each(function () {
  const lblHour = $(this).text();
  var hour = lblHour.split(':')[0];
  if (+hour === currHour) {
    $(this).siblings('textarea').first().addClass('present');
  } else if (+hour < currHour) {
    $(this).siblings('textarea').first().addClass('past');
  } else {
    $(this).siblings('textarea').first().addClass('future');
  }
});

function saveText(hour, text) {
  const dt = new Date();
  const name = `cal${dt.getFullYear().toString()}${(dt.getMonth() + 1).toString()}${dt.getDate().toString()}`;
  var data = JSON.parse(localStorage.getItem(name));
  // If no Storage Variable exists, then create one
  if (data === null || data === undefined) {
    data = dataTemp;
    const Hour = dataHour;
    Hour.hour = hour;
    Hour.text = text;
    data[0] = Hour;
    localStorage.setItem(name, JSON.stringify(data));
  } else {
    var found = false;
    // Look for the Hour in the data array
    for (let i = 0; i < data.length; i++) {
      if (data[i].hour === hour) {
        found = true;
        data[i].text = text;
        localStorage.setItem(name, JSON.stringify(data));
        break;
      }
    }
    // If the Hour is not found then add it
    if (!found) {
      const Hour = dataHour;
      Hour.hour = hour;
      Hour.text = text;
      data.push(Hour);
      localStorage.setItem(name, JSON.stringify(data));
    }
  }
}
function loadText() {
  const dt = new Date();
  const name = `cal${dt.getFullYear().toString()}${(dt.getMonth() + 1).toString()}${dt.getDate().toString()}`;
  var data = JSON.parse(localStorage.getItem(name));
  if (data !== null && data !== undefined) {
    for (let i = 0; i < data.length; i++) {
      $('.hour').each(function () {
        const lblHour = $(this).text();
        var hour = lblHour.split(':')[0];
        if (data[i].hour === +hour) {
          $(this).siblings('textarea').first().val(data[i].text);
        }
      });
    }
  }
}
$('.saveBtn').click(function () {
  const lblHour = $(this).siblings('label').first().text();
  var hour = lblHour.split(':')[0];
  const text = $(this).siblings('textarea').first().val();
  saveText(+hour, text);
});

loadText();
