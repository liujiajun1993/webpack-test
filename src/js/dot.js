/*
* @Author: liujiajun
* @Date:   2017-02-20 10:34:34
* @Last Modified by:   liujiajun
* @Last Modified time: 2017-02-20 10:34:50
*/

'use strict';
export default function Dot() {
    this.x = 0;
    this.y = 0;
    this.draw = function (ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, .7)';
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.restore();
    };
  }