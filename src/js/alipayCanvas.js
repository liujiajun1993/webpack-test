/*
* @Author: liujiajun
* @Date:   2017-02-19 09:34:54
* @Last Modified by:   liujiajun
* @Last Modified time: 2017-02-20 11:03:22
*/

'use strict';
import Dot from './dot';
import Text from './text';
export default function alipayCanvas(option){
// exports.alipayCanvas = function(option){
	var selector = option.selector||'#canvas';
	this.canvas = document.querySelector(selector);
	this.ctx = this.canvas.getContext('2d');
	this.cWidth = this.canvas.width;
	this.cHeight = this.canvas.height;
	this.drawPlate(765);
}

alipayCanvas.prototype = {
	drawPlate: function(score){
		var deg0 = Math.PI / 9,
		    deg1 = Math.PI * 11 / 45,
		    radius = 150,
		    stage = ['较差', '中等', '良好', '优秀', '极好'];
		var ctx = this.ctx;

		ctx.save();	//画布位置
        ctx.clearRect(0, 0, this.cWidth, this.cHeight);
        ctx.translate(this.cWidth / 2, this.cHeight / 2);
        ctx.rotate(8 * deg0);
		
		ctx.save();	// 外圈表盘
		ctx.beginPath();
		ctx.strokeStyle = 'rgba(255, 255, 255, .2)';
		ctx.lineWidth = 10;
		ctx.arc(0, 0, 135, 0, 11 * deg0, false);
		ctx.stroke();
		ctx.restore();
		
		ctx.save(); 	// 六个大刻度
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'rgba(255, 255, 255, .3)';
		for(let i = 0; i < 6; i++){
			ctx.beginPath();
			ctx.moveTo(140, 0);
			ctx.lineTo(130, 0);
			ctx.stroke();
			ctx.rotate(deg1);
		}
		ctx.restore();
		
		ctx.save(); // 细分刻度线
      	for (let i = 0; i < 25; i++) {
	        if (i % 5 !== 0){
	          ctx.beginPath();
	          ctx.lineWidth = 2;
	          ctx.strokeStyle = 'rgba(255, 255, 255, .1)';
	          ctx.moveTo(140, 0);
	          ctx.lineTo(133, 0);
	          ctx.stroke();
	        }
	        ctx.rotate(deg1 / 5);
	    }
      	ctx.restore();

      	ctx.save(); //表盘信用分数
		ctx.rotate(Math.PI / 2);
		for (let i = 0; i < 6; i++) {
			ctx.fillStyle = 'rgba(255, 255, 255, .4)';
			ctx.font = '10px Microsoft yahei';
			ctx.textAlign = 'center';
			ctx.fillText(400 + 100 * i, 0, -115);
			ctx.rotate(deg1);
		}
		ctx.restore();

		ctx.save(); //表盘信用分数段文字
		ctx.rotate(Math.PI / 2 + deg0);
		for (let i = 0; i < 5; i++) {
			ctx.fillStyle = 'rgba(255, 255, 255, .4)';
			ctx.font = '10px Microsoft yahei';
			ctx.textAlign = 'center';
			ctx.fillText(stage[i], 5, -115);
			ctx.rotate(deg1);
		}
		ctx.restore();

		ctx.save(); //信用阶段及评估时间文字
		ctx.rotate(10 * deg0);
		ctx.fillStyle = '#fff';
		ctx.font = '28px Microsoft yahei';
		ctx.textAlign = 'center';
		ctx.fillText('信用极好', 0 , 30);
		ctx.fillStyle = '#80cbfa';
		ctx.font = '14px Microsoft yahei';
		ctx.fillText('评估时间：2016.11.06', 0, 60);
		ctx.restore();

		ctx.save(); //最外层轨道
		ctx.beginPath();
		ctx.strokeStyle = 'rgba(255, 255, 255, .4)';
		ctx.lineWidth = 3;
		ctx.arc(0, 0, radius, 0, 11 * deg0, false);
		ctx.stroke();
		ctx.restore();

		// 分数动画
		function drawFrame() {
		  var dot = new Dot(),
		      angle = 0,
		      dotSpeed = .3,
		      textSpeed = Math.round(dotSpeed * 100 / deg1),
		      credit = 400;
	      dot.x = radius * Math.cos(angle);
	      dot.y = radius * Math.sin(angle);

	      var aim = (score - 400) * deg1 / 100;
	      if (angle < aim) {
	        angle += dotSpeed;
	      }
	      dot.draw(ctx);

	      if (credit < score - textSpeed) {
	        credit += textSpeed;
	      } else if (credit >= score - textSpeed && credit < score) {
	        credit += 1;
	      }
	      Text(ctx, credit);

	      ctx.save();
	      ctx.beginPath();
	      ctx.lineWidth = 3;
	      ctx.strokeStyle = 'rgba(255, 255, 255, .5)';
	      ctx.arc(0, 0, radius, 0, angle, false);
	      ctx.stroke();
	      ctx.restore();
	      window.requestAnimationFrame(drawFrame);
		}
		
	}
}