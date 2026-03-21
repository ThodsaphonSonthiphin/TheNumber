import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Family, Member } from '../types/member';

interface FamilyState {
  families: Family[];
  currentFamily: Family | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: FamilyState = {
  families: [],
  currentFamily: null,
  isLoading: false,
  error: null,
};

const familySlice = createSlice({
  name: 'family',
  initialState,
  reducers: {
    setFamilies(state, action: PayloadAction<Family[]>) {
      state.families = action.payload;
    },
    addFamily(state, action: PayloadAction<Family>) {
      state.families.push(action.payload);
    },
    updateFamily(state, action: PayloadAction<Family>) {
      const index = state.families.findIndex((f) => f.id === action.payload.id);
      if (index !== -1) state.families[index] = action.payload;
    },
    removeFamily(state, action: PayloadAction<string>) {
      state.families = state.families.filter((f) => f.id !== action.payload);
      if (state.currentFamily?.id === action.payload) {
        state.currentFamily = null;
      }
    },
    setCurrentFamily(state, action: PayloadAction<Family | null>) {
      state.currentFamily = action.payload;
    },
    addMember(state, action: PayloadAction<Member>) {
      if (state.currentFamily) {
        state.currentFamily.members.push(action.payload);
        state.currentFamily.memberCount = state.currentFamily.members.length;
      }
      const family = state.families.find((f) => f.id === action.payload.familyId);
      if (family) {
        family.members.push(action.payload);
        family.memberCount = family.members.length;
      }
    },
    updateMember(state, action: PayloadAction<Member>) {
      if (state.currentFamily) {
        const index = state.currentFamily.members.findIndex((m) => m.id === action.payload.id);
        if (index !== -1) state.currentFamily.members[index] = action.payload;
      }
      const family = state.families.find((f) => f.id === action.payload.familyId);
      if (family) {
        const index = family.members.findIndex((m) => m.id === action.payload.id);
        if (index !== -1) family.members[index] = action.payload;
      }
    },
    removeMember(state, action: PayloadAction<string>) {
      if (state.currentFamily) {
        state.currentFamily.members = state.currentFamily.members.filter(
          (m) => m.id !== action.payload
        );
        state.currentFamily.memberCount = state.currentFamily.members.length;
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
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
} = familySlice.actions;

export default familySlice.reducer;
