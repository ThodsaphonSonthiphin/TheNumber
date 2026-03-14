import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CelebrationEffect from './CelebrationEffect';

describe('CelebrationEffect', () => {
  it('should not render when isVisible is false', () => {
    render(<CelebrationEffect isVisible={false} />);
    expect(screen.queryByTestId('celebration-effect')).toBeNull();
  });

  it('should render when isVisible is true', () => {
    render(<CelebrationEffect isVisible={true} />);
    expect(screen.getByTestId('celebration-effect')).toBeTruthy();
  });
});
