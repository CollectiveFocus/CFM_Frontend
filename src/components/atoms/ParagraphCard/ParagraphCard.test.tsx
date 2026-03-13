import React from 'react';
import { render, screen } from '@testing-library/react';
import { ParagraphCard } from './ParagraphCard';

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
    render(
      <ParagraphCard
        variant="h2"
        img={mockImg}
        title={mockTitle}
        text={mockText}
        link={mockLink}
      />
    );
    // the image is rendered with the correct alt text
    expect(screen.getByAltText('Mock image')).toBeInTheDocument();

    // both title elements are rendered with the correct text
    const titleElements = screen.getAllByText('Mock Title');
    expect(titleElements.length).toBe(2);
    titleElements.forEach((element) => {
      expect(element).toBeInTheDocument();
      expect(element.tagName.toLowerCase()).toBe('h2');
    });

    // the text is rendered
    expect(screen.getByText('Mock Text')).toBeInTheDocument();

    // the learn more button has the correct link and aria-label
    const learnMoreButton = screen.getByText('LEARN MORE');
    expect(learnMoreButton).toBeInTheDocument();
    expect(learnMoreButton).toHaveAttribute('href', '/mock-link');
    expect(learnMoreButton).toHaveAttribute('aria-label', 'Mock Title');
  });

  it('renders correctly with variant h3', () => {
    render(
      <ParagraphCard
        variant="h3"
        img={mockImg}
        title={mockTitle}
        text={mockText}
        link={mockLink}
      />
    );
    // the image is rendered
    expect(screen.getByAltText('Mock image')).toBeInTheDocument();

    // single title with h3 tag
    const titleElement = screen.getByText('Mock Title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName.toLowerCase()).toBe('h3');

    // the text and learn more button
    expect(screen.getByText('Mock Text')).toBeInTheDocument();
    const learnMoreButton = screen.getByText('LEARN MORE');
    expect(learnMoreButton).toHaveAttribute('href', '/mock-link');
    expect(learnMoreButton).toHaveAttribute('aria-label', 'Mock Title');
  });
});
