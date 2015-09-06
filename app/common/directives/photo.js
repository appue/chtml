angular.module('Tjoys')

// H5上传图片
.directive('appFilereader', function(
    $q,
    $parse,
    widget
) {
    var slice = Array.prototype.slice;

    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
                if (!ngModel) return;

                ngModel.$render = function() {
                    // alert(2);
                };

                element.bind('change', function(e) {
                    var element = e.target;

                    $q.all(slice.call(element.files, 0).map(readFile))
                        .then(function(values) {
                            if (!values || values.length == 0) {
                                return;
                            };

                            if (element.multiple) {

                                angular.forEach(values, function (v, k) {
                                    pushImages(v);
                                });

                            } else {

                                pushImages(values[0]);

                            }

                            widget.cacheData("CameraImages", scope.CameraImages);
                        });

                    function readFile(file) {
                        var deferred = $q.defer(),
                            reader = new FileReader();

                        reader.onload = function(e) {
                            deferred.resolve(e.target.result);
                        };

                        reader.onerror = function(e) {
                            deferred.reject(e);
                        };

                        reader.readAsDataURL(file);

                        return deferred.promise;
                    }

                    function pushImages(imageData) {
                        var canvas = angular.element(document.querySelector('#tmp'))[0],
                            ctx = canvas.getContext("2d"),
                            image = new Image();

                        image.onload = function() {

                            EXIF.getData(image, function() {
                                var exif = EXIF.pretty(this);

                                var orientation = exif ? exif.Orientation : 1;

                                ctx.drawImage(image, 0, 0);

                                var mpImg = new MegaPixImage(image);

                                mpImg.render(canvas, {
                                    maxWidth: 1000,
                                    quality: 1,
                                    orientation: orientation
                                }, function () {
                                    var data = canvas.toDataURL("image/jpeg");

                                    ngModel.$setViewValue(data);
                                });
                            });
                        };


                        image.src = imageData;
                    }

                }); //change

            } //link
    }; //return
});