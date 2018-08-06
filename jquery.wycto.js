;(function(undefined) {
	"use strict" //使用js严格模式检查，使语法更规范
	var win;
    var wycto = {
    };

    // 最后将插件对象暴露给全局对象
    win = (function(){ return this || (0, eval)('this'); }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = wycto;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return wycto;});
    } else {
        !('wycto' in win) && (win.wycto = wycto);
    }
}());
;(function(cto,undefined) {
	"use strict" //使用js严格模式检查，使语法更规范
    var upload = {
        config: {
		    accept: 'images' //允许上传的文件类型：images/file/video/audio
		    ,exts: '' //允许上传的文件后缀名
		    ,auto: true //是否选完文件后自动上传
		    ,bindAction: '' //手动上传触发的元素
		    ,url: '' //上传地址
		    ,field: 'file' //文件字段名
		    ,method: 'post' //请求上传的http类型
		    ,data: {} //请求上传的额外参数
		    ,drag: true //是否允许拖拽上传
		    ,size: 0 //文件限制大小，默认不限制
		    ,number: 0 //允许同时上传的文件数，默认不限制
		    ,multiple: false //是否允许多文件上传，不支持ie8-9
		} //全局配置项
		,render: function(options){
			var that = this;
	      that.config = $.extend({}, that.config, options);
	      return that;
		}
	    //设置全局项
	    ,set: function(options){
	      var that = this;
	      that.config = $.extend({}, that.config, options);
	      return that;
	    }
	    ,debug: function(){
	    	alert(this.config.accept);
	    }
    };
    cto.upload = upload;
}(wycto));