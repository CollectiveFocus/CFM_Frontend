const rxPunctuationAndDigits = /[.,\/#!$%\^&\*;:{}=\-_`~()\'\d]/g;

export function WordRank(sentences, excludedWords) {
  const words = sentences
    .join(' ')
    .replaceAll(rxPunctuationAndDigits, '')
    .split(/\s/)
    .map((word) => word.toLowerCase())
    .filter((word) => word.length > 2)
    .filter((word) => !excludedWords.includes(word));

  const wordCounts = {};
  words.forEach((word) => (wordCounts[word] = 1 + (wordCounts[word] ?? 0)));
  return wordCounts;
}

export function GroupByDistance(delta, distanceList) {
  const groups = {};
  distanceList.forEach(({ fridgeId, distance }) => {
    const myGroup = Math.floor(distance / delta);

    if (groups[myGroup]) {
      groups[myGroup] = groups[myGroup].concat(fridgeId);
    } else {
      groups[myGroup] = [fridgeId];
    }
  });

  return Object.keys(groups).map((key) => groups[key]);
}
