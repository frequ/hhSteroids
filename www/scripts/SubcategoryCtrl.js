angular.module('SteroidsApplication')
.controller('SubcategoryCtrl', function ($scope, supersonic, $http, $routeParams, $rootScope, $sce) {

    $scope.categoryId = $routeParams.categoryId;
    $scope.subcategoryId = $routeParams.subcategoryId;
    $scope.events = [];
    $scope.eventsLead = undefined;

    $scope.makeComparable = function(str) {
        return str.replace(/ä/g, "a").replace(/ö/g, "o").split(' ').join('-').toLowerCase();
    };

    var getSubcategoryContent = function() {
        var promise = $http.get('assets/json/' + $scope.categoryId + '.json');
        promise
            .success(function(data) {

                //get lead text
                if ( data && data.subcategories ) {
                    data.subcategories.forEach(function(subcategory) {
                        var nameCom = $scope.makeComparable(subcategory.name);
                        if (!$scope.eventsLead && nameCom === $scope.subcategoryId) {
                            $scope.eventsLead = $sce.trustAsHtml(subcategory.lead);
                            $rootScope.viewTitle = subcategory.name;
                        }
                    });
                }

                //get events that belong to subcategory
                if (data && data.events) {
                    var events = [];
                    data.events.forEach(function(item) {
                        var com = $scope.makeComparable(item.belongsTo);
                        if (com === $scope.subcategoryId) {
                            events.push(item);
                        }
                    });

                    $scope.events = events;

                }
            })
            .error(function() {
                supersonic.logger.warn('Error fetching subcategory data for ' + $scope.categoryId);
            });
    };
    getSubcategoryContent();

    $scope.openUrl = function(url) {
        supersonic.app.openURL(url);
    };

});
