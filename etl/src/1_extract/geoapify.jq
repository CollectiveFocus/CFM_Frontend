[
.[] |
{
  id: .id | tonumber,
  locationName: .name,
  locationStreet: (.housenumber + " " + .street),
  locationCity: .city,
  locationState: .state_code,
  locationZip: .postcode,
  locationGeoLat: .lat | tonumber,
  locationGeoLng: .lon | tonumber,
}
]
