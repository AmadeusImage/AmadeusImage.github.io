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
    json: [],
    init: function () {
        var that = this;
        $.getJSON(imgDataPath, function (data) {
            that.json.push(data);
            //that.render(that.page, data);
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
        var imgName, imageX, imageY, li = "";
        var ipt_dt = ipt.value.split('.');
        //for (var i = begin; i < end && i < data_.link.length; i++) {

        for (var i = data.y.length - 1; i > -1; i--) {
            if (ipt_dt.length == 4)
                if (ipt_dt[1] != data.y[i] || ipt_dt[2] != data.m[i] || ipt_dt[3] != data.d[i])
                    continue
            if (!data.prompt[i].toLowerCase().includes(ipt_dt[0].toLowerCase()))
                continue
            
			//if (Math.random() > 0.5)
			var src = 'https://cdn.jsdelivr.net/gh/AmadeusImage/X@main/photos/' +data.fname[i];
			//else
			//	var src = 'https://raw.githubusercontent.com/AmadeusImage/X/main/photos/' +data.fname[i];
            //imgNameWithPattern = data[i].split(' ')[1];
            imgName = data.prompt[i];//imgNameWithPattern.split('.')[0];
            //imageSize = data[i].split(' ')[0];
            imageX = data.w[i];
            imageY = data.h[i];
            li += '<div class="card" style="width:' + imageWidth + 'px" >' +
                    '<div class="ImageInCard" style="height:'+ imageWidth * imageY / imageX + 'px">' +
                        '<a data-fancybox="gallery" href="' + src + '" data-caption="' + imgName + '" title="' + imgName + '">' +
                            '<img data-src="' + src + ' " src="' + src + '">' + //loading="lazy"
                      '</a>' +
                    '</div>' +
                  '</div>';
        }
		console.log("Finish html");
        $(".ImageGrid").append(li);
        $(".main-inner").append("<style>.main-inner { width: " + window.innerWidth * 0.95 + "px; }</style>");
        console.log("Finish append");
        //this.minigrid();
    },
}
photo.init();