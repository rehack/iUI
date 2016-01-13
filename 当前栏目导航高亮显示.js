/**
 *
 * @authors Rehack (565195693@qq.com)
 * @link    http://www.rehack.cn
 * @date    2016-01-13 16:15:01
 * @version $Id$
 */


//navHOVER
var urlstr = location.href;
console.log((urlstr + '/').indexOf($(this).attr('href')));
var urlstatus = false;
$(".line a").each(function() {
    if ((urlstr + '/').indexOf($(this).attr('href') + '/') > -1 && $(this).attr('href') != '') {
        $(this).addClass('bg');
        urlstatus = true;
    } else {
        $(this).removeClass('bg');
    }
});

// if (urlstatus) {
// $(".line a").eq(0).removeClass('bg');
// }
