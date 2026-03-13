import React from 'react';
import { render, screen } from '@testing-library/react';
import { PamphletParagraph } from './PamphletParagraph';

const mockTitle = 'Mock Title';
const mockVariant = 'h2' as const;
const mockImg = {
  src: '/paragraph/pamphlet/about/independence_for_each_fridge.webp',
  alt: 'Mock image',
  width: 414,
  height: 276,
};
const mockBody = ['Paragraph 1', 'Paragraph 2'];
const mockButton = {
  variant: 'contained' as const,
  to: '/path',
  'aria-label': 'Button',
  title: 'Click Me',
};

describe('PamphletParagraph', () => {
  it('renders correctly with all props', () => {
    render(
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
    expect(screen.getByText('Mock Title')).toBeInTheDocument();
    expect(screen.getByText('Mock Title')).toHaveProperty('tagName', 'H2');

    // the image is rendered with the correct alt text
    expect(screen.getByAltText('Mock image')).toBeInTheDocument();

    // the paragraphs are rendered with the correct text
    expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
    expect(screen.getByText('Paragraph 2')).toBeInTheDocument();

    // the button is rendered with the correct text and aria-label
    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Button');
  });

  it('renders correctly without optional props', () => {
    render(<PamphletParagraph title={mockTitle} variant={mockVariant} />);

    // the title is rendered
    expect(screen.getByText('Mock Title')).toBeInTheDocument();

    // no image
    expect(screen.queryByAltText('Mock image')).toBeNull();

    // no paragraphs
    expect(screen.queryByText('Paragraph 1')).toBeNull();
    expect(screen.queryByText('Paragraph 2')).toBeNull();

    // no button
    expect(screen.queryByText('Click Me')).toBeNull();
  });
});
