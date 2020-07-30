import { drawLineFromTo } from "./larslo_animation_lib/linedraw_lib.js";

window.addEventListener("load", function () {
  /* DOM selection */

  const svg = document.querySelector("#svg");
  if (!svg) return;
  const me = svg.querySelector(".me");
  if (!me) return;
  const totall = me.getTotalLength();

  /* 
   * prepare some defaults
   * to have the line not flashing at beginning its has white as stroke (see svg)
   */
  function resetAnim() {
    me.style.strokeDasharray = "0 " + totall;
    me.setAttributeNS(null, "stroke", "black");
  }
  resetAnim();
  
  async function backforth() {
    /* here you can chain the animations, for params see ./larslo_animation_lib/linedraw_lib.js */
    await drawLineFromTo(me, totall, totall / 60, 30, 0, 100);
    await drawLineFromTo(me, totall, totall / 60, 30, 99.9, 0.01);
    /* the test on 0 and 100 is bad when going backwards (TODO), but 99 and 1 is working  :-) */
  }
  backforth();
});
