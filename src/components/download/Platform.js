import React from 'react';


export const PlatformContext = React.createContext();

export const PlatformProvider = PlatformContext.Provider;

export const usePlatform = () => React.useContext(PlatformContext);