# H5-player
## H5 播放器
顾名思义 在IE9及以上 chrome safari浏览器可支持video 标签的浏览器

使用方法简单
<script>
  video({
            videoName: SYS_CONF.name,
            src: "http://dl33.yunpan.360.cn/intf.php?method=Download.downloadFile&qid=1451831257&fname=%2F%E7%85%AE%E5%A6%87%E7%A5%9E%E6%8E%A2HDTV_01%5B%E7%94%B5%E5%BD%B1%E5%A4%A9%E5%A0%82www.dy2018.com%5D.mp4&fhash=93815de4d2969c157dc09cd8011aa924f62db065&dt=33_33.3741bbf1683f610b8a6f05a31c7b96fb&v=1.0.1&rtick=14540501946199&open_app_id=0&devtype=web&sign=5550d62112d0ece0a2add672e675fc9b&",
            warp: 'main'
        })
</script>

params
  1、需要文件名称，根据名称后缀，判断是或可以播放（目前业务需求只支持MP4格式的，因为云盘没有OGG格式的播放器）
  2、文件源地址
  3、父容器的ID
  
使用方法非常简单，直接引入即可，也可以放在IF判断里， 如果浏览器不支持或者视频不支持的话，就会返回false
如果支持 就会返回一个H5播放器的实例

简单好用 希望大家 多多支持 
静床地址：http://s3.qhimg.com/static/df316a3c378851d0.js
