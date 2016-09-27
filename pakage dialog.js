<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .weui-mask {
            position: fixed;
            z-index: 1000;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
        }
        .weui-dialog {
            position: fixed;
            z-index: 5000;
            width: 80%;
            max-width: 300px;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            background-color: #FFFFFF;
            text-align: center;
            border-radius: 3px;
            overflow: hidden;
        }
        .weui-dialog__hd {
            padding: 1.3em 1.6em 0.5em;
        }
        .weui-dialog__bd {
            padding: 0 1.6em 0.8em;
            min-height: 40px;
            font-size: 15px;
            line-height: 1.3;
            word-wrap: break-word;
            word-break: break-all;
            color: #999999;
        }
        .weui-dialog__ft {
            position: relative;
            line-height: 48px;
            font-size: 18px;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
        }
        .weui-dialog__btn {
            display: block;
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            flex: 1;
            color: #3CC51F;
            text-decoration: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            position: relative;
        }
        .weui-dialog__ft:after {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            height: 1px;
            border-top: 1px solid #D5D5D6;
            color: #D5D5D6;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
        }
        .weui-dialog__btn:after {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            width: 1px;
            bottom: 0;
            border-left: 1px solid #D5D5D6;
            color: #D5D5D6;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleX(0.5);
            transform: scaleX(0.5);
    </style>
    <script src="js/classie.js"></script>
</head>
<body>
<button id="show1">展示1个</button>
<button id="show2">展示2个</button>
    <script src="js/jquery-1.9.0.min.js"></script>
    <script>
        var tools={
            init:function(opts){
                return function(){
                    tools.fillHtml(opts);
                }();
            },
            fillHtml:function(opts){
                var html='<div id="dialog1" style="opacity: 1;">'
                            +'<div class="weui-mask"></div>'//背景
                            +'<div class="weui-dialog">'
                            +'<div class="weui-dialog__hd"><strong class="weui-dialog__title"></strong></div>'
                            +'<div class="weui-dialog__bd"></div>'
                            +'<div class="weui-dialog__ft">'
                            +'</div>'
                            +'</div>'
                            +'</div>';
                var $dialog=$(html);
                //title
                if(opts.title){
                    $dialog.find('.weui-dialog__title').text(opts.title);
                }
                if(opts.titleAlign && typeof opts.titleAlign=='string'){
                    $dialog.find('.weui-dialog__title').css('text-align',opts.titleAlign);
                }
                //content
                if(opts.content){
                    $dialog.find('.weui-dialog__bd').text(opts.content);
                }
                //btn
                if(opts.btn){
                    if(opts.btn instanceof Array){
                        for(var i=0,len=opts.btn.length;i<len;i++){
                            $dialog.find('.weui-dialog__ft').append('<a href="javascript:;" class="weui-dialog__btn">'+opts.btn[i]+'</a>');
                        }
                    }
                }
                //btn样式
                if(opts.btnStyleColor){
                    for(var j=0,lenJ=opts.btnStyleColor.length;j<lenJ;j++){
                        $dialog.find('.weui-dialog__ft>a').eq(j).css('color',opts.btnStyleColor[j]);
                    }
                }
                if($(document.body).find('#dialog1').length>0){
                    $(document.body).find('#dialog1').remove();
                }
                $(document.body).append($dialog);
                tools.bindEvent(opts,$dialog);
            },
            bindEvent:function(opts,obj){
                obj.on('click','a',function(){
                    $(obj).css('display','none');
                })
                $(obj).on('click','a',function(){
                    var index=$(this).index();
                    if(opts.cb){//点击相应按钮回调
                        if(opts.cb[index]!=undefined){
                            if(typeof opts.cb[index] =='function'){//执行方法
                                opts.cb();
                            }else if(opts.cb[index]!==''){//跳转页面
                                window.location.href=opts.cb[index];
                            }
                        }
                    }


                })
            }
        };
        $('#show2').click(function(){
            tools.init({
                title:'弹框提示',
                titleAlign:'center',
                content:'弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
                btn:['取消','跳百度'],
                btnStyleColor:['#000',''],
                cb:['','http://www.baidu.com']
            })
        })
        $('#show1').click(function(){
            tools.init({
                titleAlign:'left',
                content:'弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
                btn:['知道了']
            })
        })
    </script>
</body>
</html>
