// Inlined from what used to be data/logo.svg. That file was the only SVG import
// in the project, and @svgr/webpack existed solely to transform it -- which meant
// carrying a build dependency plus a loader rule for each of the two bundlers.
//
// The source defined two separate linearGradients, one per stroke. They were
// interchangeable: each is purely vertical (x1 === x2) and spans the same y range
// with the same stops, so the x offset never affected the output. One shared
// gradient renders identically and states the intent more plainly.
//
// The gradient id has to be unique within the document. The header renders once
// per page, so a static id is fine; and were the logo ever rendered twice, both
// definitions would be identical and `url(#logo-gradient)` would resolve to the
// first, so the visual result still holds.
const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="53.87"
    height="43.61"
    viewBox="344.564 330.278 111.737 91.218"
  >
    <defs>
      <linearGradient
        id="logo-gradient"
        gradientUnits="userSpaceOnUse"
        x1="420.97"
        y1="331.28"
        x2="420.97"
        y2="418.5"
      >
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#67e8f9" />
      </linearGradient>
    </defs>
    <path fill="url(#logo-gradient)" d="M453.3 331.28L453.3 359.85L388.64 418.5L388.64 388.42Z" />
    <path fill="url(#logo-gradient)" d="M410.23 331.28L410.23 359.85L345.56 418.5L345.56 388.42Z" />
  </svg>
)

export default Logo
