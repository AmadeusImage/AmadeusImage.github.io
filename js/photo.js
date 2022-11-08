var imgDataPath = '/photos/data.json'; //图片名称高宽信息json文件路径
var imgPath = '/images/photos/';  //图片访问路径
var imgMaxNum = 50000; //图片显示数量

var windowWidth = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;
if (windowWidth < 768) {
    var imageWidth = 145; //图片显示宽度(手机端)
} else {
    var imageWidth = 215; //图片显示宽度
}

photo = {
    page: 1,
    offset: imgMaxNum,
    init: function () {
        var that = this;
        $.getJSON(imgDataPath, function (data) {
            that.render(that.page, data);
            //that.scroll(data);
        });
		console.log("Finish parse JSON");
    },
    render: function (page, data) {
		//console.log("Hello World");
        var begin = (page - 1) * this.offset;
        var end = page * this.offset;
		var data_ = data.list[0].arr;
        if (begin >= data_.link.length) return;
        var html, imgNameWithPattern, imgName, imageSize, imageX, imageY, li = "";
		
        //for (var i = begin; i < end && i < data_.link.length; i++) {
		for (var i = data_.link.length - 1; i > -1; i--) {
			//if (Math.random() > 0.5)
			var src = 'https://cdn.jsdelivr.net/gh/AmadeusImage/X@main/photos/' +data_.link[i];
			//else
			//	src = 'https://raw.githubusercontent.com/AmadeusImage/X/main/photos/' + data.list[0].arr.link[i];
            //imgNameWithPattern = data[i].split(' ')[1];
            imgName = data_.text[i];//imgNameWithPattern.split('.')[0];
            //imageSize = data[i].split(' ')[0];
            imageX = '512';//imageSize.split('.')[0];
            imageY = '768';//imageSize.split('.')[1];
            li += '<div class="card" style="width:' + imageWidth + 'px" >' +
                    '<div class="ImageInCard" style="height:'+ imageWidth * imageY / imageX + 'px">' +
                      '<a data-fancybox="gallery" href="' + src + '" data-caption="' + imgName + '" title="' +  imgName + '">' +
                        '<img data-src="' + src + ' " src="' + src + ' " data-loaded="true">' +
                      '</a>' +
                    '</div>' +
                  '</div>';
        }
		console.log("Finish html");
        $(".ImageGrid").append(li);
		console.log("Finish append");
		$(".main-inner").append("<style>.main-inner { width: " + window.innerWidth*0.95 +  "px; }</style>");
		$(".content.page.posts-expand").append("<style>.content { padding-top: 0px; }</style>");
        //this.minigrid();
		console.log("Finish render");
    },
    minigrid: function() {
        var grid = new Minigrid({
            container: '.ImageGrid',
            item: '.card',
            gutter: 12
        });
        grid.mount();
        $(window).resize(function() {
           grid.mount();
        });
    }
}
photo.init();