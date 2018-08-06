;
(function(){
  'use strict';
  var CJPCD = function (provinceId,cityId,districtId) {
    if (!(this instanceof CJPCD)) return new CJPCD(provinceId,cityId,districtId);

    var c = this;

    //初始化
    c.province = document.getElementById(provinceId);
    c.city = document.getElementById(cityId);
    c.district = document.getElementById(districtId);   

    //创建省市区数据
    c.builder_init = function(){      
      //初始化先创建省份数据
      c.province_builder();

      c.bindChangeEvent();

      //初始化触发
      c.province.onchange();
    };

    //设置自定义值
    c.set_value = function(province,city,district){

      //增强容错性-这里有点不严谨,后续完善
      if(province.indexOf("省")== -1)
        province = _type_format(province,"省");
      if (city.indexOf("市")== -1)
        city += "市";    

      //初始化先创建省份数据
      c.province_builder();
      c.province.value = province;

      c.city_builder();
      c.city.value = city;

      c.district_builder();
      c.district.value = district;

      //绑定事件
      c.bindChangeEvent();
    };

    //绑定事件
    c.bindChangeEvent = function(){
      c.province.onchange=function(){
        c.city_builder();
        c.city.onchange();
      };
      c.city.onchange=function(){
        c.district_builder();
      };
    };

    //生成省数据
    c.province_builder = function(){
      c.province.innerHTML="";
      //创建子元素
      c.optionFactory(c.cj_areas_json,c.province,"prov_index","省");
    };

    //生成市数据
    c.city_builder = function(){ 
      c.city.innerHTML = "";
      //获取当前选中省份的索引
      var pro_Id = c.province.options[c.province.selectedIndex].getAttribute("prov_index");
      var city_obj = c.cj_areas_json[pro_Id].city;
      //创建子元素
      c.optionFactory(city_obj,c.city,"city_index","市");
    };

    //生成区数据
    c.district_builder = function(){ 
      c.district.innerHTML = "";
      var pro_Id = c.province.options[c.province.selectedIndex].getAttribute("prov_index");
      var city_Id = c.city.options[c.city.selectedIndex].getAttribute("city_index");
      var district_obj = c.cj_areas_json[pro_Id].city[city_Id].area;

      //创建子元素
      c.optionFactory(district_obj,c.district,"");
    };

    //通用创建子函数方法
    c.optionFactory = function(json_data,parent_obj,attr_name,type){   
      /*
        数据源没有 "省","市"(节省空间)
        我们需要自己加(排除四个直辖市)
        区,县没有规律可循,所以数据源是完整的
      */
      var option;
      for (var i = 0; i < json_data.length; i++) {
        option = document.createElement("option"); 
        if(attr_name)
          option.setAttribute(attr_name,i);

        var name = !json_data[i].name ? json_data[i] : json_data[i].name;

        //加上后缀之前要排除直辖市和自治区
        option.innerHTML =  c.type_format(name,type);
        parent_obj.appendChild(option);
      };
      option = null;
    };

    //加上后缀之前要排除直辖市,还有数据源上的特殊元素"省"
    c.type_format = function(name,type){
      if (!type)
        return name;

      for(var item in c.cj_municipalities){
        if(c.cj_municipalities[item] == name){
          type = "";
          break
        };
      };
      return name + type;
    };

    c.get_value = function(valueType = "json"){

      var province_val = c.province.options[c.province.selectedIndex].value;
      var city_val = c.city.options[c.city.selectedIndex].value;
      var district_val = c.district.options[c.district.selectedIndex].value;
      if(province_val == "省"||city_val == "市"||district_val == "区")
        return null;
      if(valueType == "json")
        return {"province":province_val,"city":city_val,"district":district_val};
      else
        return province_val + valueType + city_val + valueType + district_val;
    };

    //内部初始化
    c.builder_init();

    //提供API给外部使用
    return {
     setUp:c.set_value,//设置值
     reSet:c.builder_init,//重置
     getValue:c.get_value//获取值
    };
  };

  //属性
  CJPCD.prototype={
    //篇幅限制只贴出部分(北京和天津)数据
    cj_areas_json : [{ "name": "省", "city": [{ "name": "市", "area": ["区"] }] },{ "name": "北京", "city": [{ "name": "北京", "area": ["东城区", "西城区", "崇文区", "宣武区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "平谷区", "怀柔区", "密云县", "延庆县"] }] }, { "name": "天津", "city": [{ "name": "天津", "area": ["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "塘沽区", "汉沽区", "大港区", "东丽区", "西青区", "津南区", "北辰区", "武清区", "宝坻区", "宁河县", "静海县", "蓟  县"] }] }],

    cj_municipalities : ["北京","上海","天津","重庆","内蒙古","新疆","宁夏","西藏","广西","澳门","香港","台湾","钓鱼岛","省","市"]
  };

  window.CJPCD = CJPCD;

}());