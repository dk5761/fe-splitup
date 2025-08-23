import React, { createContext, useState, useContext, useMemo } from 'react';

interface TabBarContextType {
  isTabBarVisible: boolean;
  showTabBar: () => void;
  hideTabBar: () => void;
}

const TabBarContext = createContext<TabBarContextType | undefined>(undefined);

export const TabBarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTabBarVisible, setTabBarVisible] = useState(true);

  const value = useMemo(() => ({
    isTabBarVisible,
    showTabBar: () => setTabBarVisible(true),
    hideTabBar: () => setTabBarVisible(false),
  }), [isTabBarVisible]);

  return (
    <TabBarContext.Provider value={value}>
      {children}
    </TabBarContext.Provider>
  );
};

export const useTabBar = () => {
  const context = useContext(TabBarContext);
  if (context === undefined) {
    throw new Error('useTabBar must be used within a TabBarProvider');
  }
  return context;
};
