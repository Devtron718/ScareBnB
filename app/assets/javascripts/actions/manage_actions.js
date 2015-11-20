( function (root) {
  var ManageActions = root.ManageActions = {

    getUserInfo: function (id) {
      $.ajax({
        url: '/api/users/' + id + '.json',
        method: 'GET',
        data: id,
        success: function (userInfo) {
          console.log('successful user info ajax');
          console.log(userInfo);
          ManageActions.dispatchUser(userInfo);
        }
      });
    },

    deleteListing: function (options) {
      $.ajax({
        url: '/api/listings/' + options.listingId + '.json',
        method: 'DELETE',
        data: options.listingId,
        success: function () {
          console.log('successful listing delete ajax');
          ManageActions.getUserInfo(options.userId);
        }
      });
    },

    createListing: function (listingAttrs) {
      console.log('in manage actions')
      console.log(listingAttrs)
      $.ajax({
        url: '/api/listings',
        method: 'POST',
        dataType: "json",
        data: listingAttrs,
        success: function () {
          console.log('successful listing create ajax');
          ManageActions.getUserInfo(listingAttrs.ghost_id);
        }
      });
    },

    createReservation: function (reservationDetails) {
      reservationDetails.check_in = reservationDetails.checkIn || DateUtil.getDefault("checkIn")
      reservationDetails.check_out = reservationDetails.checkOut || DateUtil.getDefault("checkOut")
      reservationDetails.listing_id = reservationDetails.listingId
      reservationDetails.guest_id = 2


      console.log('in createreservation')
      console.log(reservationDetails)

      $.ajax({
        url: '/api/reservations',
        method: 'POST',
        dataType: "json",
        data: reservationDetails,
        success: function (reservation) {
          console.log('successful reservation create ajax');
          console.log(reservation)
        }
      });
    },

    dispatchListingUpdate: function (listings) {
      Dispatcher.dispatch({
        actionType: 'delete_listing',
        listings: listings
      });
    },

    dispatchUser: function (userInfo) {
      Dispatcher.dispatch({
        actionType: 'get_user',
        userInfo: userInfo
      });
    }
  };
})(this);
