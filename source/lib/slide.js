(function(window, document) {
    var document = window.document,
        support = {
            transform3d: ("WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix()),
            touch: ("ontouchstart" in window)
        };

    var unit = (function () {
        var fn = {};

        fn.addEvent = function (el, type, fn) {
            el.addEventListener(type, fn, false);
        };

        fn.removeEvent = function (el, type, fn) {
            el.removeEventListener(type, fn, false);
        };

        fn.getPage = function (event, page) {
            return event.changedTouches[0][page];
        };

        fn.getTranslate = function (x, y) {
            var distX = x,
                distY = y;

            return support.transform3d ? "translate3d(" + distX + "px, " + distY + "px, 0)" : "translate(" + distX + "px, " + distY + "px)";
        };

        fn.eventStop = function (e) {
            e.preventDefault();
            e.stopPropagation();
        };

        fn.getTriangleSide = function(x1, y1, x2, y2){
            var x = Math.abs(x1 - x2),
                y = Math.abs(y1 - y2),
                z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

            return {
                x: x,
                y: y,
                z: z
            };
        };

        fn.getAngle = function (triangle) {
            var cos = triangle.y / triangle.z,
                radina = Math.acos(cos);

            return 180 / (Math.PI / radina);
        };

        return fn;
    })();

    /*
    * @params:
    *     el: dom
    */
    var slideImage = function(el) {
        var self = this;

        self.wrapper = typeof el == 'string' ? document.querySelector(el) : el;

        self.current = 0;

        self.newX = 0;

        self.w = self.wrapper.offsetWidth;

        self.len = self.wrapper.querySelectorAll('ul li').length;

        self._init();
    };

    slideImage.prototype = {
        _init: function () {
            var self = this;

            // self._createHtml();

            self._initEvents();
        },

        _createHtml: function () {
            var self = this;

            var ol = document.createElement('ol');
                str = '';

            if (self.len > 0) {
                for (var i=0; i<self.len; i++) {
                    var a = '';

                    if (i == 0) {
                        a = '<li class="current"></li>';
                    } else {
                        a = '<li></li>';
                    }

                    str += a;
                }
            }

            ol.innerHTML = str;

            self.wrapper.appendChild(ol);
        },

        _start: function (e) {
            var self = this;

            self.basePageX = unit.getPage(e, "pageX");
            self.basePageY = unit.getPage(e, "pageY");

            self.scrolling = true;
            self.moveReady = false;
        },

        _move: function (e) {
            var self = this;

            if (!self.scrolling) {
                return;
            }

            var pageX = unit.getPage(e, "pageX"),
                pageY = unit.getPage(e, "pageY"),
                distX,
                distY,
                moveX = 0;

            if (self.moveReady) {
                unit.eventStop(e);

                distX = pageX - self.basePageX;
                distY = pageY - self.basePageY;

                self.moveX = distX;
                self.moveY = distY;

                if (self.current > 0 && self.current < self.len - 1) {
                    moveX = distX + self.newX;
                } else {
                    moveX = distX/3 + self.newX;
                }

                self._refresh({
                    'e': e,
                    'x': moveX,
                    'y': 0,
                    'timer': '0s',
                    'type': 'ease'
                });

            } else {
                var triangle = unit.getTriangleSide(self.basePageX, self.basePageY, pageX, pageY);

                if (triangle.z > 5) {

                    if (unit.getAngle(triangle) > 55) {
                        
                        self.moveReady = true;

                    } else {

                        self.scrolling = false;

                    }
                }
            }
        },

        _end: function (e) {
            var self = this;

            if (self.moveX < 0) {
                if (self.moveX < - 80) {
                    if (self.current < self.len - 1) {
                        self.current++;
                    }
                }
            } else {
                if (self.moveX > 80) {
                    if (self.current > 0) {
                        self.current--;
                    }
                }
            }

            self._refresh({
                'e': e,
                'x': -self.current * self.w,
                'y': 0,
                'timer': '0.5s',
                'type': 'ease-in-out'
            });

            self.newX = -self.current * self.w;

            self._changedCurrent();
        },

        _refresh: function (params) {
            var self = this,
                el = self.wrapper.querySelector('ul');

            el.style.setProperty('-webkit-transition', '-webkit-transform '+ params.timer +' '+ params.type);
            el.style.setProperty('-webkit-transform', unit.getTranslate(params.x, params.y));
        },

        _changedCurrent: function() {
            var self = this,
                el = self.wrapper.querySelectorAll('ol li');

            for (var i=0; i<self.len; i++) {
                el[i].className = '';
            }

            el[self.current].className = 'current';
        },

        _initEvents: function (remove) {
            var eventType = remove ? unit.removeEvent : unit.addEvent;

            eventType(this.wrapper, 'touchstart', this);
            eventType(this.wrapper, 'touchmove', this);
            eventType(this.wrapper, 'touchend', this);
        },

        handleEvent: function (e) {
            var self = this;

            switch (e.type) {
                case 'touchstart':
                    self._start(e);
                break;
                case 'touchmove':
                    self._move(e);
                break;
                case 'touchend':
                    self._end(e);
                break;
            }
        }
    }

    window.slideImage = slideImage;

})(window, document);