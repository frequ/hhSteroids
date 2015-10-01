angular.module('SteroidsApplication')
    .directive('compile', function($compile) {

        return {
            restrict: 'A',
            replace: true,
            link: function(scope, element, attrs) {

                scope.$watch(attrs.compile, function(html) {

                    //fugly hack but does the trick
                    //if there is no externalUrl in event obj, then it seems to come here as a string
                    if (attrs.url && attrs.url !== "event.externalUrl") {
                        var index = html.indexOf('<button') +7;
                        html = html.slice(0,index) + " ng-click=\"openUrl("+attrs.url+")\" " + html.slice(index);
                    }

                    element.html(html);
                    $compile(element.contents())(scope);
                }, true);

            }
        };
    });
