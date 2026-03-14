import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AlphabetModal from './AlphabetModal';
import type { ThaiConsonant } from '../data/alphabet';

vi.mock('../utils/speech', () => ({
  speakText: vi.fn(() => Promise.resolve()),
}));

const mockConsonant: ThaiConsonant = {
  id: 1,
  letter: 'ก',
  word: 'ไก่',
  emoji: '🐔',
  sound: 'กุ๊กกุ๊กกุ๊ก',
  color: '#FF6B6B',
  image: 'https://example.com/chicken.jpg',
};

describe('AlphabetModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(globalThis, 'speechSynthesis', {
      value: { speak: vi.fn(), cancel: vi.fn() },
      writable: true,
    });
  });

  it('should not render when consonant is null', () => {
    render(<AlphabetModal consonant={null} onClose={vi.fn()} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render dialog when consonant is provided', () => {
    render(<AlphabetModal consonant={mockConsonant} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should display the consonant image', () => {
    render(<AlphabetModal consonant={mockConsonant} onClose={vi.fn()} />);
    const img = screen.getByAltText('ไก่');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/chicken.jpg');
  });

  it('should display the letter', () => {
    render(<AlphabetModal consonant={mockConsonant} onClose={vi.fn()} />);
    expect(screen.getByText('ก')).toBeInTheDocument();
  });

  it('should display the word', () => {
    render(<AlphabetModal consonant={mockConsonant} onClose={vi.fn()} />);
    expect(screen.getByText('ไก่')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    render(<AlphabetModal consonant={mockConsonant} onClose={onClose} />);
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
