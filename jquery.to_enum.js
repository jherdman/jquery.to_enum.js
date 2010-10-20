/**
 * @author James F. Herdman (james.herdman@me.com)
 * @license MIT License
 * @requires ~> jQuery 1.4.3 (may work with less)
 */
(function ($) {
  /**
   * Returns a JavaScript object that allows for cyclical enumerability. This
   * means that advancing to the next item in the collection will return the
   * first item in the collection.
   */
  $.fn.toEnum = function () {
    var $this = this
      , curr  = 0;

    function adjIdx (idx) {
      if (idx >= $this.length) {
        return 0;
      } else if (idx < 0) {
        return $this.length - 1;
      } else {
        return idx;
      }
    }

    function peek (idx) {
      return $this.eq(adjIdx(idx));
    }

    function advance (idx) {
      curr = adjIdx(idx);
      return peek(curr);
    }

    return {
        /**
         * @return {jQuery} the current item in the jQuery collection
         */
        current : function () { return peek(curr); }

        /**
         * @return {jQuery} peeks at the next item in the jQuery collection
         */
      , next : function () { return peek(curr + 1); }

        /**
         * @return {jQuery} peeks at the previous item in the jQuery collection
         */
      , prev : function () { return peek(curr - 1); }

        /**
         * @return {jQuery} advances and returns the next item in the jQuery collection.
         */
      , advance : function () { return advance(curr + 1); }

        /**
         * Iterates through the collection, yielding it with each iteration
         * with the current item advanced.
         *
         * @param {Function} a function to call on each item in the jQuery
         *   collection. This function will be provided the enumerator. It
         *   must return either true or false.
         * 
         * @param {Integer} the number of milliseconds to delay between
         *   iterations. Defaults to 0.
         */
      , each : function (method, delay) {
                 var intCtl
                   , enum = this;

                 delay = delay || 0;

                 intCtrl = setInterval(function () {
                   if (!method(enum.current())) {
                     clearInterval(intCtrl);
                   }

                   enum.advance();
                 }, delay);
               }
    };
  };
})(jQuery);
