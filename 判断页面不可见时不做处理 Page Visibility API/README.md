如果页面不是显示在用户当前可视窗口，比如chrome，不在当前显示的tab页，那么我们可能不需要2s调用，因为那样只会浪费网络请求，查询了数据也没用，用户没有看到。那么我们就可以使用Page Visibility API来判断当前页是否是可视的tab上，如果是我们再去查，不是我们就不查了。Chrome，firefox最新版都支持了，IE也是支持的。

### 规范请查看[http://www.w3.org/TR/page-visibility/](http://www.w3.org/TR/page-visibility/)