var DateUtil = {
  getDefault: function (type) {
    var today = new Date();
    var day = today.getDate();

    if (type === 'Check out') {
      today.setDate(day + 1);
      day = today.getDate();
    }

    var month = today.getMonth() + 1; //January is 0
    var year = today.getFullYear();

    if (day < 10) {
      day = '0' + day;
    }

    if (month < 10) {
        month = '0' + month;
    }

    return (year + '-' + month + '-' + day);
  }
};

var SearchUtil = {
  createGoogleAutocomplete: function (elementId) {
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(37.54025472421631, -122.6264275146484),
      new google.maps.LatLng(37.97454774677482, -122.2487724853516)
    );

    var options = {bounds: defaultBounds},
        searchField =  document.getElementById(elementId);

    return(
      new google.maps.places.Autocomplete(searchField, options)
    )
  },

  extractPlace: function (options) {

    if (options.place && options.place.geometry) {
      options.placeDefined(options.place);
    } else {
      var searchField =  document.getElementById(options.elementId),
          service = new google.maps.places.AutocompleteService();
      this.placeService = new google.maps.places.PlacesService(searchField);

      service.getPlacePredictions(
        {input: searchField.value},
        options.placeUndefined.bind(this)
        // this.selectFirstPrediction.bind(this)
      );
    }
  }

  // selectFirstPrediction: function (predictions) {
  //   var predictionId = predictions[0].place_id;
  //   // console.log('inside selectFirstPrediction, predictions:')
  //   // console.log(predictions)
  //   var prediction = ""
  //   // console.log(this)
  //   this.placeService.getDetails(
  //     {placeId: predictionId},
  //     function (prediction) {
  //       console.log(predication)
  //     }
  //   );
  // },
}
