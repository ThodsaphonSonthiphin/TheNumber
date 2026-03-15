import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { useFamilyList } from './useFamilyList';

const FAMILY_EMOJIS = ['👨‍👩‍👧‍👦', '👨‍👩‍👦', '👩‍👧‍👦', '👨‍👧‍👦', '👨‍👩‍👧', '🏠', '❤️', '⭐'];

const FamilyList: React.FC = () => {
  const {
    families,
    isLoading,
    showCreateDialog,
    setShowCreateDialog,
    handleSelectFamily,
    handleCreateFamily,
  } = useFamilyList();

  const [newFamilyName, setNewFamilyName] = useState('');
  const [newFamilyEmoji, setNewFamilyEmoji] = useState('👨‍👩‍👧‍👦');

  const onSubmitCreate = () => {
    if (newFamilyName.trim()) {
      handleCreateFamily(newFamilyName.trim(), newFamilyEmoji);
      setNewFamilyName('');
      setNewFamilyEmoji('👨‍👩‍👧‍👦');
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography sx={{ fontSize: '48px' }}>⏳</Typography>
        <Typography sx={{ color: '#999', mt: 1 }}>กำลังโหลด...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 1.5, sm: 2 }, py: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Family Cards */}
      {families.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography sx={{ fontSize: '64px', mb: 1 }}>👨‍👩‍👧‍👦</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: '18px', color: '#333', mb: 0.5 }}>
            ยังไม่มีครอบครัว
          </Typography>
          <Typography sx={{ fontSize: '14px', color: '#999' }}>
            กดปุ่มด้านล่างเพื่อสร้างครอบครัวแรก
          </Typography>
        </Box>
      ) : (
        families.map((family) => (
          <Button
            key={family.id}
            onClick={() => handleSelectFamily(family)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              p: { xs: 2, sm: 2.5 },
              backgroundColor: '#fff',
              border: '2px solid #eee',
              borderRadius: '16px',
              gap: 1.5,
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              textTransform: 'none',
              justifyContent: 'flex-start',
              '&:hover': { backgroundColor: '#fafafa' },
            }}
          >
            <Typography sx={{ fontSize: { xs: '36px', sm: '44px' }, lineHeight: 1 }}>
              {family.avatarEmoji || '👨‍👩‍👧‍👦'}
            </Typography>
            <Box sx={{ flex: 1, textAlign: 'left' }}>
              <Typography sx={{ fontSize: { xs: '18px', sm: '20px' }, fontWeight: 700, color: '#333' }}>
                {family.name}
              </Typography>
              <Typography sx={{ fontSize: { xs: '13px', sm: '14px' }, color: '#999' }}>
                {family.memberCount} สมาชิก
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '16px', color: '#ccc' }}>▶</Typography>
          </Button>
        ))
      )}

      {/* Create Family Button */}
      <Button
        onClick={() => setShowCreateDialog(true)}
        sx={{
          width: '100%',
          py: 1.5,
          borderRadius: '16px',
          border: '2px dashed #ccc',
          backgroundColor: 'transparent',
          color: '#999',
          textTransform: 'none',
          fontSize: { xs: '15px', sm: '16px' },
          fontWeight: 600,
          '&:hover': { backgroundColor: '#f5f5f5', borderColor: '#aaa' },
        }}
      >
        + สร้างครอบครัวใหม่
      </Button>

      {/* Create Family Dialog */}
      <Dialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontWeight: 700 }}>สร้างครอบครัวใหม่</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="ชื่อครอบครัว"
            fullWidth
            variant="outlined"
            value={newFamilyName}
            onChange={(e) => setNewFamilyName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#555', mb: 1 }}>
            เลือกไอคอน
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {FAMILY_EMOJIS.map((emoji) => (
              <Button
                key={emoji}
                onClick={() => setNewFamilyEmoji(emoji)}
                sx={{
                  minWidth: 0,
                  width: 48,
                  height: 48,
                  fontSize: '24px',
                  borderRadius: '12px',
                  border: newFamilyEmoji === emoji ? '2px solid #FF6B6B' : '2px solid #eee',
                  backgroundColor: newFamilyEmoji === emoji ? '#FFF0F0' : '#fff',
                }}
              >
                {emoji}
              </Button>
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setShowCreateDialog(false)} sx={{ color: '#999' }}>
            ยกเลิก
          </Button>
          <Button
            onClick={onSubmitCreate}
            disabled={!newFamilyName.trim()}
            variant="contained"
            sx={{
              backgroundColor: '#FF6B6B',
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 700,
              '&:hover': { backgroundColor: '#FF5252' },
            }}
          >
            สร้าง
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FamilyList;
