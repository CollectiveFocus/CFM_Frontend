import { render } from '@testing-library/react';
import PamphletParagraph from './PamphletParagraph';

const mockTitle = 'Mock Title';
const mockVariant = 'h2';
const mockImg = {
  src: '/paragraph/pamphlet/about/independence_for_each_fridge.webp',
  alt: 'Mock image',
  width: 414,
  height: 276,
};
const mockBody = ['Paragraph 1', 'Paragraph 2'];
const mockButton = {
  variant: 'contained',
  to: '/path',
  'aria-label': 'Button',
  title: 'Click Me',
};

describe('PamphletParagraph', () => {
  it('renders correctly with all props', () => {
    const { getByText, getByAltText } = render(
      <PamphletParagraph
        title={mockTitle}
        variant={mockVariant}
        img={mockImg}
        body={mockBody}
        button={mockButton}
        hasDivider={true}
      />
    );

    // the title is rendered with the correct text and variant
    expect(getByText('Mock Title')).toBeInTheDocument();
    expect(getByText('Mock Title')).toHaveProperty('tagName', 'H2');

    //  the image is rendered with the correct alt text
    expect(getByAltText('Mock image')).toBeInTheDocument();

    // the paragraphs are rendered with the correct text
    expect(getByText('Paragraph 1')).toBeInTheDocument();
    expect(getByText('Paragraph 2')).toBeInTheDocument();

    // the button is rendered with the correct text, variant, and aria-label
    const button = getByText('Click Me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Button');
  });

  it('renders correctly without optional props', () => {
    const { queryByAltText, queryByText, getByText } = render(
      <PamphletParagraph title={mockTitle} variant={mockVariant} />
    );

    // the title is rendered with the correct text and variant
    expect(getByText('Mock Title')).toBeInTheDocument();

    // the image is not rendered
    expect(queryByAltText('Mock image')).toBeNull();

    // the paragraphs are not rendered
    expect(queryByText('Paragraph 1')).toBeNull();
    expect(queryByText('Paragraph 2')).toBeNull();

    //  the button is not rendered
    expect(queryByText('Click Me')).toBeNull();
  });
});
