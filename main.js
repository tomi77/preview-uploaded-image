(function (self) {
    var previews;

    self.init = function init() {
        previews = document.getElementById('previews');

        var dropbox = document.getElementById("dropbox");
        dropbox.addEventListener("dragenter", dragenter, false);
        dropbox.addEventListener("dragover", dragover, false);
        dropbox.addEventListener("drop", drop, false);

        function dragenter(e) {
            e.stopPropagation();
            e.preventDefault();
        }

        function dragover(e) {
            e.stopPropagation();
            e.preventDefault();
        }

        function drop(e) {
            e.stopPropagation();
            e.preventDefault();

            var dt = e.dataTransfer;
            var files = dt.files;

            handleFiles(files);
        }

        var a = document.getElementById('fileSelect');
        a.addEventListener('click', function (e) {
            var inp = document.getElementById('fileElem');
            if (inp) {
                inp.click();
            }
            e.preventDefault();
        }, false);
    };

    self.handleFiles = function (files) {
        previews.innerHTML = '';

        for (var i = 0, numFiles = files.length; i < numFiles; ++i) {
            var file = files[i];

            if (!file.type.match(/image\/(png|jpeg)/)) {
                continue;
            }

            createThumbnail(file);
        }
    };

    function createThumbnail(file) {
        var reader = new FileReader();
        var img = document.createElement('img');
        var canvas = document.createElement('canvas');
        canvas.width = canvas.height = 150;
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
})(window);