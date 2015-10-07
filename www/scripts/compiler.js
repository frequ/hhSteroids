angular.module('SteroidsApplication')
    .directive('compile', function($compile, supersonic) {

        return {
            restrict: 'A',
            replace: true,
            link: function(scope, element, attrs) {

                scope.url = undefined;

                scope.openUrl = function() {
                    supersonic.logger.log('in openurl ' + scope.url);
                    supersonic.app.openURL(scope.url);
                };

                scope.$watch(attrs.compile, function(html) {
                    //fugly hack but does the trick - url as a function parameter doesn't seem to work
                    if (attrs.url) {
                        scope.url = attrs.url;
                        var index = html.indexOf('<button') + 7;
                        html = html.slice(0,index) + " ng-click=\"openUrl()\" " + html.slice(index);
                    }

                    element.html(html);
                    $compile(element.contents())(scope);
                }, true);

            }
        };
    });
