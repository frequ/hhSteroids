angular.module('SteroidsApplication')
.directive('roulette', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/roulette.html',
        scope: {
            content: '='
        },

        link: function(scope, element) {

            scope.running = false;

            scope.spin = function() {
                scope.running = true;

            };

            scope.back = function() {
                scope.$parent.showRoulette = false;
                //TODO call reset
            };

            scope.$watch('content', function(newVal, oldVal) {
                if(newVal.length > 0) {
                    supersonic.logger.log('building roulette');
                    scope.content = newVal;
                    buildRoulette(scope, scope.content);
                }
            });

            function shuffle(array) {
                var currentIndex = array.length, temporaryValue, randomIndex ;

                // While there remain elements to shuffle...
                while (0 !== currentIndex) {

                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }

                return array;
            }

            function buildRoulette(scope, content) {
                scope.items = [];

                //create 6 random indexes and repeat 4 to end
                var items = shuffle(content);
                var repeat = items.slice(0,4);
                items = items.slice(0,6);
                scope.items = items.concat(repeat);

                //supersonic.logger.log(scope.items);
                var options = {
                    target_borders: 2,
                    target_margins: 2,
                    target_height: 45,
                    item_count: 10,
                    start_spintime: 5000, //5sek
                    start_offset: -(7*49) //items + outerborder 5px
                };

                var spinner = angular.element( document.querySelector('.spinner-item-wrap') );
                spinner.css('top','-1px');



            }



        }
    };
});
