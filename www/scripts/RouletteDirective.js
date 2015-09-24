angular.module('SteroidsApplication')
.directive('roulette', function($interval, $timeout) {
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
                mainLoop();
            };

            scope.back = function() {
                scope.$parent.showRoulette = false;
                reset();
            };

            scope.$watch('content', function(newVal, oldVal) {
                if(newVal.length > 0) {
                    scope.content = newVal;
                    buildRoulette(scope, scope.content);
                }
            });

            function move(marginTop) {
                jQuery('.spinner-item-wrap').css('margin-top', marginTop + 'px');
            }

            function mainLoop() {

                var spinnerPos = -1,
                    roundsDone = 0,
                    totalRounds = 4,
                    spinnerMoveInterval = 25,
                    stopRecursiveCalling = false,
                    slotHeight = 49;

                function timeout() {

                    scope.looper = $timeout(function () {

                        spinnerPos -= 4;
                        move(spinnerPos);

                        if (spinnerPos <= -289) {

                            //reset spinner so it seems to be going around
                            spinnerPos = -1;
                            roundsDone++;
                            move(spinnerPos);

                        }else if (roundsDone >= totalRounds) {

                            //slow down spinner
                            spinnerMoveInterval += 1;

                            if (spinnerMoveInterval >= 75) {
                                var stopPosition = (Math.round(spinnerPos / slotHeight) * slotHeight) + 3;
                                var winnerEvent = scope.items[5];

                                $timeout.cancel(scope.looper);
                                stopRecursiveCalling = true;

                                scope.finalInterval = $interval(function() {

                                    if (spinnerPos === stopPosition) {
                                        $interval.cancel(scope.finalInterval);

                                        //show modal and wait for resetting so that user doesn't see it
                                        $timeout(function(){
                                            supersonic.ui.modal.show('#/category/roulette/' + winnerEvent.id);
                                        }, 500);
                                        $timeout(function() {
                                            reset();
                                        }, 1500);

                                    }else if (spinnerPos < stopPosition) {
                                        spinnerPos++;
                                    }else if (spinnerPos > stopPosition) {
                                        spinnerPos--;
                                    }
                                    move(spinnerPos);

                                }, spinnerMoveInterval);

                            }
                        }

                        if (!stopRecursiveCalling) {
                            timeout();
                        }

                    }, spinnerMoveInterval);
                }
                timeout();
            }

            function shuffle(array) {
                var currentIndex = array.length, temporaryValue, randomIndex;

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

                //create 6 random indexes and repeat 3 to end
                var items = shuffle(content);
                var repeat = items.slice(0,3);
                items = items.slice(0,6);
                scope.items = items.concat(repeat);
                move(-1);

            }

            function reset() {
                scope.running = false;
                buildRoulette(scope, scope.content);
                $timeout.cancel(scope.looper);
                $interval.cancel(scope.finalInterval);

            }
            
        }
    };
});
