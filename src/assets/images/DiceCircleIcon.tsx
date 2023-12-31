import React from 'react'

const DiceCircleIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    viewBox="0 0 32 32"
  >
    <g fill={props.fill}>
      <path d="M15 32C6.716 32 0 25.284 0 17 0 8.716 6.716 2 15 2c1.819-.008 3.623.324 5.32.98l-.7 1.86C14.301 2.818 8.286 4.49 4.773 8.966s-3.706 10.717-.477 15.402c3.229 4.685 9.13 6.726 14.563 5.037S27.996 22.69 28 17c0-1.614-.298-3.214-.88-4.72l1.86-.74c1.794 4.618 1.196 9.823-1.599 13.914C24.586 29.544 19.954 31.994 15 32z" />
      <path d="M32 0L20 7.2C15.112 4.678 9.115 6.093 5.87 10.535c-3.244 4.441-2.768 10.584 1.121 14.474 3.89 3.89 10.033 4.365 14.474 1.12C25.907 22.885 27.322 16.888 24.8 12L32 0zM15 22c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z" />
    </g>
  </svg>
)
export default DiceCircleIcon
