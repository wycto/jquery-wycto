# jquery.wycto
基于jquery的各种插件
用法：http://www.wycto.com/default/article/view/id/25

//使用方法

/***************


    $("#up").wyctoUpload({
    	method: 0,//后上传
        url: "/default/ajax/uploadfile",//服务器保存方法，返回图片src，method设置为1有效
        quality: 1,//0-1
        saveExt: '',//当quality设置时候的保存格式jpg/png
        allowType: ["jpg", "jpeg", "png", "gif", "bmp"],//允许上传格式
        allowSize: 0,//允许上传大小
    	success:function(data){
    		$("#img").attr("src",data.src);
    	},
    	error: function(msg){
    		alert(data);
    	}
    });
});
