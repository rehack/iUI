<?php
/**
 * http://lbsyun.baidu.com/index.php?title=webapi/high-acc-ip
 * 根据客户端ip地址调用百度高精度IP定位API 获取详细的地理位置
 * 根据获取到的经纬度在百度地图中定位
 */
header("Content-type: text/html; charset=utf-8");

$user_ip= $_SERVER["REMOTE_ADDR"];//获取客户端IP
$ak='yourKey';//百度ak 开发者密钥
$qterm='pc';//待定位终端类型pc|mb

$data=get_lat_and_lng_ByIP($user_ip,$ak);

//根据IP获取经纬度
function get_lat_and_lng_ByIP($ip,$ak)
{
    if(empty($ip))
    {
        return 'IP不能为空';
    }
    $content = file_get_contents("http://api.map.baidu.com/highacciploc/v1?qcip=$ip&ak=$ak&qterm=$qterm&extensions=3&coord=bd09ll");
    // $content = file_get_contents("http://api.map.baidu.com/highacciploc/v1?qcip=119.6.99.130&qterm=pc&ak=R6UvUhYRQSNFf3mealWKaIh3fffyyjD9&coord=bd09ll");
    $json = json_decode($content);

    //提取经度数据
    $lng=$json->{'content'}->{'location'}->{'lng'};
    //提取纬度数据
    $lat=$json->{'content'}->{'location'}->{'lat'};

    echo "当前ip：".$ip;
    echo "<br>";

    echo "当前纬度：".$lat;
    echo "<br/>";
    echo "当前经度：".$lng;

    $data=[];
    $data['lng']=$lng;
    $data['lat']=$lat;
    return $data;
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>百度ip地理位置</title>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=UMHojEUfKGAml59PsM9qDPcuZ8pGY9tK"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.js" charset="UTF-8"></script>
    <link rel="stylesheet" href="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.css" />

</head>
<body>

<!--百度地图容器-->
<div style="height:550px;border:#ccc solid 1px;font-size:12px;margin: 0 auto;" id="map"></div>
    <script type="text/javascript">
        //创建和初始化地图函数：
        function initMap() {
            createMap(); //创建地图
            setMapEvent(); //设置地图事件
            addMapControl(); //向地图添加控件
            addMapOverlay(); //向地图添加覆盖物
            info();
        }

        function createMap() {
            map = new BMap.Map("map");
            var x=<?php echo $data['lng'] ?>;//经度
            var y=<?php echo $data['lat'] ?>;//纬度
            map.centerAndZoom(new BMap.Point(x, y), 19);
            // map.centerAndZoom(new BMap.Point(10.653048, 104.097705), 19);
        }

        function setMapEvent() {
            map.enableScrollWheelZoom();
            map.enableKeyboard();
            map.enableDragging();
            map.enableDoubleClickZoom()
        }

        function addClickHandler(target, window) {
            target.addEventListener("click", function() {
                target.openInfoWindow(window);
            });
        }

        function addMapOverlay() {}
        //向地图添加控件
        function addMapControl() {
            var scaleControl = new BMap.ScaleControl({
                anchor: BMAP_ANCHOR_BOTTOM_LEFT
            });
            scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
            map.addControl(scaleControl);
            var navControl = new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_LEFT,
                type: BMAP_NAVIGATION_CONTROL_LARGE
            });
            map.addControl(navControl);
            var overviewControl = new BMap.OverviewMapControl({
                anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
                isOpen: true
            });
            map.addControl(overviewControl);
        }

        // 信息窗口
        function info() {
            var x=<?php echo $data['lng'] ?>;//经度
            var y=<?php echo $data['lat'] ?>;//纬度
            var point = new BMap.Point(x, y);
            map.centerAndZoom(point, 19);
            var marker = new BMap.Marker(point); // 创建标注
            map.addOverlay(marker); // 将标注添加到地图中
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        }
        var map;
        initMap();
    </script>

</body>
</html>