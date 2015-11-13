var ListingsList = React.createClass({
  getInitialState: function () {
    return {listings: []};
  },

  componentDidMount: function () {
    SearchStore.addListingsChangeListener(this._onListingsChange);
  },

  componentWillUnmount: function () {
    SearchStore.removeListingsChangeListener(this._onListingsChange);
  },

  _onListingsChange: function () {
    var listings = SearchStore.getListings();
    this.setState({listings: listings});
  },

  render: function () {
    return(
      <div className='listings-list clearfix'>
        {
          this.state.listings.map( function (listing) {
            return <ListingBlock key={listing.id} listing={listing} />;
          })
        }
      </div>
    );

  }
});
