import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFamilyDetail } from './useFamilyDetail';

const mockDispatch = vi.fn();

const mockFamily = {
  id: 'f1',
  name: 'Test Family',
  avatarEmoji: '👨‍👩‍👧‍👦',
  createdAt: '2025-01-01T00:00:00Z',
  memberCount: 1,
  members: [
    {
      id: 'm1',
      displayName: 'Alice',
      avatarEmoji: '👧',
      role: 'child',
      dateOfBirth: '2020-01-01',
      createdAt: '2025-01-01T00:00:00Z',
      familyId: 'f1',
    },
  ],
};

vi.mock('../store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (state: unknown) => unknown) =>
    selector({
      family: { currentFamily: mockFamily },
    }),
}));

vi.mock('../store/familySlice', () => ({
  addMember: (member: unknown) => ({ type: 'family/addMember', payload: member }),
  removeMember: (id: string) => ({ type: 'family/removeMember', payload: id }),
}));

describe('useFamilyDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return current family', () => {
    const { result } = renderHook(() => useFamilyDetail());
    expect(result.current.family).toEqual(mockFamily);
  });

  it('should return members from current family', () => {
    const { result } = renderHook(() => useFamilyDetail());
    expect(result.current.members).toHaveLength(1);
    expect(result.current.members[0].displayName).toBe('Alice');
  });

  it('handleAddMember should dispatch addMember', () => {
    const { result } = renderHook(() => useFamilyDetail());

    act(() => {
      result.current.handleAddMember('Bob', 'parent', '1990-05-15', '👨');
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'family/addMember',
        payload: expect.objectContaining({
          displayName: 'Bob',
          role: 'parent',
          dateOfBirth: '1990-05-15',
          avatarEmoji: '👨',
          familyId: 'f1',
        }),
      })
    );
  });

  it('handleRemoveMember should dispatch removeMember', () => {
    const { result } = renderHook(() => useFamilyDetail());

    act(() => {
      result.current.handleRemoveMember('m1');
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'family/removeMember',
      payload: 'm1',
    });
  });

  it('should manage showAddDialog state', () => {
    const { result } = renderHook(() => useFamilyDetail());
    expect(result.current.showAddDialog).toBe(false);

    act(() => {
      result.current.setShowAddDialog(true);
    });

    expect(result.current.showAddDialog).toBe(true);
  });
});
