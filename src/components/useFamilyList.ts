import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCurrentFamily, addFamily } from '../store/familySlice';
import type { Family } from '../types/member';

export const useFamilyList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const families = useAppSelector((state) => state.family.families);
  const isLoading = useAppSelector((state) => state.family.isLoading);
  const error = useAppSelector((state) => state.family.error);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleSelectFamily = useCallback(
    (family: Family) => {
      dispatch(setCurrentFamily(family));
      navigate(`/family/${family.id}`);
    },
    [dispatch, navigate]
  );

  const handleCreateFamily = useCallback(
    (name: string, avatarEmoji: string) => {
      const newFamily: Family = {
        id: crypto.randomUUID(),
        name,
        avatarEmoji,
        createdAt: new Date().toISOString(),
        memberCount: 0,
        members: [],
      };
      dispatch(addFamily(newFamily));
      setShowCreateDialog(false);
    },
    [dispatch]
  );

  return {
    families,
    isLoading,
    error,
    showCreateDialog,
    setShowCreateDialog,
    handleSelectFamily,
    handleCreateFamily,
  };
};
