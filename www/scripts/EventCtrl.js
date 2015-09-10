angular.module('SteroidsApplication')
    .controller('EventCtrl', function(supersonic, $scope, $routeParams, $http, $sce, $rootScope) {

        var eventId = $routeParams.eventId;
        var categoryId = $routeParams.categoryId;
        $scope.event = {};

        $scope.findEvent = function(){
            var promise = $http.get('assets/json/' + categoryId +'.json');
            promise
                .success(function(data) {
                    $scope.event = data.events[eventId];
                    $rootScope.viewTitle = $scope.event.name;

                    if ($scope.event.content && typeof $scope.event.content === "string") {
                        $scope.event.content = $sce.trustAsHtml($scope.event.content);
                    }

                    if ($scope.event.videoId) {
                        var protocol = location.protocol;
                        $scope.ytUrl = $sce.trustAsResourceUrl(protocol+"//www.youtube.com/embed/"+ $scope.event.videoId +"?rel=0");
                    }

                })
                .error(function() {
                    supersonic.logger.warn('Error fetching category data for '+categoryId);
                });



        };
        $scope.findEvent();

    });
