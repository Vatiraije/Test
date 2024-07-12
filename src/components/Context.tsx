// Example of typing children explicitly
import React from 'react';

interface Props {
  children: React.ReactNode; // Define children as ReactNode type
}

const MyComponent: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default MyComponent;
