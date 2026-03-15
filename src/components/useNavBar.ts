import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { setCurrentIndex } from '../store/flashCardSlice';

export interface NavItem {
  label: string;
  icon: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', icon: '🏠', path: '/' },
  { label: 'Flash Cards', icon: '🃏', path: '/flashcards' },
  { label: 'ก-ฮ', icon: '🔤', path: '/alphabet' },
  { label: 'Color Quiz', icon: '🎨', path: '/color-game' },
  { label: 'ครอบครัว', icon: '👨‍👩‍👧‍👦', path: '/family' },
];

export const useNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const activeIndex = NAV_ITEMS.findIndex((item) =>
    item.path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(item.path)
  );

  const handleNavigate = (index: number) => {
    const item = NAV_ITEMS[index];
    if (item.path === '/flashcards') {
      dispatch(setCurrentIndex(0));
    }
    navigate(item.path);
  };

  return { activeIndex, handleNavigate, navItems: NAV_ITEMS };
};
