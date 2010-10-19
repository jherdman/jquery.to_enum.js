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

    function get (idx) {
      return $($this[adjIdx(idx)]);
    }

    return {
        // @return {jQuery} current jQuery object in focus by the enumerator
        current  : function () { return get(curr); }

        // @return {jQuery} the next jQuery object, but don't advance enumerator
      , next     : function () { return get(curr + 1); }

        // @return {jQuery} the previous jQuery object, but don't rewind the enumerator
      , previous : function () { return get(curr - 1); }

        // @return {jQuery} move the enumerator forward one element, and return the new element
      , advance  : function () { curr = adjIdx(curr + 1); return this.current(); }

        // @return {jQuery} move the enumerator back one element, and return the new element
      , rewind   : function () { curr = adjIdx(curr - 1); return this.current(); }
    };
  };
})(jQuery);