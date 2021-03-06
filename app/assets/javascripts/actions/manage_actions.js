( function (root) {
  var ManageActions = root.ManageActions = {

    getUserInfo: function () {
      $.ajax({
        url: '/api/user.json',
        method: 'GET',
        success: function (userInfo) {
          ManageActions.dispatchUser(userInfo);
        }
      });
    },

    addUserPic: function (url) {
      $.ajax({
        url: '/api/picture.json',
        method: 'POST',
        data: url,
        success: function () {
          SearchActions.fetchUserPic();
        }
      });
    },

    deleteListing: function (options) {
      $.ajax({
        url: '/api/listings/' + options.listingId + '.json',
        method: 'DELETE',
        success: function () {
          sweetAlert({
            title: "Lock the doors! Close the blinds!",
            text: "You've deleted your haunted listing.",
            type: "success",
            allowOutsideClick: true,
            confirmButtonColor: "#ff4d4d",
            confirmButtonText: "Ok"
          })
          ManageActions.getUserInfo();
        }
      });
    },

    createListing: function (listingAttrs) {
      $.ajax({
        url: '/api/listings',
        method: 'POST',
        dataType: "json",
        data: listingAttrs,
        success: function () {
          sweetAlert({
            title: "You've created your haunted residence",
            text: "Unsuspecting guests should be coming soon.",
            type: "success",
            allowOutsideClick: true,
            confirmButtonColor: "#ff4d4d",
            confirmButtonText: "Perfect..."
          })
          ManageActions.getUserInfo(listingAttrs.ghost_id);
        },
        error: function (xhr) {
          sweetAlert({
            title: "Somethings not right...",
            text: xhr.jsonText.errors[0],
            type: "error",
            allowOutsideClick: true,
            confirmButtonColor: "#ff4d4d",
            confirmButtonText: "Ok"
          })
        }
      });
    },

    createReservation: function (reservationDetails) {
      reservationDetails.check_in = reservationDetails.checkIn || DateUtil.getDefault("checkIn")
      reservationDetails.check_out = reservationDetails.checkOut || DateUtil.getDefault("checkOut")
      reservationDetails.listing_id = reservationDetails.listingId

      $.ajax({
        url: '/api/reservations',
        method: 'POST',
        dataType: "json",
        data: reservationDetails,
        success: function (reservation) {
          sweetAlert({
            title: "How brave of you",
            text: "You've successfully reserved a very haunted stay",
            type: "success",
            allowOutsideClick: true,
            confirmButtonColor: "#ff4d4d",
            confirmButtonText: "Ok"
          })
        },
        error: function (xhr, text, errorThrown) {

          sweetAlert({
            title: "Ahhh!",
            text: "Sorry, those " + xhr.responseJSON.errors[0].toLowerCase(),
            type: "error",
            allowOutsideClick: true,
            confirmButtonColor: "#ff4d4d",
            confirmButtonText: "Let me try again"
          })
        }
      });
    },

    deleteReservation: function (options) {
      $.ajax({
        url: '/api/reservations/' + options.reservationId,
        method: 'DELETE',
        success: function () {
          sweetAlert({
            title: "See you next time then",
            text: "",
            type: "success",
            allowOutsideClick: true,
            confirmButtonColor: "#ff4d4d",
            confirmButtonText: "Ok"
          })
          ManageActions.getUserInfo(options.guestId);
        },
        error: function (xhr) {
          sweetAlert({
            title: "Uh oh...",
            text: xhr.responseJSON.errors[0],
            type: "error",
            allowOutsideClick: true,
            confirmButtonColor: "#ff4d4d",
            confirmButtonText: "Let me try again"
          })
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
