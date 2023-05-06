import PropTypes from 'prop-types';

/**
 * Text and HTML formatting.
 * @module lib/format
 */

const isOdd = (x) => x % 2 === 1;

/**
 * Soft wrap every sentence so it wraps at the period and not in the middle.
 * @param paragraph Sentences seperated by punctuation such as ".!?:;" and others used by foreign languages
 */
const regxSentence = /(\p{Terminal_Punctuation})/gu;
const shortSentenceLength = 5;
export function SoftWrap(paragraph) {
  const chunks = paragraph.split(regxSentence);

  if (isOdd(chunks.length)) {
    chunks.push('');
  }

  let sentence = '';
  const lines = [];
  for (let ix = 0; ix < chunks.length; ix += 2) {
    sentence += chunks[ix] + chunks[ix + 1];
    if (sentence.length > shortSentenceLength) {
      lines.push(sentence);
      sentence = '';
    }
  }

  // the last sentence goes on a line regardless of length
  if (sentence !== '') {
    lines.push(sentence);
  }

  return lines.length === 1
    ? lines[0]
    : lines.map((line, ix) => (
        <span
          key={`${ix}_SoftWrap`}
          style={{ display: 'inline-block', margin: 0, padding: 0 }}
          data-testid="span"
        >
          {line}
        </span>
      ));
}
SoftWrap.propTypes = {
  paragraph: PropTypes.string.isRequired,
};
