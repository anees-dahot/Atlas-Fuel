import {createElement} from 'react'

export default function AtlasFuelLogo() {
  return createElement(
    'div',
    {
      'aria-label': 'Atlas Fuel',
      style: {
        alignItems: 'baseline',
        display: 'flex',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 800,
        gap: '0.25rem',
        letterSpacing: '-0.04em',
        lineHeight: 1,
      },
    },
    createElement('span', null, 'ATLAS'),
    createElement(
      'span',
      {style: {color: '#17a350', fontStyle: 'italic'}},
      'FUEL'
    )
  )
}
