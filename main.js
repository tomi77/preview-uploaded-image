(function (self) {
    var previews;

    self.init = function init () {
        previews = document.getElementById('previews');
    };

    self.handleFiles = function (files) {
        previews.innerHTML = '';

        for (var i = 0, numFiles = files.length; i < numFiles; ++i) {
            var file = files[i];

            if (!file.type.match(/image\/(png|jpeg)/)) {
                continue;
            }

            var reader = new FileReader();
            var img = document.createElement('img');
            var canvas = document.createElement('canvas');
            canvas.width = canvas.height = 150;
            canvas.onclick = function () {
                window.open();
            };
            previews.appendChild(canvas);

            img.onload = (function (canvas) {
                return function (e) {
                    canvas.getContext('2d').drawImage(e.target, 0, 0, 150, 150);
                    canvas.onclick = function () {
                        window.open(e.target.src);
                    };
                };
            })(canvas);

            reader.onload = (function (img) {
                return function (e) {
                    img.src = e.target.result;
                }
            })(img);
            reader.readAsDataURL(file);
        }
    };
})(window);