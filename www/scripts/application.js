angular.module('SteroidsApplication', [
  'supersonic',
  'ngRoute'
])

.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .when('/category/:categoryId', {
            templateUrl: 'views/category.html',
            controller: 'CategoryCtrl',
            controllerAs: 'category'
        })
        .when('/category/:categoryId/subcategory/:subcategoryId', {
            templateUrl: 'views/subcategory.html',
            controller: 'SubcategoryCtrl',
            controllerAs: 'subcategory'
        })
        .when('/category/:categoryId/:eventId', {
            templateUrl: 'views/event.html',
            controller: 'EventCtrl',
            controllerAs: 'event'
        })
        .otherwise({
            redirectTo: '/'
        });
});
