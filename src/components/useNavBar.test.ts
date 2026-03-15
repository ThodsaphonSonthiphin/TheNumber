import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useNavBar, NAV_ITEMS } from './useNavBar';

const mockNavigate = vi.fn();
const mockDispatch = vi.fn();

vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(() => ({ pathname: '/' })),
  useNavigate: () => mockNavigate,
}));

vi.mock('../store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
}));

vi.mock('../store/flashCardSlice', () => ({
  setCurrentIndex: (index: number) => ({ type: 'flashCard/setCurrentIndex', payload: index }),
}));

import { useLocation } from 'react-router-dom';

describe('NAV_ITEMS', () => {
  it('should have 4 navigation items', () => {
    expect(NAV_ITEMS).toHaveLength(4);
  });

  it('should have correct paths', () => {
    expect(NAV_ITEMS.map((item) => item.path)).toEqual([
      '/',
      '/flashcards',
      '/alphabet',
      '/color-game',
    ]);
  });
});

describe('useNavBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useLocation).mockReturnValue({ pathname: '/', search: '', hash: '', state: null, key: '' });
  });

  it('should return activeIndex 0 for home route', () => {
    const { result } = renderHook(() => useNavBar());
    expect(result.current.activeIndex).toBe(0);
  });

  it('should return activeIndex 1 for /flashcards route', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: '/flashcards', search: '', hash: '', state: null, key: '' });
    const { result } = renderHook(() => useNavBar());
    expect(result.current.activeIndex).toBe(1);
  });

  it('should return activeIndex 2 for /alphabet route', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: '/alphabet', search: '', hash: '', state: null, key: '' });
    const { result } = renderHook(() => useNavBar());
    expect(result.current.activeIndex).toBe(2);
  });

  it('should return activeIndex 3 for /color-game route', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: '/color-game', search: '', hash: '', state: null, key: '' });
    const { result } = renderHook(() => useNavBar());
    expect(result.current.activeIndex).toBe(3);
  });

  it('should return navItems', () => {
    const { result } = renderHook(() => useNavBar());
    expect(result.current.navItems).toBe(NAV_ITEMS);
  });

  it('handleNavigate should navigate to correct path', () => {
    const { result } = renderHook(() => useNavBar());

    act(() => {
      result.current.handleNavigate(2);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/alphabet');
  });

  it('handleNavigate to flashcards should dispatch setCurrentIndex(0)', () => {
    const { result } = renderHook(() => useNavBar());

    act(() => {
      result.current.handleNavigate(1);
    });

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'flashCard/setCurrentIndex', payload: 0 });
    expect(mockNavigate).toHaveBeenCalledWith('/flashcards');
  });

  it('handleNavigate to non-flashcard routes should not dispatch setCurrentIndex', () => {
    const { result } = renderHook(() => useNavBar());

    act(() => {
      result.current.handleNavigate(0);
    });

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
