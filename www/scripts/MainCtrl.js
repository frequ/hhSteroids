angular.module('SteroidsApplication')
    .controller('MainCtrl', function ($scope, supersonic, $http, $rootScope) {

        $rootScope.viewTitle = "Hyvinvointiteekki";

        $scope.init = function() {
            var promise = $scope.req = $http.get('assets/json/categories.json');
            promise
                .success(function(data){

                    var counter = 0;
                    var categories = [];
                    data.forEach(function(category){

                        var obj = {
                            "name": category,
                            "id": category.replace(/ä/g, "a").replace(/ö/g, "o").split(' ').join('-').toLowerCase()
                        };

                        categories.push(obj);
                        counter++;

                    });
                    $scope.splitMainCategories = [categories.slice(0,3),categories.slice(3,6),categories.slice(6,9)];
                })
                .error(function(){
                    supersonic.logger.warn('error fetching static content from json');
                });
        };
        $scope.init();

    });
