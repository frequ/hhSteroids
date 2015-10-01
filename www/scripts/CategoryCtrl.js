angular.module('SteroidsApplication')
.controller('CategoryCtrl', function ($scope, supersonic, $http, $routeParams, $sce, $rootScope, $window, helpers) {

    $scope.events = [];
    $scope.eventsName = "";
    $scope.hasSubcategories = false;

    $scope.categoryId = $routeParams.categoryId;

    var getCategoryById = function() {
        var promise = $http.get('assets/json/' + $scope.categoryId +'.json');
        promise
        .success(function(data) {
            var subcats = [];

            if (data.subcategories) {
                $scope.hasSubcategories = true;

                data.subcategories.forEach(function(subcategory) {
                    var obj = {
                        "name": subcategory.name,
                        "lead": subcategory.lead,
                        "id": subcategory.name.replace(/ä/g, "a").replace(/ö/g, "o").split(' ').join('-').toLowerCase()
                    };

                    subcats.push(obj);
                });

                $scope.splitSubcats = helpers.constructSplitting(subcats, 3);
            }

            $scope.eventsName = data.name;
            $rootScope.viewTitle = data.name;
            $scope.splitEvents = helpers.constructSplitting(data.events, 3);
            $scope.eventsLead = $sce.trustAsHtml(data.lead);

        })
        .error(function() {
            supersonic.logger.warn('Error fetching categorydata for '+$routeParams.categoryId);
        });
    };
    getCategoryById();

    $scope.openUrl = function(url) {
        supersonic.app.openURL(url);
    };

});
