## Input

- [x] "Project": "freedge",
- [x] "Network": "freedge",
- [x] "Street address": "",
- [x] "City": "Davis",
- [x] "State / Province": "",
- [x] "Zip Code": "",
- [x] "Country": "US",
- [ ] "Main Contact (email, IG, FB, website, linktree or other)": "freedge.org",
- [ ] "Donation Rules: What food does your fridge accept / not accept (i.e produce, frozen foods, raw meats, hygiene items, other items, etc.)?": "",
- [ ] "Days/times fridge is open": "",
- [ ] "Accepts $$ donations? (include where: venmo, gofundme, etc.)": "",
- [ ] "Location type (church, storefront, etc.)": "Network",
- [ ] "Date Installed": "",
- [ ] "Details (Describe your project)": 10,
- [ ] "Image URL": "",
- [ ] "Other Contact or Links (IG, FB, website, linktree)": "",
- [ ] "Do you have a local map? (Link to Map)": "",
- [ ] "News articles (link)": "",
- [ ] "Contact Name": "",
- [ ] "Active?": "",
- [ ] "LABEL": "Network",
- [ ] "check 1": "freedgefreedge"

---

- etl_id
- etl_location
- etl_maintainer
- etl_fridge

--- enum metadata flags
input_csv_table (1 gb)
-> location_valid
-> location_invalid
-> maintainer_valid
-> maintainer_invalid
-> fridge_valid
-> fridge_invalid

## data acceptance criteria

- address (searchable)

  - contains: house number, street, city, state, zip
  - maps to a specific geographic point
  - has geoLat, geoLng
  - pretty formatted
  - no duplicates

- fridge name
  - pretty formatted
  - sensible names for fridges from the same organization
  - no duplicates
- website link is live
- instagram link is live

## FSM Process

- pretty fridge names (manual input)
- determine if field is http or instagram

- fridgeLocation:
- verified address (manual input)

  - feed into https://www.geoapify.com/tools/address-validation/ 50 lines per file

- geo codes

### FSM

[start]: read freedge csv -> attach a etl_ID to every record -> {

- "Street address": "",
- "City": "Davis",
- "State / Province": "",
- "Zip Code": "",
- "Country": "US",
  }
  -> (street + city + state) or (street + zip) ->
  \-> formatter 50 CSV lines per file -> db_intermediate_address/ [end]
  -> db_invalid_address [end]

--- manual
GeoAPI/ -> [start] list of validated address files ->
{
"original_rawAddress": "6 MetroTech Center, New York, New York 11201 United States",
"original_recId": 25,
"validation": "CONFIRMED",
"confidence": 1,
"confidence_city_level": 1,
"confidence_street_level": 1,
"confidence_building_level": 1,
"lat": 40.694542,
"lon": -73.98679075120197,
"formatted": "6 Metrotech Center, New York, NY 11201, United States of America",
"name": "",
"housenumber": 6,
"street": "Metrotech Center",
"district": "Brooklyn",
"suburb": "",
"postcode": 11201,
"city": "New York",
"county": "Kings County",
"state": "New York",
"state_code": "NY",
"country": "United States",
"country_code": "us",
"attribution": "© OpenStreetMap contributors",
"attribution_license": "Open Database License",
"attribution_url": "https://www.openstreetmap.org/copyright"
}
-> (if confidence is != 1 ) -> db_invalid_address [end]
-> map to output_fields -> db_valid_addresses [end]

--- manual fridgeName

[start]: read freedge csv -> attach a etl_ID to every record -> {

- "Project",
- "Network",
  } -> (if not null, pretty format) -> fridgeName

--- maintainer

[start]: read freedge csv -> attach a etl_ID to every record -> {
"Main Contact (email, IG, FB, website, linktree or other)": "freedge.org",
} -> yup validator
\-> (email) -> maintainerEmail
\-> (instagram) -> maintainerInstagram
\-> (http) -> maintainerWebsite

-> db_invalid_maintainer [end]

/manual find out the address name/ [start] db_valid_addresses + -> join on etl_ID: location, fridge, maintainer -> db_complete_output
/manual pretty format the fridgeName/

## Output Fields

fridge:

- [x] fridgeName
- [] fridgeTags
- [] fridgePhotoUrl
- [] fridgeNotes
- [] fridgeStatus: ['good', 'dirty', 'out of order', 'not at location', 'ghost']

location:

- locationName
- locationStreet
- locationCity
- locationState
- locationZip
- locationCountryCode
- locationGeoLat
- locationGeoLng

maintainer:

- maintainerName
- maintainerEmail
- maintainerOrganization
- maintainerPhone
- maintainerInstagram
- maintainerWebsite
