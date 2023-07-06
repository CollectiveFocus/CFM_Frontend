import { render } from '@testing-library/react';
import ParagraphCard from './ParagraphCard';

describe('ParagraphCard', () => {
  const mockImg = {
    src: '/card/paragraph/pearTomatoAndFridge.svg',
    alt: 'Mock image',
    width: 125,
    height: 95,
  };
  const mockTitle = 'Mock Title';
  const mockText = 'Mock Text';
  const mockLink = '/mock-link';

  it('renders correctly with variant h2', () => {
    const { getByText, getByAltText, getAllByText } = render(
      <ParagraphCard
        variant="h2"
        img={mockImg}
        title={mockTitle}
        text={mockText}
        link={mockLink}
      />
    );
    // the image is rendered with the correct alt text
    expect(getByAltText('Mock image')).toBeInTheDocument();

    //  both title elements are rendered with the correct text
    const titleElements = getAllByText('Mock Title');
    expect(titleElements.length).toBe(2); // Ensure there are two titles
    titleElements.forEach((element) => {
      expect(element).toBeInTheDocument();
      expect(element.tagName.toLowerCase()).toBe('h2');
    });

    // the text is rendered with the correct content
    expect(getByText('Mock Text')).toBeInTheDocument();

    // the learn more button is rendered
    const learnMoreButton = getByText('LEARN MORE');
    expect(learnMoreButton).toBeInTheDocument();

    // the learn more button has the correct link and aria-label
    expect(learnMoreButton).toHaveAttribute('href', '/mock-link');
    expect(learnMoreButton).toHaveAttribute('aria-label', 'Mock Title');
  });

  it('renders correctly with variant h3', () => {
    const { getByText, getByAltText } = render(
      <ParagraphCard
        variant="h3"
        img={mockImg}
        title={mockTitle}
        text={mockText}
        link={mockLink}
      />
    );
    // the image is rendered with the correct alt text
    expect(getByAltText('Mock image')).toBeInTheDocument();

    // the title is rendered with the correct text
    const titleElements = getByText('Mock Title');
    expect(titleElements).toBeInTheDocument();
    expect(titleElements.tagName.toLowerCase()).toBe('h3');

    // the text is rendered with the correct content
    expect(getByText('Mock Text')).toBeInTheDocument();

    // the learn more button is rendered
    const learnMoreButton = getByText('LEARN MORE');
    expect(learnMoreButton).toBeInTheDocument();

    // the learn more button has the correct link and aria-label
    expect(learnMoreButton).toHaveAttribute('href', '/mock-link');
    expect(learnMoreButton).toHaveAttribute('aria-label', 'Mock Title');
  });
});
