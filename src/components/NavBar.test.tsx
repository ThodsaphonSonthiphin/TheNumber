import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from './NavBar';
import { NAV_ITEMS } from './useNavBar';

const mockHandleNavigate = vi.fn();

vi.mock('./useNavBar', async () => {
  const actual = await vi.importActual('./useNavBar');
  return {
    ...actual,
    useNavBar: () => ({
      activeIndex: 0,
      handleNavigate: mockHandleNavigate,
      navItems: (actual as typeof import('./useNavBar')).NAV_ITEMS,
    }),
  };
});

describe('NavBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all 4 navigation items', () => {
    render(<NavBar />);
    NAV_ITEMS.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it('should render emoji icons for each item', () => {
    render(<NavBar />);
    NAV_ITEMS.forEach((item) => {
      expect(screen.getByText(item.icon)).toBeInTheDocument();
    });
  });

  it('should call handleNavigate when a nav item is clicked', () => {
    render(<NavBar />);

    const alphabetButton = screen.getByText('ก-ฮ');
    fireEvent.click(alphabetButton);

    expect(mockHandleNavigate).toHaveBeenCalledWith(2);
  });
});
