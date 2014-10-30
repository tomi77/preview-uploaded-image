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
            previews.appendChild(canvas);
            var ctx = canvas.getContext('2d');

            img.onload = (function (ctx) {
                return function (e) {
                    ctx.drawImage(e.target, 0, 0, 150, 150);
                };
            })(ctx);

            reader.onload = (function (img) {
                return function (e) {
                    img.src = e.target.result;
                }
            })(img);
            reader.readAsDataURL(file);
        }
    };
})(window);