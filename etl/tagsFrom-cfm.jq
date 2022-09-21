[
  .[] |
  {
    id,
    freezer: (.data | .[] | select(."-name" == "Has a freezer").value )
  }
]
