import { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addMember, removeMember, updateMember } from '../store/familySlice';
import type { Member } from '../types/member';

export const useFamilyDetail = () => {
  const dispatch = useAppDispatch();
  const family = useAppSelector((state) => state.family.currentFamily);
  const members = family?.members ?? [];
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);

  const handleAddMember = useCallback(
    (displayName: string, role: string, dateOfBirth: string, avatarEmoji: string) => {
      if (!family) return;
      const newMember: Member = {
        id: crypto.randomUUID(),
        displayName,
        avatarEmoji,
        role: role as 'parent' | 'child',
        dateOfBirth,
        createdAt: new Date().toISOString(),
        familyId: family.id,
      };
      dispatch(addMember(newMember));
      setShowAddDialog(false);
    },
    [dispatch, family]
  );

  const handleRemoveMember = useCallback(
    (memberId: string) => {
      dispatch(removeMember(memberId));
      if (editingMemberId === memberId) {
        setEditingMemberId(null);
      }
    },
    [dispatch, editingMemberId]
  );

  const handleUpdateMember = useCallback(
    (memberId: string, updates: Partial<Pick<Member, 'displayName' | 'avatarEmoji'>>) => {
      const member = members.find((m) => m.id === memberId);
      if (!member) return;
      dispatch(updateMember({ ...member, ...updates }));
    },
    [dispatch, members]
  );

  return {
    family,
    members,
    showAddDialog,
    setShowAddDialog,
    editingMemberId,
    setEditingMemberId,
    handleAddMember,
    handleRemoveMember,
    handleUpdateMember,
  };
};
