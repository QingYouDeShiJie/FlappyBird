(function(){
	var Bird = window.Bird = function(){
		//图片序列
		this.images = [game.R["bird0_0"] , game.R["bird0_1"] , game.R["bird0_2"]];
		//翅膀形态0、1、2
		this.wing = 0;
		//鸟的中心
		this.cx = game.mycanvas.width / 2 * 0.618;
		this.cy = 200;
		//角度
		this.rotate = 0;
		//小帧数
		this.f = 0;
		//有限状态机
		this.hasEnergy = false;
	}
	Bird.prototype.update = function(){
		//让自己的小帧数加1
		this.f++;
		//翅膀
		this.wing++;
		if(this.wing > 2){
			this.wing = 0;
		}
	
		if(this.hasEnergy && this.f > 20){
			this.hasEnergy = false;
			this.f = 0;
		}

		//状态机
		if(this.hasEnergy){
			//上升
			this.cy -= (20 - this.f) * 0.51;
		}else{
			//下降
			this.cy += this.f * 0.53;
		}
		this.rotate += 0.04;

		//验收，不能飞出天花板
		if(this.cy < 0) this.cy = 0;

		//计算碰撞盒的位置
		this.T = this.cy - 12;
		this.R = this.cx + 17;
		this.B = this.cy + 12;
		this.L = this.cx - 17;

		//验证是否接触了大地
		if(this.B > game.land.y){
			game.sm.gotoScene(3);
		}
	}
	Bird.prototype.render = function(){
		//canvas中旋转元素的套路：
		game.ctx.save();	
		game.ctx.translate(this.cx , this.cy);	//移动坐标系到自己中心
		game.ctx.rotate(this.rotate);//旋转
		game.ctx.drawImage(this.images[this.wing] , -24 , -24);
		game.ctx.restore();

		//为了方便调试，我们现在在屏幕上打印自己的碰撞盒数据
		// game.ctx.fillStyle = "red";
		// game.ctx.fillText(this.T , this.cx , this.cy - 30);
		// game.ctx.fillText(this.R , this.cx + 20 , this.cy);
		// game.ctx.fillText(this.B , this.cx , this.cy + 30);
		// game.ctx.fillText(this.L , this.cx - 40 , this.cy  );
	}
	Bird.prototype.fly = function(){
		//改变有限状态机
		this.hasEnergy = true;
		//开始计数
		this.f = 0;
		//改变鸟头
		this.rotate = -1;
		//播放音乐
		document.querySelector("#sfx_wing").load();
		document.querySelector("#sfx_wing").play();
	}
})();