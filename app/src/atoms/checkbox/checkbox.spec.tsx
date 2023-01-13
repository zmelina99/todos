import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Checkbox from './checkbox';

describe('Checkbox', () => {
  it('renders the checkbox', () => {
    render(<Checkbox checked={false} onChecked={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('calls onChecked when the checkbox is clicked', () => {
    const onChecked = jest.fn();
    render(<Checkbox checked={false} onChecked={onChecked} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChecked).toHaveBeenCalled();
  });
});
