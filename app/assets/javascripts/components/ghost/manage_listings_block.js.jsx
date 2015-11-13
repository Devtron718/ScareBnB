var ManageListingsBlock = React.createClass({
  handleListingDelete: function () {
    ManageActions.deleteListing({
      userId: this.props.listing.ghost_id,
      listingId: this.props.listing.id
    });
  },

  render: function () {
    var listing = this.props.listing;
    var sep = ", ";
    return (
      <div className='manage-listing-block clearfix'>
        <div className='manage-listing-block-info'>
          <div>{listing.title}</div>
          <div>
            {
              listing.address + sep +
              listing.city + sep +
              listing.state
            }
          </div>
        </div>

        <div className='manage-listing-block-btns'>
          <button onClick={this.handleListingDelete} className='button' id='manage-listing-delete' >Remove</button>
        </div>
      </div>
    );
  }
});