
// DOM Ready =============================================================
$(document).ready(function() {
    $('#btnSearch').on('click', filterArtists);
});

// Functions =============================================================

// Filter Artists by birth year
function filterArtists(event) {

    event.preventDefault();

    var from_year = $('input#inputFrom').val(),
        to_year = $('input#inputTo').val();

    /*
    * Validations in client-side
    */
    if (!Number.isInteger(parseInt(from_year)) || !Number.isInteger(parseInt(to_year))) {
      alert("Year must be an integer");
    }
    else {
      from_year = parseInt(from_year);
      to_year = parseInt(to_year);
      if (from_year > to_year) {
        alert("From year can't be less than To year");
      }
      else {
        window.location.href = "/artists/from/"+from_year+"/to/"+to_year;
      }
    }

};
