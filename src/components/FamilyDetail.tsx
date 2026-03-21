import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { useFamilyDetail } from './useFamilyDetail';

const MEMBER_EMOJIS = ['🧒', '👦', '👧', '👨', '👩', '👴', '👵', '🧒🏻'];
const ROLES = [
  { value: 'parent', label: 'ผู้ปกครอง 👨‍👩' },
  { value: 'child', label: 'เด็ก 🧒' },
];

const FamilyDetail: React.FC = () => {
  const {
    family,
    members,
    showAddDialog,
    setShowAddDialog,
    editingMemberId,
    setEditingMemberId,
    handleAddMember,
    handleRemoveMember,
    handleUpdateMember,
  } = useFamilyDetail();

  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('child');
  const [newDob, setNewDob] = useState('');
  const [newEmoji, setNewEmoji] = useState('🧒');

  // Edit form state
  const [editName, setEditName] = useState('');
  const [editEmoji, setEditEmoji] = useState('');

  if (!family) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography sx={{ fontSize: '48px', mb: 1 }}>🔍</Typography>
        <Typography sx={{ color: '#999' }}>ไม่พบข้อมูลครอบครัว</Typography>
      </Box>
    );
  }

  const onSubmitAdd = () => {
    if (newName.trim() && newDob) {
      handleAddMember(newName.trim(), newRole, newDob, newEmoji);
      setNewName('');
      setNewRole('child');
      setNewDob('');
      setNewEmoji('🧒');
    }
  };

  const startEditing = (memberId: string) => {
    const member = members.find((m) => m.id === memberId);
    if (!member) return;
    if (editingMemberId === memberId) {
      setEditingMemberId(null);
      return;
    }
    setEditName(member.displayName);
    setEditEmoji(member.avatarEmoji || '🧒');
    setEditingMemberId(memberId);
  };

  const saveEdit = () => {
    if (!editingMemberId || !editName.trim()) return;
    handleUpdateMember(editingMemberId, {
      displayName: editName.trim(),
      avatarEmoji: editEmoji,
    });
    setEditingMemberId(null);
  };

  return (
    <Box sx={{ px: { xs: 1.5, sm: 2 }, py: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Family Header */}
      <Box sx={{ textAlign: 'center', py: 1 }}>
        <Typography sx={{ fontSize: '48px', lineHeight: 1 }}>
          {family.avatarEmoji || '👨‍👩‍👧‍👦'}
        </Typography>
        <Typography sx={{ fontSize: { xs: '22px', sm: '26px' }, fontWeight: 700, color: '#333', mt: 1 }}>
          {family.name}
        </Typography>
        <Typography sx={{ fontSize: '14px', color: '#999' }}>
          {members.length} สมาชิก
        </Typography>
      </Box>

      {/* Members List */}
      {members.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography sx={{ fontSize: '14px', color: '#999' }}>
            ยังไม่มีสมาชิก — กดเพิ่มสมาชิกด้านล่าง
          </Typography>
        </Box>
      ) : (
        members.map((member) => (
          <Box
            key={member.id}
            sx={{
              backgroundColor: '#fff',
              border: editingMemberId === member.id ? '2px solid #FF6B6B' : '2px solid #eee',
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              overflow: 'hidden',
              transition: 'border-color 0.2s',
            }}
          >
            {/* Member Header Row */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: { xs: 1.5, sm: 2 },
                gap: 1.5,
              }}
            >
              <Typography sx={{ fontSize: { xs: '32px', sm: '40px' }, lineHeight: 1 }}>
                {member.avatarEmoji || '🧒'}
              </Typography>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: { xs: '16px', sm: '18px' }, fontWeight: 700, color: '#333' }}>
                  {member.displayName}
                </Typography>
                <Typography sx={{ fontSize: { xs: '12px', sm: '13px' }, color: '#999' }}>
                  {member.role === 'parent' ? 'ผู้ปกครอง' : 'เด็ก'} •{' '}
                  {new Date(member.dateOfBirth).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Typography>
              </Box>
              <IconButton
                onClick={() => startEditing(member.id)}
                aria-label={`แก้ไข ${member.displayName}`}
                sx={{
                  color: editingMemberId === member.id ? '#FF6B6B' : '#ccc',
                  '&:hover': { color: '#FF6B6B', backgroundColor: '#FFF0F0' },
                }}
              >
                <Typography sx={{ fontSize: '18px' }}>
                  {editingMemberId === member.id ? '✕' : '✏️'}
                </Typography>
              </IconButton>
            </Box>

            {/* Inline Edit Panel */}
            <Collapse in={editingMemberId === member.id}>
              <Box sx={{ px: { xs: 1.5, sm: 2 }, pb: 2, pt: 0 }}>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#FF6B6B', mb: 0.5, textTransform: 'uppercase' }}>
                  ชื่อสมาชิก
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                  inputProps={{ 'aria-label': 'แก้ไขชื่อ' }}
                />

                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#FF6B6B', mb: 0.5, textTransform: 'uppercase' }}>
                  เลือกไอคอน
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {MEMBER_EMOJIS.map((emoji) => (
                    <Button
                      key={emoji}
                      onClick={() => setEditEmoji(emoji)}
                      sx={{
                        minWidth: 0,
                        width: 44,
                        height: 44,
                        fontSize: '22px',
                        borderRadius: '12px',
                        border: editEmoji === emoji ? '2px solid #FF6B6B' : '2px solid #eee',
                        backgroundColor: editEmoji === emoji ? '#FFF0F0' : '#fff',
                      }}
                    >
                      {emoji}
                    </Button>
                  ))}
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    onClick={saveEdit}
                    disabled={!editName.trim()}
                    variant="contained"
                    sx={{
                      flex: 1,
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: 700,
                      backgroundColor: '#FF6B6B',
                      '&:hover': { backgroundColor: '#FF5252' },
                    }}
                  >
                    บันทึก
                  </Button>
                  <Button
                    onClick={() => handleRemoveMember(member.id)}
                    sx={{
                      flex: 1,
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: 700,
                      color: '#FF6B6B',
                      backgroundColor: '#FFF0F0',
                      border: '1px solid #FFD0D0',
                      '&:hover': { backgroundColor: '#FFE0E0' },
                    }}
                  >
                    ลบ {member.displayName}
                  </Button>
                </Box>
              </Box>
            </Collapse>
          </Box>
        ))
      )}

      {/* Add Member Button */}
      <Button
        onClick={() => setShowAddDialog(true)}
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
        + เพิ่มสมาชิก
      </Button>

      {/* Add Member Dialog */}
      <Dialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontWeight: 700 }}>เพิ่มสมาชิกใหม่</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="ชื่อ"
            fullWidth
            variant="outlined"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#555', mb: 1 }}>
            บทบาท
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            {ROLES.map((r) => (
              <Button
                key={r.value}
                onClick={() => setNewRole(r.value)}
                sx={{
                  flex: 1,
                  py: 1,
                  borderRadius: '12px',
                  border: newRole === r.value ? '2px solid #FF6B6B' : '2px solid #eee',
                  backgroundColor: newRole === r.value ? '#FFF0F0' : '#fff',
                  textTransform: 'none',
                  fontWeight: 600,
                  color: newRole === r.value ? '#FF6B6B' : '#666',
                  fontSize: '14px',
                }}
              >
                {r.label}
              </Button>
            ))}
          </Box>

          <TextField
            margin="dense"
            label="วันเกิด"
            type="date"
            fullWidth
            variant="outlined"
            value={newDob}
            onChange={(e) => setNewDob(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{ mb: 2 }}
          />

          <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#555', mb: 1 }}>
            เลือกไอคอน
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {MEMBER_EMOJIS.map((emoji) => (
              <Button
                key={emoji}
                onClick={() => setNewEmoji(emoji)}
                sx={{
                  minWidth: 0,
                  width: 48,
                  height: 48,
                  fontSize: '24px',
                  borderRadius: '12px',
                  border: newEmoji === emoji ? '2px solid #FF6B6B' : '2px solid #eee',
                  backgroundColor: newEmoji === emoji ? '#FFF0F0' : '#fff',
                }}
              >
                {emoji}
              </Button>
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setShowAddDialog(false)} sx={{ color: '#999' }}>
            ยกเลิก
          </Button>
          <Button
            onClick={onSubmitAdd}
            disabled={!newName.trim() || !newDob}
            variant="contained"
            sx={{
              backgroundColor: '#FF6B6B',
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 700,
              '&:hover': { backgroundColor: '#FF5252' },
            }}
          >
            เพิ่ม
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FamilyDetail;
