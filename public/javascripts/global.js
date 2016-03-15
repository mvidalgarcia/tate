/*
 * Flag to avoid continuos scroll events when reaching bottom of page.
 */
var readyToLoadArtworks = true;

// DOM Ready =============================================================
$(document).ready(function() {

    $('#btnSearch').on('click', filterArtists);

    // $('#artworks').on('click', 'button#btnPagination', loadArtworks)

    $('#btnSearchArtworks').on('click', filterArtworks);

    //Load more artists when reaching bottom of page
    $(window).scroll(function() {
      if($(window).scrollTop() + $(window).height() > $(document).height() - 100 && readyToLoadArtworks) {
          readyToLoadArtworks = false;
          loadArtworks();

      }
    });

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
  // event.preventDefault();
  // Empty content string
  var content = '<ul>';

  // Retrieve last artwork id from data-attribute
  var last_id = $('#artworks').data('lastid');

  // Set different query uri depending on if we are filtering
  var query_uri = '';
  if ($('#artworks').data('from') && $('#artworks').data('to')) {
    // Filtering query
    var from_year = $('#artworks').data('from');
    var to_year = $('#artworks').data('to');
    query_uri = '/artworks/api/from/'+from_year+'/to/'+to_year+'?limit=100&lastid='+last_id;
  }
  else {
    query_uri = '/artworks/api?limit=100&lastid='+last_id;
  }

  // Request more artworks
  $.getJSON( query_uri, function( data ) {
    $.each(data, function(){
          content += '<li><a href="/artwork/'+ this.id+ '">' + this.title + ' (' + this.acquisitionYear + ')</a></li>'
    });
    // Inject the whole content string into existing HTML list
    content += '</ul>';
    $('#artworks').append(content);

    if (data.length == 0) {
      // No need to reload if there aren't more results
      readyToLoadArtworks = true;
    }
    else {
      // Update last id data-attribute in button
      last_id = data[data.length-1].id;
      $('#artworks').data('lastid', last_id);
      // Now we are ready to load more artworks via AJAX
      readyToLoadArtworks = true;
    }

  });
};


// Filter Artworks by acquisition year
function filterArtworks(event) {

    event.preventDefault();

    // Empty content string
    var content = '<ul>';

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
              content += '<li><a href="/artwork/'+ this.id+ '">' + this.title + ' (' + this.acquisitionYear + ')</a></li>'
          });
          // Replace current content with the whole content string
          content += '</ul>';
          $('#artworks').html(content);

          // Update last id data-attribute in button
          last_id = data[data.length-1].id;
          $('#artworks').data('lastid', last_id);

          // Add new data-attribute's in order to know whether we are filtering results by acquisition year or not.
          $('#artworks').data('from', from_year);
          $('#artworks').data('to', to_year);
        });
      }
    }
};
