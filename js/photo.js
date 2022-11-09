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
        var ipt = document.getElementById("promptIpt");
        if (ipt.value == '')
            return;
        console.log(ipt.value);
        //ipt.setAttribute('style', 'position:relative;top:0%;left:50%;transform:translate(-50%,-50%);text-align:center;');
        //ipt.style.color = 'white';
        var begin = (page - 1) * this.offset;
        var end = page * this.offset;
        if (begin >= data.y.length) return;
        var html, imgNameWithPattern, imgName, imageSize, imageX, imageY, li = "";
		
        //for (var i = begin; i < end && i < data_.link.length; i++) {
        for (var i = data.y.length - 1; i > -1; i--) {
            if (data.prompt[i].search(ipt.value) == -1)
                continue
			//if (Math.random() > 0.5)
			var src = 'https://cdn.jsdelivr.net/gh/AmadeusImage/X@main/photos/' +data.fname[i];
			//else
			//	src = 'https://raw.githubusercontent.com/AmadeusImage/X/main/photos/' + data.list[0].arr.link[i];
            //imgNameWithPattern = data[i].split(' ')[1];
            imgName = data.prompt[i];//imgNameWithPattern.split('.')[0];
            //imageSize = data[i].split(' ')[0];
            imageX = data.w[i];
            imageY = data.h[i];
            li += '<div class="card" style="width:' + imageWidth + 'px" >' +
                    '<div class="ImageInCard" style="height:'+ imageWidth * imageY / imageX + 'px">' +
                      '<a data-fancybox="gallery" href="' + src + '" data-caption="' + imgName + '">' +
                        '<img data-src="' + src + ' " src="' + src + ' " data-loaded="true">' +
                      '</a>' +
                    '</div>' +
                  '</div>';
        }
		console.log("Finish html");
        $(".ImageGrid").append(li);
		console.log("Finish append");
		$(".main-inner").append("<style>.main-inner { width: " + window.innerWidth*0.95 + "px; }</style>");
        //this.minigrid();
        console.log("Finish render");
    },

}
photo.init();