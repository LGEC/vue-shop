import Vue from 'vue'
import wx from 'weixin-js-sdk';
export function wechatShare(shareDate) {
	// console.log(shareDate)
	let isWechat = navigator.userAgent.indexOf('MicroMessenger') > -1 //判断为微信浏览器
	if(!isWechat) {
		console.log('not weichat')
	}else{ 
		let url = 'http://00.37518.com/index.php?m=Mobile&c=Users&a=getConfig';
		Vue.http.post(url,{url:shareDate.url},{emulateJSON: true}).then((res) => {
			let data = res.body;
			console.log(data);
			wx.config({
				debug: false,
				appId: data.appId,
				timestamp: data.timestamp,
				nonceStr: data.nonceStr,
				signature: data.signature,
				jsApiList: data.jsApiList
			});
			let defaultData = {
				title: '分领商城',
				content: '分享财富，引领未来',
				desc: '分享财富，引领未来',
				link: 'http://00.37518.com/index.html?from=singlemessage#/',
				imgUrl: 'http://00.37518.com/Upload/share/share.png', //分享出来的图片的
			}
				let title, desc, link, imgUrl,content;
				if(shareDate.title) {
					title = shareDate.title;
				} else {
					title = defaultData.title;
				}
				if(shareDate.content) {
					content = shareDate.content;
				} else {
					content = defaultData.content;
				}
				if(shareDate.desc) {
					desc = shareDate.desc;
				} else {
					desc = defaultData.desc;
				}
				if(shareDate.link) {
					link = shareDate.link;
				} else {
					link = defaultData.link;
				}
				if(shareDate.logo) {
					imgUrl = shareDate.logo;
				} else {
					imgUrl = defaultData.imgUrl;
				}
			wx.ready(function() {
//				console.log('开启分享');
//				console.log('title：'+title)
//				console.log('desc:'+desc)
//				console.log('link：'+link)
//				console.log('imgUrl：'+imgUrl)
//				console.log('content：'+content)
				wx.onMenuShareAppMessage({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link: link, // 分享链接
					imgUrl: imgUrl, // 分享图标
					success: function() {
						console.log('分享给朋友成功')
					},
					cancel: function() {
						console.log('分享给朋友失败')
					}
				});
				wx.onMenuShareTimeline({
					title: title, // 分享标题
					link: link, // 分享链接
					imgUrl: imgUrl, // 分享图标
					success: function() {
						console.log('分享到朋友圈成功')
					},
					cancel: function() {
						console.log('分享到朋友圈失败')
					}
				});
			});
		});
	}
}