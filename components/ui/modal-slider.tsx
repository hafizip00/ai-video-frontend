import React, { ReactNode, ReactPortal } from 'react'

type Props = {
    children: ReactNode;
  };

const modalSlider = ({children} : Props) => {
  return (
    <div>{children}</div>
  )
}

export default modalSlider