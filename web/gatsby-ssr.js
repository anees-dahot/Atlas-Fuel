import React from 'react'
import './src/styles/global.css'

export function onRenderBody({ setHeadComponents }) {
  setHeadComponents([
    <link
      key="gfonts-preconnect"
      rel="preconnect"
      href="https://fonts.googleapis.com"
    />,
    <link
      key="gfonts-preconnect2"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    <link
      key="font-manrope"
      href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap"
      rel="stylesheet"
    />,
  ])
}
