angular.module('SteroidsApplication')
    .controller('EventCtrl', function(supersonic, $scope, $routeParams, $http, $sce, $rootScope) {

        var eventId = $routeParams.eventId;
        var categoryId = $routeParams.categoryId;
        $scope.event = {};

        var findEvent = function() {
            var promise = $http.get('assets/json/' + categoryId +'.json');
            promise
                .success(function(data) {

                    if (data.events) {
                        $scope.event = data.events[eventId];
                    }else{
                        $scope.event = data[eventId];
                    }

                    $rootScope.viewTitle = $scope.event.name;

                    if ($scope.event.videoId) {
                        var protocol = location.protocol;
                        $scope.ytUrl = $sce.trustAsResourceUrl(protocol+"//www.youtube.com/embed/"+ $scope.event.videoId +"?rel=0");
                    }

                })
                .error(function() {
                    supersonic.logger.warn('Error fetching category data for '+categoryId);
                });
        };
        findEvent();

    });
