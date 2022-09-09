const rxPunctuationAndDigits = /[.,\/#!$%\^&\*;:{}=\-_`~()\'\d]/g;

function WordRank(sentences, excludedWords) {
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
