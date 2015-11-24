var ManageReservationsBlock = React.createClass({
  handleReservationDelete: function () {

    ManageActions.deleteReservation({
      guestId: this.props.reservation.guest_id,
      reservationId: this.props.reservation.id
    });
  },

  render: function () {
    var reservation = this.props.reservation,
        listingLink = '/listings/' + reservation.listing_details.id
    console.log('in manange rsvp')
    console.log(this.props.reservation)
    return (
      <div className='manage-category-block clearfix'>
        <div className='manage-category-block-info clearfix'>
          <div className='manage-category-block-pic'>
            <Link to={listingLink}>
              <img src={reservation.listing_pictures[0].url} height='75' />
            </Link>
          </div>

          <div>
            <div>{reservation.listing_details.title}</div>
            <div>{reservation.listing_details.address}</div>

            <div className='manage-category-dates'>
              {DateUtil.toString(reservation.check_in) + ' to ' + DateUtil.toString(reservation.check_out)}
            </div>
          </div>

        </div>

        <div className='manage-category-block-btns'>
          <button onClick={this.handleReservationDelete} className='button' id='manage-category-remove' >Remove</button>
        </div>
      </div>
    );
  }
});
