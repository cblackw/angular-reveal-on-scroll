(function (angular) {
    angular
    .module("revealOnScrollModule", [])
    .directive("revealOnScroll", function () {
        var $window = angular.element(window),
            win_height_padded = $window.prop("innerHeight") * 1.1,
            toAnimate = [];
        $window.on('scroll', revealOnScroll);

        function link(scope, element, attrs) {
            var properties = {
                element: element,
                animation: '',
                delay: null
            };

            var obj;
            try {
                obj = angular.fromJson(attrs.revealOnScroll);
            } catch (ex) {
                obj = attrs.revealOnScroll;
            }

            if (angular.isObject(obj)) {
                if (obj.animation) {
                    properties.animation = obj.animation;
                }
                if (obj.delay) {
                    properties.delay = obj.delay;
                }
            } else if (angular.isString(obj)) {
                properties.animation = obj;
            }

            toAnimate.push(properties);
        }

        function revealOnScroll() {
            var scrolled = $window.prop("pageYOffset");
            angular.forEach(toAnimate, function (value) {
                var revealProperties = value,
                    unwrappedElement = revealProperties.element[0],
                    offsetHeight = unwrappedElement.offsetHeight,
                    boundingRect = unwrappedElement.getBoundingClientRect();

                if (boundingRect.top >= 0 && boundingRect.bottom - offsetHeight < (window.innerHeight || document.documentElement.clientHeight)) {
                    if (revealProperties.delay) {
                        window.setTimeout(function () {
                            revealProperties.element.addClass('animated ' + revealProperties.animation);
                        }, parseInt(revealProperties.delay, 10));
                    } else {
                        revealProperties.element.addClass('animated ' + revealProperties.animation);
                    }
                }
            });
        }

        return {
            link: link
        };
    });
}(window.angular))
