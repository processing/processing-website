import React from 'react';

export const VersionContext = React.createContext('1.0.0');

export const VersionProvider = VersionContext.Provider;

export const useVersion = () => React.useContext(VersionContext);