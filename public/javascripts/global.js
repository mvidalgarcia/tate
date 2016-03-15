
// DOM Ready =============================================================
$(document).ready(function() {
    $('#btnSearch').on('click', filterArtists);

    $('#artworks').on('click', 'button#btnPagination', loadArtworks)

    $('#btnSearchArtworks').on('click', filterArtworks);
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

  // Set different query uri depending on if we are filtering
  var query_uri = '';
  if ($('button#btnPagination').data('from') && $('button#btnPagination').data('to')) {
    // Filtering query
    var from_year = $('button#btnPagination').data('from');
    var to_year = $('button#btnPagination').data('to');
    query_uri = '/artworks/api/from/'+from_year+'/to/'+to_year+'?limit=100&lastid='+last_id;
  }
  else {
    query_uri = '/artworks/api?limit=100&lastid='+last_id;
  }

  // Request more artworks
  $.getJSON( query_uri, function( data ) {
    $.each(data, function(){
          content += '<li><a href="/artwork/'+ this.id+ '">' + this.title + ' ' + this.acquisitionYear + '</a></li>'
    });
    // Inject the whole content string into existing HTML list
    $('#artworks ul').append(content);

    if (data.length == 0) {
      $('button#btnPagination').hide();
      $('body').append("No more results");
    }
    else {
      // Update last id data-attribute in button
      last_id = data[data.length-1].id;
      $('button#btnPagination').data('lastid', last_id);
    }
  });
};


// Filter Artworks by acquisition year
function filterArtworks(event) {

    event.preventDefault();

    // Empty content string
    var content = '';

    var from_year = $('input#inputFromArtworks').val(),
        to_year = $('input#inputToArtworks').val();

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
        // Request artworks filtered by acquisition year to local REST API.
        $.getJSON( '/artworks/api/from/'+from_year+'/to/'+to_year+'?limit=100&lastid=0', function( data ) {
          $.each(data, function(){
              content += '<li><a href="/artwork/'+ this.id+ '">' + this.title + ' ' + this.acquisitionYear + '</a></li>'
          });
          // Replace current content with the whole content string
          $('#artworks ul').html(content);

          // Update last id data-attribute in button
          last_id = data[data.length-1].id;
          $('button#btnPagination').data('lastid', last_id);

          // Add new data-attribute's in order to know whether we are filtering results by acquisition year or not.
          $('button#btnPagination').data('from', from_year);
          $('button#btnPagination').data('to', to_year);
        });
      }
    }
};
