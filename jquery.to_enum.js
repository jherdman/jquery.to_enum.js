/**
 * @author James F. Herdman (james.herdman@me.com)
 * @license MIT License
 */
(function ($) {
  /**
   * Returns a JavaScript object that allows for cyclical enumerability. This
   * means that advancing to the next item in the collection will return the
   * first item in the collection.
   */
  $.fn.toEnum = function () {
    var $elems = this
      , curr   = 0;

    function adjIdx (idx) {
      if (idx >= $elems.length) {
        return 0;
      } else if (idx < 0) {
        return $elems.length - 1;
      } else {
        return idx;
      }
    }

    function get (idx) {
      return $($elems[adjIdx(idx)]);
    }

    return {
        current  : function () { return get(curr); }
      , next     : function () { return get(curr + 1); }
      , previous : function () { return get(curr - 1); }
      , advance  : function () { curr = adjIdx(curr + 1); return this.current(); }
      , rewind   : function () { curr = adjIdx(curr - 1); return this.current(); }
    };
  };
})(jQuery);