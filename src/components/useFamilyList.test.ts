import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFamilyList } from './useFamilyList';

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (state: unknown) => unknown) =>
    selector({
      family: {
        families: [
          {
            id: 'f1',
            name: 'Test Family',
            avatarEmoji: '👨‍👩‍👧‍👦',
            createdAt: '2025-01-01T00:00:00Z',
            memberCount: 2,
            members: [],
          },
        ],
        isLoading: false,
        error: null,
      },
    }),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('../store/familySlice', () => ({
  setCurrentFamily: (family: unknown) => ({ type: 'family/setCurrentFamily', payload: family }),
  addFamily: (family: unknown) => ({ type: 'family/addFamily', payload: family }),
}));

describe('useFamilyList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return families from store', () => {
    const { result } = renderHook(() => useFamilyList());
    expect(result.current.families).toHaveLength(1);
    expect(result.current.families[0].name).toBe('Test Family');
  });

  it('should return isLoading from store', () => {
    const { result } = renderHook(() => useFamilyList());
    expect(result.current.isLoading).toBe(false);
  });

  it('handleSelectFamily should dispatch and navigate', () => {
    const { result } = renderHook(() => useFamilyList());
    const family = result.current.families[0];

    act(() => {
      result.current.handleSelectFamily(family);
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'family/setCurrentFamily',
      payload: family,
    });
    expect(mockNavigate).toHaveBeenCalledWith('/family/f1');
  });

  it('handleCreateFamily should dispatch addFamily', () => {
    const { result } = renderHook(() => useFamilyList());

    act(() => {
      result.current.handleCreateFamily('New Family', '🏠');
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'family/addFamily',
        payload: expect.objectContaining({
          name: 'New Family',
          avatarEmoji: '🏠',
        }),
      })
    );
  });

  it('should manage showCreateDialog state', () => {
    const { result } = renderHook(() => useFamilyList());
    expect(result.current.showCreateDialog).toBe(false);

    act(() => {
      result.current.setShowCreateDialog(true);
    });

    expect(result.current.showCreateDialog).toBe(true);
  });
});
