[
  .[] | with_entries(select( .key != "" )) |
  {
    backstory: ."Backstory / notes",
    contactPerson: ."CF point of contact",
    contactNotes: ."Contact Notes",
    contactPriority: (."Invite" != ""),
    contactInterested: (."Is interested in being involved" == "TRUE"),
    contactInitiated:  (."has been contacted" == "TRUE"),
    fridgeOpen:  (."is open" == "TRUE"),
    fridgeName: ."fridge name",
    address: ((.address | rtrimstr("\n")) + ", New York, NY"),
    fridgeNotes: ."addtional information",
  }
]
| [to_entries | .[] | .["id"] = (.key + 1000) | . + .value | del(.value,.key)]
