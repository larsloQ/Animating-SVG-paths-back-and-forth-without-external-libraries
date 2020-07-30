(function () {
  'use strict';

  /* draw with a promise*/

  /**
   * Draws a line from to.
   *
   * @param      {<type>}   pathElement        The path element, SVG Path Node
   * @param      {number}   totalLength        The total length, calc this before with pathElement.getTotalLength,
   * @param      {number}   stepWidth          The step width, the width for each step
   * @param      {<type>}   tick               The tick, step in millisec
   * @param      {number}   [percentStart=0]   The percent start, where to start on line in percent
   * @param      {number}   [percentStop=100]  The percent stop, where to stop on line in percent
   * @return     {Promise}  { return promise, use promise.resolve to chain amimations }
   */
  function drawLineFromTo (
    pathElement,
    totalLength,
    stepWidth,
    tick,
    percentStart = 0,
    percentStop = 100
  ) {
    return new Promise(function (resolve) {
      let startAt = (totalLength * percentStart) / 100;
      let length = startAt;
      if (length >= totalLength) {
        length = 0;
      }
      let forward  = percentStart <= percentStop;
      /* the inital strokeDash is critical, change here depending on you want to paint or erase */
      // pathElement.style.strokeDasharray = ' ' + totalLength + ' ';
      pathElement.style.strokeDasharray = totalLength + ' ' + totalLength;
      let timer = setInterval(
        function (pathElement, totalLength, distancePerPoint, forward) {

          forward ? length += distancePerPoint : length -= distancePerPoint;
          // length += distancePerPoint;// : length -= distancePerPoint;
          pathElement.style.strokeDashoffset = forward ? totalLength-length : -length;
          // pathElement.setAttributeNS(
          //   null,
          //   "stroke-dasharray",
          //   [0, startAt - stepWidth, length - startAt - stepWidth, 0].join(" ")
          // );

          if (forward && length >= (totalLength * percentStop) / 100) {
            clearInterval(timer);
            resolve(true);
          }
          if (!forward && length <= (totalLength * percentStop) / 100) {
              clearInterval(timer);
              resolve(true);
          }
        },
        tick,
        pathElement,
        totalLength,
        stepWidth,
        forward
      );
    });
  }

  /*
   * takes the svg from rollup_dist/index.htm
   */

  window.addEventListener("load", function () {

    /* DOM SELECTORS*/
    let svg = document.querySelector("#svg");
    if (!svg) return;
    const me = svg.querySelector(".me");
    if (!me) return;
    const totall = me.getTotalLength();

    /* 
     * prepare some defaults
       to have the line not flashing at beginning its has white as stroke (see svg)
     */
    function resetAnim() {
      me.style.strokeDasharray = '0 ' + totall;
      me.setAttributeNS(null,"stroke",'black');
    }
    resetAnim();

     async function bf() {
        /* here you can chain the animations */
        await drawLineFromTo(me, totall, totall / 60, 30, 0, 100);
        await drawLineFromTo(me, totall, totall / 60, 30, 99.9, 0.01);
        /* the test on 0 and 100 is bad  when going backwards (TODO), but 99 and 1 is working  -) */
    }
    bf();
  });

}());
