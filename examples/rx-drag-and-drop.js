(function (global) {
    var dragTarget = document.getElementById('dragTarget');

    // Get the three major events
    var mouseup   = Rx.Observable.fromEvent(dragTarget, 'mouseup');
    var mousemove = Rx.Observable.fromEvent(document,   'mousemove');
    var mousedown = Rx.Observable.fromEvent(dragTarget, 'mousedown');

    var mousedrag = mousedown.mergeMap(getMouseMoveEvents);

    function getMouseMoveEvents(md) {
        // calculate offsets when mouse down
        var startX = md.offsetX;
        var startY = md.offsetY;
        var calculateMouseLocation = calculateLocation(startX, startY);

        // Calculate delta with mousemove until mouseup
        return mousemove.map(calculateMouseLocation).takeUntil(mouseup);
    }

    function calculateLocation(startX, startY) {
        return function (mm) {
            mm.preventDefault();

            return {
                left: mm.clientX - startX,
                top: mm.clientY - startY
            };
        };
    }

  function main () {
    // Update position
    var subscription = mousedrag.subscribe(function (pos) {
      dragTarget.style.top = pos.top + 'px';
      dragTarget.style.left = pos.left + 'px';
    });
  }

  main();

}(window));