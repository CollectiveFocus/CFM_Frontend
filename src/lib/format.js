import PropTypes from 'prop-types';

/**
 * Soft wrap every sentence so it wraps at the period and not in the middle.
 * @param paragraph Sentences seperated by the delimiters: ".?!"
 */
export function SoftWrap(paragraph) {
  const result = paragraph.match(/[^\.!\?]+[\.!\?]+/g);
  const sentences = result ? result : [paragraph];

  return sentences.map((sentence, index) => (
    <span
      key={`${index}_PrettyWrapSentence`}
      style={{ display: 'inline-block', margin: 0, padding: 0 }}
    >
      &nbsp;{sentence.trimStart()}
    </span>
  ));
}
SoftWrap.propTypes = {
  paragraph: PropTypes.string.isRequired,
};
