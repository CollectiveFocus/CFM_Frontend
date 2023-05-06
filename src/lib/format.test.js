import { SoftWrap } from './format';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Does the function wrap each sentence in a paragraph with a span?', function () {
  it('Does not wrap a lone sentence with a span', function () {
    const paragraph = 'Take what you need.';
    render(SoftWrap(paragraph));

    expect(screen.queryByTestId('span')).not.toBeInTheDocument();
  });

  it('Does not wrap a lone, bulleted sentence with a span', function () {
    const paragraph = '1. Take what you need.';
    render(SoftWrap(paragraph));

    expect(screen.queryByTestId('span')).not.toBeInTheDocument();
  });

  it('Wraps Sentences ending in .!?:;。 with a span', function () {
    const paragraph =
      'Take what you need. Leave what you can: Toma lo que necesitas! Deja lo que puedas? 拿走你需要的食物。把不需要的食物留下。';
    render(SoftWrap(paragraph));

    expect(screen.getByText('Take what you need.')).toBeInTheDocument();
    expect(screen.getByText('Leave what you can:')).toBeInTheDocument();
    expect(screen.getByText('Toma lo que necesitas!')).toBeInTheDocument();
    expect(screen.getByText('Deja lo que puedas?')).toBeInTheDocument();
    expect(screen.getByText('拿走你需要的食物。')).toBeInTheDocument();
    expect(screen.getByText('把不需要的食物留下。')).toBeInTheDocument();
    expect(
      screen.queryByText('Take what you need. Leave what you can.')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        'Take what you need. Leave what you can: Toma lo que necesitas! Deja lo que puedas? 拿走你需要的食物。把不需要的食物留下。'
      )
    ).not.toBeInTheDocument();
  });

  it('Wraps correctly when the string ends without punctuation', function () {
    const paragraph =
      'Technology Empowers Us. 科技赋予我们力量。La Tecnología Nos Da Poder';
    render(SoftWrap(paragraph));

    expect(screen.getByText('Technology Empowers Us.')).toBeInTheDocument();
    expect(screen.getByText('科技赋予我们力量。')).toBeInTheDocument();
    expect(screen.getByText('La Tecnología Nos Da Poder')).toBeInTheDocument();
    expect(
      screen.queryByText('科技赋予我们力量。 La Tecnología Nos Da Poder')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        'Technology Empowers Us. 科技赋予我们力量。 La Tecnología Nos Da Poder'
      )
    ).not.toBeInTheDocument();
  });

  it('Puts numbered bullets together with the sentence that follows it', function () {
    const paragraph =
      '1. Read Best Practices. Leer Mejores Prácticas. 参与其中。';
    render(SoftWrap(paragraph));

    expect(screen.getByText('1. Read Best Practices.')).toBeInTheDocument();
    expect(screen.getByText('Leer Mejores Prácticas.')).toBeInTheDocument();
    expect(screen.getByText('参与其中。')).toBeInTheDocument();
    expect(screen.queryByText('1.')).not.toBeInTheDocument();
    expect(screen.queryByText('Read Best Practices.')).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        '1. Read Best Practices. Leer Mejores Prácticas. 参与其中。'
      )
    ).not.toBeInTheDocument();
  });

  it('Handles bullets like this 1:', function () {
    const paragraph =
      '1: About Community Fridges. Sobre Refrigeradores Comunitarios. 关于社区冰箱';
    render(SoftWrap(paragraph));

    expect(screen.getByText('1: About Community Fridges.')).toBeInTheDocument();
    expect(
      screen.getByText('Sobre Refrigeradores Comunitarios.')
    ).toBeInTheDocument();
    expect(screen.getByText('关于社区冰箱')).toBeInTheDocument();
    expect(screen.queryByText('1:')).not.toBeInTheDocument();
    expect(
      screen.queryByText('About Community Fridges.')
    ).not.toBeInTheDocument();
  });
});
