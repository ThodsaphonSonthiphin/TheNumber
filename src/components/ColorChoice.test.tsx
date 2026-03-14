import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ColorChoice from './ColorChoice';
import { colorsData } from '../data/colors';

const defaultProps = {
  color: colorsData[0],
  isSelected: false,
  isCorrectChoice: false,
  isDisabled: false,
  showResult: false,
  onSelect: vi.fn(),
};

describe('ColorChoice', () => {
  it('should render with test id', () => {
    render(<ColorChoice {...defaultProps} />);
    expect(screen.getByTestId('color-choice-1')).toBeInTheDocument();
  });

  it('should call onSelect with colorId on click', () => {
    const onSelect = vi.fn();
    render(<ColorChoice {...defaultProps} onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('color-choice-1'));
    expect(onSelect).toHaveBeenCalledWith(colorsData[0].id);
  });

  it('should not call onSelect when disabled', () => {
    const onSelect = vi.fn();
    render(<ColorChoice {...defaultProps} onSelect={onSelect} isDisabled />);
    fireEvent.click(screen.getByTestId('color-choice-1'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('should show check mark for correct choice when result shown', () => {
    render(
      <ColorChoice
        {...defaultProps}
        isCorrectChoice
        showResult
      />,
    );
    expect(screen.getByText('✓')).toBeInTheDocument();
  });
});
