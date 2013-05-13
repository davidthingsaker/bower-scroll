(function() {
  require(['Scroll', 'mootools', 'domReady!'], function(SuperScroll) {
    var longContent, _i, _len, _ref, _results;

    console.log('main init');
    _ref = $$('.superScroll');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      longContent = _ref[_i];
      _results.push(new SuperScroll(longContent));
    }
    return _results;
  });

}).call(this);
