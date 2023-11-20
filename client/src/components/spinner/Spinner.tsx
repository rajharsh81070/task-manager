import React from 'react'

interface SpinnerProps {
  size: number
  containerHeight?: string
}

const Spinner: React.FC<SpinnerProps> = ({ size = 32, containerHeight }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        containerHeight ? containerHeight : 'h-screen'
      }`}
    >
      <div
        style={{
          height: `${size}px`,
          width: `${size}px`,
        }}
        className={`animate-spin rounded-full border-t-2 border-b-2 border-[#bbb3b3] h-8 w-8`}
      />
    </div>
  )
}

export default Spinner
