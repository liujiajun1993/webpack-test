/*
* @Author: liujiajun
* @Date:   2017-02-20 10:34:58
* @Last Modified by:   liujiajun
* @Last Modified time: 2017-02-20 11:02:49
*/

'use strict';
export default function Text(ctx, process) {
	ctx.save();
	ctx.rotate(10 * Math.PI / 9);
	ctx.fillStyle = '#000';
	ctx.font = '80px Microsoft yahei';
	ctx.textAlign = 'center';
	ctx.textBaseLine = 'top';
	ctx.fillText(process, 0 ,10);
	ctx.restore();
}