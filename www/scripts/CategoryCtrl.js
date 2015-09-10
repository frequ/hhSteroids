angular.module('SteroidsApplication')
.controller('CategoryCtrl', function ($scope, supersonic, $http, $routeParams, $sce, $rootScope, $window) {

    $scope.events = [];
    $scope.eventsName = "";
    //$scope.eventsLead = "";
    $scope.hasSubcategories = false;
    $scope.inSubcategoryListing = false;

    $scope.categoryId = $routeParams.categoryId;

    $scope.getCategoryById = function() {
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

                $scope.subcategories = subcats;
            }

            $scope.eventsName = data.name;
            $rootScope.viewTitle = data.name;
            $scope.events = data.events;
            $scope.eventsLead = $sce.trustAsHtml(data.lead);

        })
        .error(function() {
            supersonic.logger.warn('Error fetching categorydata for '+$routeParams.categoryId);
        });
    };

    $scope.getCategoryById();


    supersonic.device.buttons.back.whenPressed(function() {
        $scope.back();
    });

    $scope.customizeNavBar = function() {

        var leftButton = new supersonic.ui.NavigationBarButton( {
            title: 'Takaisin',
            onTap: function() {
                $scope.back();
            }
        });

        var options = {
            overrideBackButton: true,
            buttons: {
                left: [leftButton]
            }
        };

        supersonic.ui.navigationBar.update(options);
    };


    // $scope.selectSubcategory = function(subcategory) {
    //
    //     $scope.selectedSubCategory = subcategory;
    //     $scope.inSubcategoryListing = true;
    //
    //     var events = [];
    //     $scope.eventsLead = "";
    //
    //     $scope.events.forEach(function(event){
    //         if(event.belongsTo === subcategory.name) {
    //             events.push(event);
    //         }
    //     });
    //
    //         $scope.events = events;
    //         $scope.eventsLead = $sce.trustAsHtml(subcategory.lead);
    //         $scope.hasSubcategories = false;
    //
    //         supersonic.logger.log('rlö');
    //         supersonic.logger.log($scope.eventsLead);
    //
    //         supersonic.ui.animate("slideFromRight").perform();
    // };

    // $scope.back = function(){
    //     supersonic.logger.log('back');
    //
    //
    //     if ($scope.inSubcategoryListing) {
    //
    //         $scope.$apply(function() {
    //             $scope.hasSubcategories = true;
    //
    //             $scope.events = [];
    //             $scope.events = $scope.parentEvents;
    //             $scope.eventsLead = $scope.parentEventsLead;
    //             $scope.eventsName = $scope.parentEventsName;
    //
    //             $scope.inSubcategoryListing = false;
    //
    //             supersonic.ui.animate("slideFromLeft").perform();
    //
    //             supersonic.logger.log($scope.eventsLead);
    //             supersonic.logger.log($scope.parentEventsLead);
    //         });
    //
    //     }else{
    //         supersonic.ui.layers.pop();
    //     }
    //};

});
