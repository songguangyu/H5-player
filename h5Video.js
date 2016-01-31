/*
author : songguangyu;
H5 播放器的未来设想,是否可以增加广告以提高收入,是否在外链引入评论机制,然后可以发弹幕，等等吧
*/
function video(options) {
	/**
	** 核心内部方法
	**/
	var lib = {
		checkUa : function() {
			var ua = navigator.userAgent;
			//mp4格式 IE9+ chrome safari
			var reg = /(?:MSIE (\d)+)|chrome|safari/i;
			//Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)
			var engine =  ua.match(reg);

			if(engine && (engine[1] ? (Number(engine[1]) >= 9) : true)) {
				return true;
			} else {
				return false;
			}
		},
		
		checkFormat: function() {
			try {
				var format = options.videoName.split('.').slice(-1)[0];
			}catch(err) {
				throw new Error('没有视频名称');
			}
			if(format.toLocaleLowerCase() === 'mp4') {
				return true;
			} else {
				return false;
			}
		},
		check: function() {
			if(this.checkUa() && this.checkFormat()) {
				return true;
			} else {
				return false;
			}
		}


	}
	//构造 H5浏览器类
	function Hvideo(options) {
		this.options = {
			warp: null,
			width: '100%',
			height: '100%',
			autoPlay: false,
			controls: true,
			src: null
		}

		this.playing = false;

		for(var item in options) {
			this.options[item] = options[item];
		}

		this.init(options);
	}
	//初始化
	Hvideo.prototype.init = function(options) {
		var video,warp;
		this.video = video = document.createElement('video'); 
		video.setAttribute("preload", 'auto');
		video.setAttribute("width", this.options.width);
		video.setAttribute("height", this.options.height);
		video.setAttribute("controls", this.options.controls);
		video.setAttribute("src", this.options.src);
		if(this.options.autoPlay) {
			video.setAttribute("autoPlay", 'autoPlay');
		}	
		warp = document.getElementById(this.options.warp);
		warp.appendChild(video);
		this.eventInit();
		this.loading();
	};

	Hvideo.prototype.eventInit = function() {
		//对键盘事件进行处理
		var that = this;
		document.addEventListener('keydown',function(event) {
			switch(event.keyCode) {
				case 37:
				that.fastBackward();
				break;
				case 38:
				that.upVolume();
				break;
				case 39:
				that.fastForward();
				break;
				case 40:
				that.downVolume();
				break;
				case 32:
				that.play();
				break;

			}
		})
		//双击全屏 只在chrome 和 safari
		document.addEventListener('dblclick', function(event) {
			if(that.video.webkitRequestFullscreen) {
				that.video.webkitRequestFullscreen();
			}
			
		})

		this.video.addEventListener('waiting', function() {
			that.loading().show();
		})

		this.video.addEventListener('canplay', function() {
			that.loading().hide();
		})
		
		this.video.addEventListener('loadeddata', function() {
			that.loading().hide();
		})
	}
	//返回当前播放时间
	Hvideo.prototype.currentTime = function() {
		return this.video.currentTime
	}
	//快进
	Hvideo.prototype.fastForward = function(speed) {
		this.video.currentTime = this.currentTime() + (speed ? speed : 15)
	}
	//快退
	Hvideo.prototype.fastBackward = function(speed) {

		this.video.currentTime = this.currentTime() - (speed ? speed : 15)
	}
	//音量
	Hvideo.prototype.volume = function() {
		return this.video.volume
	}

	//声音设置如果超过范围会报错
	Hvideo.prototype.upVolume = function(speed) {
		if(this.volume() >= 0.9) {
			this.video.volume = 1
		} else {
			this.video.volume = this.volume() + (speed ? speed : 0.1)
		}	
	}

	Hvideo.prototype.downVolume = function(speed) {
		if(this.volume() <= 0.1) {
			this.video.volume = 0
		} else {
			this.video.volume = this.volume() - (speed ? speed : 0.1)
		}
	}


	//播放和暂停
	Hvideo.prototype.play = function(options) {
		if(this.video.pause) {
			this.video.play();
		} else {
			this.video.pause();
		}
		
	};

	Hvideo.prototype.stop = function(options) {
		// body...
	};

	Hvideo.prototype.waitingLogo = function(options) {
		if(this.playing === false) {

		} else {

		}
	};

	Hvideo.prototype.loading = function() {
		var loadingWrap,warp;
		var that = this;
		if(!this.loadingWrap) {
			this.loadingWrap = loadingWrap = document.createElement('div'); 
			this.loadingWrap.style.width = '50px';
			this.loadingWrap.style.height = '50px';
			this.loadingWrap.style.position = 'absolute';
			this.loadingWrap.style.top = '50%';
			this.loadingWrap.style.left = '50%';
			this.loadingWrap.style.marginLeft = '-25px';
			this.loadingWrap.style.marginTop = '-25px';
			this.loadingWrap.style.backgroundRepeat = 'no-repeat';
			this.loadingWrap.style.backgroundPosition = 'center';
			this.loadingWrap.style.backgroundImage = 'url(/resource/img/my/loader.gif)';
			this.loadingWrap.style.backgroundColor = '#000000';
			this.loadingWrap.style.opacity = '0.5';
			this.loadingWrap.style.display = 'block';
			warp = document.getElementById(this.options.warp);
			warp.appendChild(this.loadingWrap);
		} else {
			return {
				show : function() {
					that.loadingWrap.style.display = "block";
				},

				hide: function() {
					that.loadingWrap.style.display = "none";
				}
			}
		}


	}

	


	if(lib.check()) {
		return new Hvideo(options);
	} else {
		return false
	}
}