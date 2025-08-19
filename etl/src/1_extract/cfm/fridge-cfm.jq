[
  .[] |
  {
    id,
    fridgeName: .name,
    fridgeVerified: false,
    fridgeNotes: "",

    maintainerName: "",
    maintainerEmail: "",
    maintainerOrganization: "",
    maintainerPhone: "",
    maintainerInstagram: (.data | .[] | select(."-name" == "ig handle").value ),
  }
]
