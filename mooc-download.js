var selector = 'a.J-media-item';
var videoes = [];
var xmlStr = '<?xml version="1.0" encoding="utf-8" ?><videoes>';
var dict = {};
var total = $(selector).length;
var textStr = '';
$(selector).each(function(i, e) {
    var href = this.href;
    var vid = href.substring(href.lastIndexOf('/') + 1, href.length); // this.href.replace('http://www.imooc.com/video/', '');
    var name = this.innerText;
    var pattern = /\(\d{2}:\d{2}\)/;
    if (!pattern.test(name)) {
        total--;
        if (i == $(selector).length - 1 && !total) {
            console.log('没有视频可以下载！');
        }
        return;
    };
    name = name.replace(/\(\d{2}:\d{2}\)/, '').replace(/\s/g, '');
    //name += '.mp4';
    dict[vid] = name;
    $.getJSON("/course/ajaxmediainfo/?mid=" + vid + "&mode=flash", function(data) {
        var url = data.data.result.mpath[2];//mpath[2]对应的是超清视频
        videoes.push({
            url: url,
            name: name
        });
        xmlStr += '<video><url>' + url + '</url><name>' + name + '</name></video>';
        textStr += 'filename=' + name + '&fileurl=' + url + '\n';
        if (videoes.length == total) {
            console.log('共' + total + '个视频。');
            console.log('已完成' + videoes.length + '个视频。');
            //console.log(JSON.stringify(videoes));
            xmlStr += '</videoes>';
            //console.log(xmlStr);
            console.log(textStr);
            console.log($('.hd .l').text());
        };
    });
});

// 把这段在类似http://www.imooc.com/learn/258这样的页面下的console控制台运行，然后复制出视频列表到后缀名为.downlist的文件中，然后用IDM批量导入助手导入进行批量下载。


// 获取到的json数据格式
{
    "result": 0,
    "data": {
        "result": {
            "mid": 5210,
            "mpath": ["http:\/\/v2.mukewang.com\/7b1919c2-6f29-4896-b307-3e93eb55007d\/L.mp4?auth_key=1473393412-0-0-bc2d1dbb3b0eaf09b9e2527732d01194", "http:\/\/v2.mukewang.com\/7b1919c2-6f29-4896-b307-3e93eb55007d\/M.mp4?auth_key=1473393412-0-0-f4f33881f478dc9f614e56b70476e519", "http:\/\/v2.mukewang.com\/7b1919c2-6f29-4896-b307-3e93eb55007d\/H.mp4?auth_key=1473393412-0-0-45545dacc45002375f658b86851737a1"],
            "cpid": "1295",
            "name": "\u6982\u8ff0",
            "time": "70",
            "practise": []
        }
    },
    "msg": "\u6210\u529f"
}
