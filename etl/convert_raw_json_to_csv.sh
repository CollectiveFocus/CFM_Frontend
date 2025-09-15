for i in {1..12}
do
  dasel -f input/addressRaw_part$i.json -r json -w csv > input/addressRaw_part$i.csv
done
