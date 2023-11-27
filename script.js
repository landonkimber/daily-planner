// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?

$(document).ready(function () {
    var newDateHeader = $('<h2>');
    newDateHeader.text(dayjs().format('MMM D, YYYY'))
    $('header').append(newDateHeader);
  
    for (i = 0; i < 16; i++) {
  
      var hour = i + 6;
      var hourId = 'hour-' + hour;
  
      var hourClass =
        dayjs().hour() > hour ? 'row time-block past' :
          dayjs().hour() < hour ? 'row time-block future' :
            'row time-block present';
  
      var newDiv = $('<div>', {
        id: hourId,
        class: hourClass
      });
      
      var hourText = hour;
      if (hourText > 11) {
        hourText = hourText - 12 + " PM";
        if (hourText == "0 PM") { hourText = "12 PM" }
      } else { hourText = hourText + " AM" }
      var newTimeDiv = $('<div>', {
        class: 'col-2 col-md-1 hour text-center py-3',
        text: hourText
      });
  
      var newTextArea = $('<textarea>', {
        class: 'col-8 col-md-10 description',
        rows: 3
      });
  
      var newButton = $('<button>', {
        class: 'btn saveBtn col-2 col-md-1',
        'aria-label': 'save'
      });
  
      var newIcon = $('<i>', {
        class: 'fas fa-save',
        'aria-hidden': true
      });
  
      newButton.append(newIcon);
      newDiv.append(newTimeDiv, newTextArea, newButton);
      $('.container-lg').append(newDiv);
  
      if (localStorage.getItem(hourId) && localStorage.getItem(hourId) != "[object Object]") {
        $(`#${hourId} textarea`).text(localStorage.getItem(hourId));
      }
    }
  
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
  
    var saveButton = $(".saveBtn");
    saveButton.click(function () {
      var parentDivId = $(this).parent().attr("id");
      var parentEl = $(this).parent()
      var textArea = $(`#${parentDivId} textarea`);
  
      localStorage.setItem(parentDivId, $(`#${parentDivId} textarea`).val());
      textArea.text(localStorage.getItem(parentDivId));
      
      var newAlertHeader = $('<h3>');
      newAlertHeader.text("New event added at "+parentEl.find('.hour').text());
      $('header').append(newAlertHeader);
    });
  });