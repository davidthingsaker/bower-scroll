(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['EventEmitter'], function(EventEmitter) {
    var SuperScroll;
    return SuperScroll = (function(_super) {
      __extends(SuperScroll, _super);

      function SuperScroll(container) {
        this.container = container;
        this.scrollTo = __bind(this.scrollTo, this);
        this.scrollPercent = __bind(this.scrollPercent, this);
        this.handleMouseMove = __bind(this.handleMouseMove, this);
        this.trackClick = __bind(this.trackClick, this);
        this.trackHandle = __bind(this.trackHandle, this);
        this.trackScroll = __bind(this.trackScroll, this);
        this.throttleResize = __bind(this.throttleResize, this);
        this.onResize = __bind(this.onResize, this);
        this.hideScroll = __bind(this.hideScroll, this);
        this.showScroll = __bind(this.showScroll, this);
        SuperScroll.__super__.constructor.call(this);
        document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/, 'js');
        this.scrollPercentDecimal = 0;
        this.scrollContent = this.wrapScrollContent();
        this.scrollBar = this.addScrollBar();
        this.scrollContent.scrollTo = this.scrollTo;
        this.maxScroll = Math.max(0, this.scrollContent.getHeight() - this.container.getHeight());
        this.maxHandleTop = this.scrollBar.getHeight() - this.handle.getHeight();
        container.addEvent('mousewheel:relay(".scroll-content")', this.trackScroll);
        container.addEvent('mousedown:relay(".handle")', this.trackHandle);
        container.addEvent('click:relay(".scrollBar")', this.trackClick);
        document.window.addEvent('resize', this.onResize);
        if (this.scrollContent.getHeight() > this.container.getHeight()) {
          this.showScroll();
        }
      }

      SuperScroll.prototype.showScroll = function() {
        return this.scrollBar.removeClass('hidden');
      };

      SuperScroll.prototype.hideScroll = function() {
        return this.scrollBar.addClass('hidden');
      };

      SuperScroll.prototype.onResize = function() {
        if (this.resizeTimeout != null) {
          clearTimeout(this.resizeTimeout);
          return this.resizeTimeout = this.throttleResize();
        } else {
          return this.resizeTimeout = this.throttleResize();
        }
      };

      SuperScroll.prototype.throttleResize = function() {
        var _this = this;
        return setTimeout(function() {
          _this.maxScroll = Math.max(0, _this.scrollContent.getHeight() - _this.container.getHeight());
          _this.maxHandleTop = _this.scrollBar.getHeight() - _this.handle.getHeight();
          _this.scrollPercent(_this.scrollPercentDecimal);
          if (_this.scrollContent.getHeight() > _this.container.getHeight()) {
            return _this.showScroll();
          } else {
            return _this.hideScroll();
          }
        }, 100);
      };

      SuperScroll.prototype.wrapScrollContent = function() {
        this.container.setStyles({
          position: "relative",
          overflow: "hidden"
        });
        this.container.innerHTML = '<div class="scroll-content">' + this.container.innerHTML + '<\/div>';
        return this.container.getChildren('.scroll-content')[0].setStyles({
          height: "auto",
          overflow: "hidden"
        });
      };

      SuperScroll.prototype.addScrollBar = function() {
        var scrollBar;
        scrollBar = new Element('div', {
          "class": 'scrollBar hidden',
          styles: {
            position: "absolute",
            height: "100%",
            top: "0px",
            right: "0px",
            cursor: "pointer"
          }
        }).grab(this.createHandle()).inject(this.container);
        return scrollBar;
      };

      SuperScroll.prototype.createHandle = function() {
        return this.handle = new Element('div', {
          "class": 'handle',
          styles: {
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%"
          }
        });
      };

      SuperScroll.prototype.trackScroll = function(event) {
        var currentMargin, deltaY, newScroll;
        deltaY = event.wheel * 20;
        currentMargin = -1 * this.scrollContent.getStyle('margin-top').toInt();
        newScroll = (currentMargin - deltaY).limit(0, this.maxScroll);
        if (newScroll < this.maxScroll && newScroll > 0) {
          event.stop();
          return this.scrollPercent(newScroll / this.maxScroll);
        }
      };

      SuperScroll.prototype.trackHandle = function(event) {
        var _this = this;
        event.stop();
        this.clientY = event.client.y;
        window.addEvent('mousemove', this.handleMouseMove);
        return window.addEvent('mouseup', function() {
          return window.removeEvent('mousemove', _this.handleMouseMove);
        });
      };

      SuperScroll.prototype.trackClick = function(event) {
        var barY, clickedY, newTop;
        if (event.target.hasClass('scrollBar')) {
          clickedY = event.client.y;
          barY = this.scrollBar.getPosition().y - window.getScroll().y;
          newTop = clickedY - barY;
          return this.scrollPercent(newTop / this.maxHandleTop);
        }
      };

      SuperScroll.prototype.handleMouseMove = function(event) {
        var deltaY, handleTop, newTop;
        deltaY = this.clientY - event.client.y;
        this.clientY = event.client.y;
        handleTop = this.handle.getStyle('top').toInt();
        newTop = handleTop - deltaY;
        return this.scrollPercent(newTop / this.maxHandleTop);
      };

      SuperScroll.prototype.scrollPercent = function(percent) {
        var decimal;
        decimal = percent.limit(0, 1);
        this.scrollPercentDecimal = percent;
        this.handle.setStyle('top', this.maxHandleTop * decimal);
        return this.scrollContent.setStyle('margin-top', -1 * (this.maxScroll * decimal));
      };

      SuperScroll.prototype.scrollTo = function(x, y) {
        return this.scrollPercent(y / this.maxScroll);
      };

      return SuperScroll;

    })(EventEmitter);
  });

}).call(this);
