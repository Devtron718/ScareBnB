json.listing do
  json.toe_nails @listing.toe_nails
  json.ghost_id @listing.ghost_id
  json.amenities @listing.amenities
  json.description @listing.description
  json.address @listing.address
  json.title @listing.title
  json.user_picture(@listing.ghost_picture, :url)
  json.pictures(@listing.pictures) do |picture|
    json.(picture, :url)
  end
end

# add reservations
