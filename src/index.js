// @react-spring/core@9.0.0-rc2
// Still some work to do, small bug robbing performance when
// it tries to animate multiple platforms with a shared spring.
// It isn't as fast as it could be, but will be fixed soon enough. :-)

import React, { Suspense, lazy, useState } from "react"
import ReactDOM from "react-dom"
// All hooks are cross platform now
import { useSpring } from "@react-spring/core"
// Platform knowledge is in here ...
import { a } from "@react-spring/web"
import "./styles.css"

// Canvas contents are loaded through an async split bundle
const Canvas = lazy(() => import("./Canvas"))

function App() {
  const [toggle, set] = useState(0)
  // Set up a shared spring which simply animates the toggle above
  // We use this spring to interpolate all the colors, position and rotations
  const { x } = useSpring({ x: toggle, config: { mass: 5, tension: 1000, friction: 50, precision: 0.0001 } })
  return (
    <a.div className="container" style={{ backgroundColor: x.to([0, 1], ["#c9ffed", "#ff2558"]), color: x.to([0, 1], ["#7fffd4", "#c70f46"]) }}>
      <h1 className="open" children="<h1>" />
      <h1 className="close" children="</h1>" />
      <Suspense fallback={<h1>loading...</h1>}>
        <a.h1>{x.to(x => (x + 8).toFixed(2))}</a.h1>
        <Canvas x={x} set={set} />
      </Suspense>
    </a.div>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
