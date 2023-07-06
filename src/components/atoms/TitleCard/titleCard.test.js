import { render } from '@testing-library/react';
import TitleCard from './TitleCard';

describe('TitleCard', () => {
  const mockImg = {
    src: '/hero/get-involved.webp',
    alt: 'Mock image',
  };
  const mockTitle = 'Mock Title';
  const mockLink = '/mock-link';

  it('renders TitleCard correctly', () => {
    const { getByText, getByAltText, getByLabelText } = render(
      <TitleCard img={mockImg} title={mockTitle} link={mockLink} />
    );

    // the image is rendered with the correct alt text
    expect(getByAltText('Mock image')).toBeInTheDocument();

    // the title is rendered with the correct text
    expect(getByText('Mock Title')).toBeInTheDocument();

    //  the link is rendered with the correct href and aria-label
    const linkElement = getByLabelText('Mock Title');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/mock-link');
  });
});
