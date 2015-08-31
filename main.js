(function (self) {
    var previews; // handler to preview area
    var width, height; // thumbnails dimension
    var dropboxId; // Hook to dropbox area
    var fileSelectorInputId; // Hook to <input type='file'>
    var fileSelectorId; // Hook to file selector element

    /**
     * Initialize application
     * @param options
     */
    self.init = function init(options) {
        options = options || {};
        previews = document.getElementById(options.previews_id || 'previews');
        width = options.width || 150;
        height = options.height || 150;
        dropboxId = options.dropbox_id || 'dropbox';
        fileSelectorInputId = options.file_selector_input_id || 'file_selector_input';
        fileSelectorId = options.file_selector_id || 'file_selector';

        enableDropbox();
        enableFileSelector();
    };

    /**
     * Handle DnD and <input type='file'> events
     * @param files
     */
    function handleFiles(files) {
        previews.innerHTML = '';

        for (var i = 0, numFiles = files.length; i < numFiles; ++i) {
            var file = files[i];

            if (!file.type.match(/image\/(png|jpeg)/)) {
                continue;
            }

            createThumbnail(file);
        }
    }

    /**
     * Configure <input type='file'> element
     */
    function enableFileSelector() {
        var fileSelector = document.getElementById(fileSelectorId);
        var fileSelectorInput = document.getElementById(fileSelectorInputId);

        fileSelector.addEventListener('click', function (e) {
            fileSelectorInput.click();
        }, false);

        fileSelectorInput.addEventListener('change', function (e) {
            handleFiles(e.target.files);
        });
    }

    /**
     * Configure dropbox (drag'n'drop drop area)
     */
    function enableDropbox() {
        var dropbox = document.getElementById(dropboxId);

        dropbox.addEventListener('dragenter', function (e) {
            e.stopPropagation();
            e.preventDefault();
        }, false);
        dropbox.addEventListener('dragover', function (e) {
            e.stopPropagation();
            e.preventDefault();
        }, false);
        dropbox.addEventListener('drop', function (e) {
            e.stopPropagation();
            e.preventDefault();

            handleFiles(e.dataTransfer.files);
        }, false);
    }

    /**
     * Create thumbnail
     * @param file
     */
    function createThumbnail(file) {
        var reader = new FileReader();
        var img = document.createElement('img');
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        previews.appendChild(canvas);

        img.onload = (function (canvas) {
            return function (e) {
                canvas.getContext('2d').drawImage(e.target, 0, 0, width, height);
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