import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useUnistyles } from 'react-native-unistyles';
import { stylesheet } from './Fab.styles';

interface FabProps {
  onPress: () => void;
  icon?: React.ReactNode;
}

export const Fab = ({ onPress, icon }: FabProps) => {
  const { theme } = useUnistyles();
  const styles = stylesheet;

  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      {icon ? icon : <Plus size={24} color={theme.colors.primaryOn} />}
    </TouchableOpacity>
  );
};
