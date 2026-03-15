import { describe, it, expect } from 'vitest';
import reducer, {
  setFamilies,
  addFamily,
  updateFamily,
  removeFamily,
  setCurrentFamily,
  addMember,
  updateMember,
  removeMember,
  setLoading,
  setError,
} from './familySlice';
import type { Family, Member } from '../types/member';

const mockMember: Member = {
  id: 'member-1',
  displayName: 'Alice',
  avatarEmoji: '👧',
  role: 'child',
  dateOfBirth: '2020-01-01',
  createdAt: '2025-01-01T00:00:00Z',
  familyId: 'family-1',
};

const mockFamily: Family = {
  id: 'family-1',
  name: 'Smith Family',
  avatarEmoji: '👨‍👩‍👧‍👦',
  createdAt: '2025-01-01T00:00:00Z',
  memberCount: 1,
  members: [mockMember],
};

describe('familySlice', () => {
  it('should return initial state', () => {
    const state = reducer(undefined, { type: 'unknown' });
    expect(state.families).toEqual([]);
    expect(state.currentFamily).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  describe('setFamilies', () => {
    it('should set families list', () => {
      const state = reducer(undefined, setFamilies([mockFamily]));
      expect(state.families).toEqual([mockFamily]);
    });
  });

  describe('addFamily', () => {
    it('should add a family to the list', () => {
      const state = reducer(undefined, addFamily(mockFamily));
      expect(state.families).toHaveLength(1);
      expect(state.families[0]).toEqual(mockFamily);
    });
  });

  describe('updateFamily', () => {
    it('should update an existing family', () => {
      const initial = reducer(undefined, setFamilies([mockFamily]));
      const updated = { ...mockFamily, name: 'Updated Family' };
      const state = reducer(initial, updateFamily(updated));
      expect(state.families[0].name).toBe('Updated Family');
    });
  });

  describe('removeFamily', () => {
    it('should remove a family by id', () => {
      const initial = reducer(undefined, setFamilies([mockFamily]));
      const state = reducer(initial, removeFamily('family-1'));
      expect(state.families).toHaveLength(0);
    });

    it('should clear currentFamily if it was the removed one', () => {
      let state = reducer(undefined, setFamilies([mockFamily]));
      state = reducer(state, setCurrentFamily(mockFamily));
      state = reducer(state, removeFamily('family-1'));
      expect(state.currentFamily).toBeNull();
    });
  });

  describe('setCurrentFamily', () => {
    it('should set current family', () => {
      const state = reducer(undefined, setCurrentFamily(mockFamily));
      expect(state.currentFamily).toEqual(mockFamily);
    });

    it('should clear current family with null', () => {
      let state = reducer(undefined, setCurrentFamily(mockFamily));
      state = reducer(state, setCurrentFamily(null));
      expect(state.currentFamily).toBeNull();
    });
  });

  describe('addMember', () => {
    it('should add member to current family', () => {
      const familyNoMembers = { ...mockFamily, members: [], memberCount: 0 };
      let state = reducer(undefined, setFamilies([familyNoMembers]));
      state = reducer(state, setCurrentFamily(familyNoMembers));
      state = reducer(state, addMember(mockMember));
      expect(state.currentFamily!.members).toHaveLength(1);
      expect(state.currentFamily!.memberCount).toBe(1);
    });
  });

  describe('updateMember', () => {
    it('should update member in current family', () => {
      let state = reducer(undefined, setCurrentFamily(mockFamily));
      const updated = { ...mockMember, displayName: 'Bob' };
      state = reducer(state, updateMember(updated));
      expect(state.currentFamily!.members[0].displayName).toBe('Bob');
    });
  });

  describe('removeMember', () => {
    it('should remove member from current family', () => {
      let state = reducer(undefined, setCurrentFamily(mockFamily));
      state = reducer(state, removeMember('member-1'));
      expect(state.currentFamily!.members).toHaveLength(0);
      expect(state.currentFamily!.memberCount).toBe(0);
    });
  });

  describe('setLoading', () => {
    it('should set loading state', () => {
      const state = reducer(undefined, setLoading(true));
      expect(state.isLoading).toBe(true);
    });
  });

  describe('setError', () => {
    it('should set error message', () => {
      const state = reducer(undefined, setError('Something went wrong'));
      expect(state.error).toBe('Something went wrong');
    });
  });
});
