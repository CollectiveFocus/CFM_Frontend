[
  .[] | map_values( if . == "TRUE" then true
                    elif . == "FALSE" then false
                    else .
                    end)  |
  {
    contactPriority: .priorityInvite,
    fridgeName: ."fridge name",
    address: ((.address | rtrimstr("\n")) + ", " + ."city state zip"),
    hours: .hours,
    hasFreezer: .freezer ,
    maintainerScratchPad: .link,
    infoRules: .rules,
    infoScratchPad: .information,
    infoDonation: .donation,
    imageURL: .imageURL,
    searchBorough: .borough,
    searchNeighborhood: .neighborhood
  }
]
| [to_entries | .[] | .["id"] = (.key + 1000) | . + .value | del(.value,.key)]
