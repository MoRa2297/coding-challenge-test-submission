import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('should render the error message', () => {
    render(<ErrorMessage message="Something went wrong" />);
    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
  });

  it('should have role alert for accessibility', () => {
    render(<ErrorMessage message="Error!" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should render different messages', () => {
    const { rerender } = render(<ErrorMessage message="First error" />);
    expect(screen.getByText(/First error/)).toBeInTheDocument();

    rerender(<ErrorMessage message="Second error" />);
    expect(screen.getByText(/Second error/)).toBeInTheDocument();
  });
});
