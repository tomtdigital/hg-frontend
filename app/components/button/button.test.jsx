import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Button } from '.';

describe('Button', () => {
  it('renders a heading', () => {
    render(<Button>My Button</Button>);

    const button = screen.getByText('My Button');

    expect(button).toBeInTheDocument();
  });
});
