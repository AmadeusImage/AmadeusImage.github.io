var imgMaxNum = 10000000000;

var windowWidth = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;
if (windowWidth < 768) {
    var imageWidth = 145; //Mobile
} else {
    var imageWidth = 215;
}

photo = {
    page: 1,
    offset: imgMaxNum,
    json: [],
    init: function () {
        var that = this;
        $.getJSON('/photos/data2.json?nocache=' + (new Date()).getTime(), function (data) {
            that.json.push(data);
            //that.render(that.page, data);
            //that.scroll(data);
        });
        console.log("Finish parse JSON");

        $('.sidebar-inner').append('<input class="sidebarInput" id="sbIptY1">');
        $('.sidebar-inner').append('<input class="sidebarInput" id="sbIptM1">');
        $('.sidebar-inner').append('<input class="sidebarInput" id="sbIptD1">');
        $('.sidebar-inner').append('<input class="sidebarInput" id="sbIptY2">');
        $('.sidebar-inner').append('<input class="sidebarInput" id="sbIptM2">');
        $('.sidebar-inner').append('<input class="sidebarInput" id="sbIptD2">');
        $('.sidebar-inner').append('<text id="resultNum"></text>');
    },
    render: function (page, data) {
		//console.log("Hello World");
        var ipt = $("#promptIpt");
        if (ipt.val() == '')
            return;
        console.log(data.length);
        //ipt.setAttribute('style', 'position:relative;top:0%;left:50%;transform:translate(-50%,-50%);text-align:center;');
        //ipt.style.color = 'white';
        var begin = (page - 1) * this.offset;
        var end = page * this.offset;
        if (begin >= data.length) return;
        var imgName, imageX, imageY, li = "";
        var ipt_dt = [ipt.val()];
        //for (var i = begin; i < end && i < data_.link.length; i++) {
        var deal_count = 0;
        for (var i = data.length - 1; i > -1; i--) {
            if ($('#sbIptY1').val() !== "" && $('#sbIptY1').val() > data[i].y) continue;
            if ($('#sbIptM1').val() !== "" && $('#sbIptM1').val() > data[i].m) continue;
            if ($('#sbIptD1').val() !== "" && $('#sbIptD1').val() > data[i].d) continue;
            if ($('#sbIptY2').val() !== "" && $('#sbIptY2').val() < data[i].y) continue;
            if ($('#sbIptM2').val() !== "" && $('#sbIptM2').val() < data[i].m) continue;
            if ($('#sbIptD2').val() !== "" && $('#sbIptD2').val() < data[i].d) continue;
            if (!data[i].prompt.toLowerCase().includes(ipt.val().toLowerCase())) continue;
            deal_count += 1;
            
			//if (Math.random() > 0.5)
            var src = 'https://test1.jsdelivr.net/gh/AmadeusImage/X@main/photos/' + data[i].fname;
			//else
			//	var src = 'https://raw.githubusercontent.com/AmadeusImage/X/main/photos/' +data.fname[i];
            //imgNameWithPattern = data[i].split(' ')[1];
            imgName = data[i].prompt;//imgNameWithPattern.split('.')[0];
            //imageSize = data[i].split(' ')[0];
            imageX = data[i].w;
            imageY = data[i].h;
            li += '<div class="card" style="width:' + imageWidth + 'px" >' +
                    '<div class="ImageInCard" style="height:'+ imageWidth * imageY / imageX + 'px">' +
                        '<a data-fancybox="gallery" href="' + src + '" data-caption="' + imgName + '">' +
                        '<img data-src="' + src + ' " src="' + src + '" loading="lazy">' + //loading="lazy"
                      '</a>' +
                    '</div>' +
                  '</div>';
        }
		console.log("Finish html");
        $(".ImageGrid").append(li);
        //$(".main-inner").append("<style>.main-inner { width: " + window.innerWidth * 0.95 + "px; }</style>");
        console.log("Finish append");
        $('.site-state-item-count').text(deal_count);
        //this.minigrid();

        /* Parse table
        var arr = [];
        $.get("", function (data) {
            var tmp_html = $.parseHTML(data);
            //console.log(tmp_html.innerHTML);
            var el = $('<div></div>');
            el.html(tmp_html);
            $('tbody > tr', el).each(function () {
                arr.push($(this).find('td:eq(1)').text());
            });
        });
        */

    },
}
photo.init();