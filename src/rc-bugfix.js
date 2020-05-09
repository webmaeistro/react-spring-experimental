// This blob teaches react-spring to re-use react-three-fibers own frameloop
// It will be part of the next release candidate. Without it there are two raf-calls :-( */

import { addEffect, invalidate } from "react-three-fiber"
import { FrameLoop, Globals, update } from "@react-spring/core"

addEffect(update)
Globals.assign({ frameLoop: new FrameLoop(invalidate) })
