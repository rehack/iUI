/**
 * 
 * @authors 紫妖 (285655496@qq.com)
 * @date    2015-05-24 14:31:41
 * @version $Id$
 */

function MyCanvas(){ //定义canvas类
	var siteurl = "images/";
	var stage	= null;
	var viewOffsetX = 0;
	var viewOffsetY = 0;
	function Resrouce(){
		var self = this;
		var loadedImgCount = 0;
		var imgs = this.imgs = []; //定义图片
		var imgsrc = this.imgsrc = [
			  siteurl + "nao.png" //基础图片——大脑
			, siteurl + "points.png" //坐标图
		];
		var baseOffsetY = this.baseOffsetY = 28;
		this.objs=[
			{}
			, {name:"大脑",i:0,x:0,y:0,w:342,h:422,c:1} //i代表图片
			, {name:"标注点",i:1,x:0,y:0,w:22,h:42,c:5}
		];
		this.map = [
			[{x:0,y:0,o:1,v:1,s:0}] //o对应objs的索引
		];

		this.sharp = [

		 	  {p:[{x:50 ,y:40},{x:75 ,y:20 },{x:95 ,y:10 },{x:125,y:4  },{x:150,y:20 },{x:136,y:65 },{x:80 ,y:95 }],im:{x:92,y:8,o:2,s:0},v:0,c:["#0565c8"],s:0,a:0.2}
		    , {p:[{x:181,y:1 },{x:229,y:15  },{x:246,y:25 },{x:248,y:36 },{x:208,y:82 },{x:157,y:63 }],im:{x:193,y:6,o:2,s:1},v:0,c:["#f00"],s:0,a:0.2}
		    , {p:[{x:17 ,y:83},{x:41 ,y:77},{x:98,y:108},{x:96,y:141},{x:32 ,y:180},{x:0  ,y:148}],im:{x:31,y:87,o:2,s:2},v:0,c:["#22B14C"],s:0,a:0.2}
		    , {p:[{x:235,y:88},{x:262,y:40 },{x:288,y:71 },{x:295,y:95 },{x:258,y:143},{x:255,y:117}],im:{x:262,y:48,o:2,s:3},v:0,c:["#8F087A"],s:0,a:0.2}
		    , {p:[{x:108,y:85},{x:202,y:88 },{x:140,y:140},{x:110,y:121}],im:{x:130,y:67,o:2,s:4},v:0,c:["#208083"],s:0,a:0.2}
		];


		this.onload = function() {};
		this.load = function() {

			loadedImgCount = 0;
			for (var i = 0; i < imgsrc.length; i++) {
				imgs[i] = new Image();
				imgs[i].onload = function() {
					on_load();
				}
				imgs[i].src = imgsrc[i];
			}
			return this;
		}

		function on_load() {

			loadedImgCount++;
			if (loadedImgCount == imgsrc.length) {
				self.onload();
			}
		}
		this.selectSharp = function(idx){
			var sharps = this.sharp;
			var len = sharps.length;
			for(var i=0;i<len;i++){
				sharps[i].v = (idx == i)?1:0;
			}
			return this;
		};

	};
	function Stage(){
		var canvas	= document.getElementById("idcanvas");
		var ctx2d	= canvas.getContext("2d");
		var width	= canvas.getAttribute("width");
		var height	= canvas.getAttribute("height");
		var timeid	= 0;
		var timeStep= 30;
		var isLoadedRes = false;
		var res		= this.res = new Resrouce();
		res.onload=function(){
			isLoadedRes = true;
		};

		this.load = function(){
			res.load();
			return this;
		}
		var draw = this.draw = function(){
			if( !isLoadedRes ){
				return;
			}
			ctx2d.clearRect(0,0,width,height);
			darwMap();
			darwSharp();
		};
		function darwMap(){

			/*
			ctx2d.fillstyle = "#666";
			ctx2d.globalAlpha	= 0.5;
			ctx2d.fillRect(0,0,width,height);
			*/
		
			var map = res.map;
			for( var i=0;i<map.length;i++){
				var lmap = map[i];
				for( var j=0;j<lmap.length;j++){
					var m = lmap[j];
					if( m.v ){
						var o = res.objs[m.o];
						var img = res.imgs[o.i];
						ctx2d.drawImage(img,o.x,o.y,o.w,o.h,m.x,m.y+ res.baseOffsetY,o.w,o.h);
					}
					
				}
			}
			
			
		};
		function darwSharp(){ //绘制阴影形状
			ctx2d.save();
			var sharps = res.sharp;
			var sharpsLen = sharps.length;
			for( var i=0;i<sharpsLen;i++){
				var sharp = sharps[i];
				var pCount = sharp.p.length;
				if( pCount && sharp.v ){
					ctx2d.globalAlpha	= sharp.a;
					ctx2d.fillStyle		= sharp.c[sharp.s];
					ctx2d.beginPath();
					ctx2d.moveTo(sharp.p[0].x,sharp.p[0].y + res.baseOffsetY) ;
					for( var j=1;j<pCount;j++){
						ctx2d.lineTo(sharp.p[j].x,sharp.p[j].y + res.baseOffsetY) ;
					}
					ctx2d.fill();
					ctx2d.globalAlpha	= 1;
					var po = sharp.im;
					var o = res.objs[po.o];
					var img = res.imgs[o.i];
					ctx2d.drawImage(img,o.x+(po.s*o.w),o.y,o.w,o.h,po.x,po.y+ res.baseOffsetY,o.w,o.h);
				}
				
			}


			ctx2d.restore();
		};


		this.animation = function(){
			if( timeid ){
				clearInterval(timeid);
			}
			timeid = setInterval(
				function(){
					draw();
				}
				,timeStep
			);
			return this;
		};

		this.selectSharp = function(idx){
			res.selectSharp(idx||0);
		};

	};

	this.selectSharp = function(idx){
		if( stage ){
			stage.selectSharp(idx||0);
		}
		
	};

	this.run = function(){
		stage = new Stage();
		stage.load().animation();
	}
	


};
var mycanvas = new MyCanvas();
mycanvas.run();


//建立随机数
function build_random(count,old){
	var num = Math.floor(Math.random()*10);
	num = num>4?(num-count):num;
	if( old.num == num ){
		return build_random(count,old);
	} else {
		old.num = num;
		return num;
	}
}

//test
// var old = {num:-1};
var idx = -1;
	
setInterval(function(){
	//var idx = build_random(5,old);	//0~4

if(idx<=3){
	idx++;
	mycanvas.selectSharp(idx);
	$("#select_area li").each(function(cidx){
		if(cidx==idx){
			//设置这个位置为选中
			$(this).addClass('active').find("p").addClass('active');
		} else {
			//设置为未选中
			$(this).removeClass('active').find("p").removeClass('active');
		};
		
	});
}
if(idx==4){
	idx=-1;
}
	// console.log(idx)
},3000);

