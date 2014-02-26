SC.initialize({client_id:"e63a38724fcd2b664ca141aeb20e6fd0",redirect_uri:"http://guitarwith.guru/auth/soundcloud/callback.html"});var Loading=React.createClass({displayName:"Loading",render:function(){return React.DOM.div({className:"loader"},React.DOM.div({className:"loader-inner"},React.DOM.img({src:"/images/loader.gif",alt:"Just a moment.."})))}}),SoundCloudComponent=React.createClass({displayName:"SoundCloudComponent",getInitialState:function(){return{soundcloud:{connected:!1,permalink_url:"",is_shown:!1},fetched:!1,user:{}}},componentWillMount:function(){$.getJSON("/api/guru/soundcloud",function(a){this.setState({fetched:!0}),!a||a&&!a.soundcloud||(this.setState({soundcloud:a.soundcloud}),this.embedSoundCloudWidget())}.bind(this)),$.getJSON("/api/user",function(a){a&&(this.setState({user:a}),mixpanel.identify(a.email),mixpanel.people.set({$email:a.email,$name:a.name,$last_login:new Date}),mixpanel.track("Visited Apps page"))}.bind(this))},sync:function(){$.post("/api/guru/soundcloud",{soundcloud:this.state.soundcloud},function(){this.embedSoundCloudWidget()}.bind(this))},handleConnectWithSoundCloud:function(){SC.connect(function(){SC.get("/me",function(a){this.setState({soundcloud:{connected:!0,permalink_url:a.permalink_url,is_shown:!0}}),this.sync(),mixpanel.track("Connected SoundCloud")}.bind(this))}.bind(this))},handleDisConnectFromSoundCloud:function(){this.state.soundcloud.connected=!1,this.setState({soundcloud:this.state.soundcloud}),this.sync(),mixpanel.track("DisConnected SoundCloud")},loadDOM:function(){return this.state.fetched?this.state.soundcloud.connected?React.DOM.div(null,React.DOM.p({className:"gwg-callout gwg-callout-info text-light"}," Awesome! This SoundCloud widget will now be shown in your profile. ",React.DOM.a({id:"disconnect",className:"pull-right mt--4",onClick:this.handleDisConnectFromSoundCloud},React.DOM.img({src:"/images/btn-disconnect-l.png",alt:"Disconnect from SoundCloud"})))):React.DOM.div(null,React.DOM.p({className:"gwg-callout gwg-callout-info text-light"}," Connect with SoundCloud to share your public music on your Guitar with Guru profile. "),React.DOM.a({id:"connect",onClick:this.handleConnectWithSoundCloud},React.DOM.img({src:"/images/btn-connect-sc-l.png",alt:"Connect with SoundCloud"}))):Loading(null)},embedSoundCloudWidget:function(){var a=$(this.getDOMNode()).find("#embedSoundCloudWidget");this.state.soundcloud.connected?SC.oEmbed(this.state.soundcloud.permalink_url,function(b){a.html(b.html)}.bind(this)):a.empty()},componentDidMount:function(){this.embedSoundCloudWidget()},render:function(){return React.DOM.div({className:"has-min-height"},React.DOM.h3(null,"SoundCloud ",React.DOM.a({href:"http://soundcloud.com",target:"_blank"},React.DOM.i({className:"fa fa-external-link"}))),this.loadDOM(),React.DOM.div({id:"embedSoundCloudWidget"}))}}),YoutubeComponent=React.createClass({displayName:"YoutubeComponent",getInitialState:function(){return{videos:[],fetched:!1,authorized:!0,revoked:!1}},componentWillMount:function(){$.getJSON("/api/guru/youtube",function(a){!a||a&&!a.youtube||this.setState({videos:a.youtube})}.bind(this)),this.callbackName="youtube"+Math.floor(1e6*Math.random()),window[this.callbackName]=this.handleGPlusClientLoad,$.ajax({url:function(){return"https://apis.google.com/js/client.js?onload="+this.callbackName}.call(this),crossDomain:!0,dataType:"script"})},sync:function(){$.post("/api/guru/youtube",{youtube:this.state.videos},function(){mixpanel.track("Youtube app synced")})},handleGPlusClientLoad:function(){gapi.client.setApiKey(this.props.data.apiKey),this.checkAuth()},checkAuth:function(){gapi.auth.authorize({client_id:this.props.data.clientId,scope:this.props.data.scopes,immediate:!0},this.handleAuthResult.bind(this))},handleAuthResult:function(a){a&&!a.error?this.makeApiCall():(this.setState({authorized:!1}),this.state.videos.length&&this.setState({revoked:!0}),this.setState({fetched:!0}))},getEnabledStatus:function(a){var b=_.find(this.state.videos,function(b){return b.videoId===a},this);return b?b.enabled:!0},makeApiCall:function(){gapi.client.load("youtube","v3",function(){var a=gapi.client.youtube.channels.list({mine:!0,part:"contentDetails"});a.execute(function(a){var b=a.result.items[0].contentDetails.relatedPlaylists.uploads,c=gapi.client.youtube.playlistItems.list({playlistId:b,part:"snippet"});c.execute(function(a){var b=[],c={};_.each(a.result.items,function(a){c={title:a.snippet.title,description:a.snippet.description,videoId:a.snippet.resourceId.videoId,enabled:this.getEnabledStatus.call(this,a.snippet.resourceId.videoId)},b.push(c)},this),this.setState({videos:b,fetched:!0}),this.sync()}.bind(this))}.bind(this))}.bind(this))},bindGoogleCredsAndHandleAuthResult:function(a){this.setState({fetched:!1,authorized:!0,revoked:!1}),gapi.client.load("plus","v1",function(){var b=gapi.client.plus.people.get({userId:"me"});b.execute(function(b){var c={email:b.emails[0].value,google:{access_token:a.access_token}};$.post("/api/guru/accounts",c,function(){this.handleAuthResult.call(this,a)}.bind(this))}.bind(this))}.bind(this))},handleAuthClick:function(){return gapi.auth.authorize({client_id:this.props.data.clientId,scope:this.props.data.scopes,immediate:!1},this.bindGoogleCredsAndHandleAuthResult.bind(this)),!1},toggleStateFor:function(a){var b=this.state.videos.map(function(b){return b.videoId===a&&(b.enabled=!b.enabled),b});this.setState({videos:b}),this.sync()},enableAllVideos:function(){this.setState({videos:this.state.videos.map(function(a){return a.enabled=!0,a},this)}),this.sync()},disableAllVideos:function(){this.setState({videos:this.state.videos.map(function(a){return a.enabled=!1,a},this)}),this.sync()},render:function(){var a=function(a){return"http://i3.ytimg.com/vi/"+a+"/mqdefault.jpg"},b=function(a){return"http://youtube.com/watch?v="+a},c=function(a){return a.enabled?React.DOM.button({className:"btn btn-primary",onClick:this.toggleStateFor.bind(this,a.videoId)},React.DOM.i({className:"fa fa-check-square-o"})," Enabled "):React.DOM.button({className:"btn btn-default",onClick:this.toggleStateFor.bind(this,a.videoId)},React.DOM.i({className:"fa fa-frown-o"})," Disabled ")}.bind(this),d=this.state.videos.map(function(d){return React.DOM.li({className:"item bg-brand"},React.DOM.div({className:"media spacious"},React.DOM.div({className:"pull-left"},React.DOM.a({href:b(d.videoId),target:"_blank",className:"youtube-play"},React.DOM.img({className:"media-object",src:a(d.videoId)}))),React.DOM.div({className:"media-body spacious"},React.DOM.h4({className:"media-heading"},d.title),React.DOM.p({className:"text-light mb-20"},d.description),c(d))))}),e=function(){var a=_.find(this.state.videos,function(a){return!a.enabled},this);return a?React.DOM.a({className:"underline pull-right",onClick:this.enableAllVideos.bind(this)}," Enable All Videos "):void 0}.bind(this),f=function(){return this.state.authorized?void 0:this.state.revoked?React.DOM.div(null,React.DOM.p({className:"gwg-callout gwg-callout-warning text-light"}," It seems like you have revoked our access to your Google Account. We will continue to show the videos you enabled earlier. ",React.DOM.a({onClick:this.handleAuthClick.bind(this)},React.DOM.img({className:"wd-gplus",src:"/images/sign-in-with-google.png",alt:"login with Google"}))," to update your account with new uploads. Alternatively, you can ",React.DOM.a({className:"underline",onClick:this.disableAllVideos.bind(this)},"Disable All Videos"),". ")):React.DOM.div(null,React.DOM.p({className:"gwg-callout gwg-callout-info text-light"}," Connect your Google Account to fetch the videos you have uploaded on Youtube. "),React.DOM.div({"class":"text-center"},React.DOM.a({onClick:this.handleAuthClick.bind(this)},React.DOM.img({className:"wd-gplus",src:"/images/sign-in-with-google.png",alt:"login with Google"}))))}.bind(this),g=function(){return this.state.fetched?this.state.videos.length?React.DOM.div(null,React.DOM.p({className:"gwg-callout gwg-callout-info text-light"}," Videos marked as Enabled will be shown in your Guitar with Guru profile. ",e()),React.DOM.ul({className:"l-v-list list-unstyled"},d)):this.state.authorized?React.DOM.div(null,React.DOM.p({className:"gwg-callout gwg-callout-info text-light"}," Looks like you haven't uploaded any videos on Youtube. Never mind! ")):void 0:Loading(null)}.bind(this);return React.DOM.div({className:"has-min-height"},React.DOM.h3(null,"Youtube ",React.DOM.a({href:"http://youtube.com",target:"_blank"},React.DOM.i({className:"fa fa-external-link"}))),f(),g())}});React.renderComponent(SoundCloudComponent(null),document.getElementById("soundCloudAppManagement"));var youtubeData={clientId:"1008229016606-s7fjods4mi2h1me6bdh9mapv8154lmem.apps.googleusercontent.com",apiKey:"AIzaSyDdvmhjlHnK7rR2RaGy_1dVCbtDZ6Sr1fM",scopes:"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube.readonly"};React.renderComponent(YoutubeComponent({data:youtubeData}),document.getElementById("youtubeAppManagement"));