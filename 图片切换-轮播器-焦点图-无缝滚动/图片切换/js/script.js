/**
 * @authors: 	紫妖 (285655496@qq.com)
 * @date:    	2015-08-03 23:17:37
 * @version: 	$Id$
 * @link: 		http://chinaweb.github.io
 */

window.onload=function(){
	var oPrev=document.getElementById("prev");
	var oNext=document.getElementById("next");
	var oNum=document.getElementById("num");
	var oInfo=document.getElementById("imgInfo");
	var oImg=document.getElementById("img");
	var oMode1=document.getElementById("mode1")
	var oMode2=document.getElementById("mode2")
	var arrUrl=["images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg"];
	var arrInfo=["mm1","mm2","mm3","mm4"];

	// 初始化
	var num = 0;
	function imgTab(){
		oImg.src=arrUrl[num];
		oNum.innerHTML=num+1+"/"+arrUrl.length;
		oInfo.innerHTML=arrInfo[num];
	};
	imgTab();
	//循环切换
	// oPrev.onclick=function(){
	// 	num--;
	// 	if(num==-1){
	// 		num=arrUrl.length-1;
	// 	};
	// 	imgTab();
	// 	console.log(num)
	// };
	// oNext.onclick=function(){
	// 	num++;
	// 	if(num==arrUrl.length){
	// 		num=0;
	// 	};
	// 	imgTab();
	// 	console.log(num)
	// }
	//顺序切换
	var mode=1;
	oMode1.onclick=function(){
		mode=1;
	};
	oMode2.onclick=function(){
		mode=2;
	};
	oPrev.onclick=function(){
		num--;
		if(mode==1){
			if(num==-1){
				num=arrUrl.length-1;
			}
		}else{
			if(num==-1){
				num=0;
				alert("已经是第一张了！");
			}
		};
		imgTab();
	};
	oNext.onclick=function(){
		num++;
		if(mode==1){
			if(num==arrUrl.length){
				num=0;
			}
		}else{
			if(num==arrUrl.length){
				num=arrUrl.length-1;
				alert("已经是最后一张了！");
			}
		};
		imgTab();
	}




	// oMode1.onclick=function(){
	// 	if(num==arrUrl.length){
	// 		num=3;
	// 	}
	// }


}