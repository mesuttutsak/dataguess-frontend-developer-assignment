import React from 'react';

interface StateProps {
  children: React.ReactNode
  theme: string;
}

const State = ({ children, theme = 'state' }: StateProps) => {
  return (
    <div className='stateContainer'>
      <div className={theme}>
        {children}
      </div>
    </div>
  )
};

export default State