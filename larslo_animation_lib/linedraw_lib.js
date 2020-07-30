/**
 * Draws a line from to.
 *
 * @param      {<type>}   pathElement        The path element, SVG Path Node
 * @param      {number}   totalLength        The total length, calc this before with pathElement.getTotalLength,
 * @param      {number}   stepWidth          The step width, the width for each step
 * @param      {<type>}   tick               The tick, step in millisec
 * @param      {number}   [percentStart=0]   The percent start, where to start on line in percent
 * @param      {number}   [percentStop=100]  The percent stop, where to stop on line in percent
 * @return     {Promise}  
 */
export function drawLineFromTo (
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
    pathElement.style.strokeDasharray = totalLength + ' ' + totalLength;
    let timer = setInterval(
      function (pathElement, totalLength, distancePerPoint, forward) {
        /* add or substract from length depending on direction*/
        forward ? length += distancePerPoint : length -= distancePerPoint;
        /* "shift" the dashArray */
        pathElement.style.strokeDashoffset = forward ? totalLength-length : -length;
        /* these breaking conditions are not good, 0 and backward currently not breaking */
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

