angular.module('SteroidsApplication')
    .factory('helpers', function() {

        return {
            makeComparable: function(str) {
                return str.replace(/ä/g, "a").replace(/ö/g, "o").split(' ').join('-').toLowerCase();
            },

            constructSplitting: function(splittable, divisible) {
                var returnArr = [];
                var start = 0;
                var end = divisible;

                for (var i = 0; i < Math.ceil(splittable.length/divisible); i++) {
                    returnArr.push(splittable.slice(start, end));
                    start += divisible;
                    end += divisible;
                }

                return returnArr;
            }

        };
    });
