import React from 'react'

// Source: TT-Logo.svg (237×208). Fill is currentColor so the colour is set by
// the text-* class at each call site, e.g. "text-charcoal dark:text-white".
export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="237"
    height="208"
    viewBox="0 0 237 208"
    fill="none"
    className="w-auto h-7 text-primary"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.9019 12.9148L25.8038 25.8296H53.5419H81.2786L94.1331 12.9148L106.988 0H53.4931H0L12.9019 12.9148ZM112.413 24.7677L87.6757 49.5369L87.7403 109.073L87.8048 168.61L106.485 187.886L125.164 207.162L143.747 188.578L162.332 169.995L161.954 118.687L161.577 67.3794L145.075 81.2183C135.999 88.8294 128.25 95.3916 127.855 95.802C127.173 96.5109 132.856 95.4318 138.259 93.826C140.595 93.1315 140.77 95.1979 140.77 123.438V153.795L132.998 161.883L125.228 169.969L119.425 163.55L113.623 157.13L113.564 108.318L113.505 59.5071L130.388 42.6676L147.27 25.8296H178.848H210.427L223.281 12.9148L236.136 0H186.643H137.152L112.413 24.7677Z"
      fill="currentColor"
    />
  </svg>
)

export default Logo
