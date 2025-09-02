import { createRef } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

export const navigationRef = createRef<StackNavigationProp<RootStackParamList>>();

export function navigate(name: keyof RootStackParamList, params?: any) {
  navigationRef.current?.navigate(name as any, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}