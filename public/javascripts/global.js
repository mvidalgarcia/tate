
// DOM Ready =============================================================
$(document).ready(function() {
    $('#btnSearch').on('click', filterArtists);

    $('#artworks').on('click', 'button#btnPagination', loadArtworks)
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

/*
  Load more artwork (pagination) via AJAX
*/
function loadArtworks(event) {
  event.preventDefault();
  // Empty content string
  var content = '';

  // Retrieve last artwork id from data-attribute
  var last_id = $('button#btnPagination').data('lastid');

  // Request more artworks
  $.getJSON( '/artworks/api?limit=100&lastid='+last_id, function( data ) {
    $.each(data, function(){
          content += '<li>' + this.title + '</li>'
    });
    // Inject the whole content string into existing HTML list
    $('#artworks ul').append(content);

    // Update last id data-attribute in button
    last_id = data[data.length-1].id;
    $('button#btnPagination').data('lastid', last_id);
  });
};
