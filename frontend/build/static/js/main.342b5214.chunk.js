(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{10:function(e,a,t){e.exports=t(18)},16:function(e,a,t){},17:function(e,a,t){},18:function(e,a,t){"use strict";t.r(a);var n=t(0),s=t.n(n),c=t(8),r=t.n(c),l=t(9),o=t(1),i=t.n(o),m=t(2),u=t(3),d=t(4),p=t(5),h=t(6);t(16);var g=function(e,a){return s.a.createElement("div",{className:"start-box"},s.a.createElement("h1",{className:"start-header"},"Hello, welcome to mafia game"),s.a.createElement("div",{className:"start-buttons"},s.a.createElement("button",{className:"start-game",onClick:e},"Start Game"),s.a.createElement("input",{type:"text",className:"text-gameId",placeholder:"write the id of game here"}),s.a.createElement("button",{className:"connect-to-game",onClick:a},"Connect to game")))};t(17);function y(e){var a=e.places,t=e.takePlace,n=e.userId,c=e.place,r=e.changeName,l=e.changeStatusOnReady,o=e.handleClick,i=e.checkPlayersReadiness,m=s.a.createElement("div",{className:"box-player",onClick:o},s.a.createElement("div",{className:"player-name"},s.a.createElement("input",{type:"text",className:"text-name-area",placeholder:"write your name and push button >>>",autocomplete:"new-password"}),s.a.createElement("button",{className:"ready-button",onClick:function(){r({place:c}),l({place:c}),i()}}))),u=s.a.createElement("div",{className:"box-player"},s.a.createElement("div",{className:"player-name"},s.a.createElement("div",{className:"other-player"},a[c].name)));return a[c].id||n?a[c].id===n?a[c].readinessStatus?u:m:!0===a[c].readinessStatus?s.a.createElement("div",{className:"box-player green-board"},s.a.createElement("div",{className:"player-name"},s.a.createElement("div",{className:"other-player"},a[c].name))):s.a.createElement("div",{className:"box-player"},s.a.createElement("div",{className:"player-name"},s.a.createElement("div",{className:"other-player"},a[c].name))):s.a.createElement("div",{className:"box-player"},s.a.createElement("button",{className:"take-place",onClick:t.bind(void 0,{place:c})},"take place"))}var v=function(e){Object(h.a)(t,e);var a=Object(p.a)(t);function t(){return Object(u.a)(this,t),a.apply(this,arguments)}return Object(d.a)(t,[{key:"handleClick",value:function(e){e.target.classList.contains("ready-button")&&(e.currentTarget.style.border="2px green solid")}},{key:"render",value:function(){var e=this.handleClick,a=this.props,t=a.gameId,n=a.takePlace,c=a.userId,r=a.places,l=a.changeName,o=a.changeStatusOnReady,i=a.checkPlayersReadiness,m=a.role;return s.a.createElement("div",{className:"room"},s.a.createElement("div",{className:"room-box-chat"},s.a.createElement("div",{className:"taimer"},"Taimer"),s.a.createElement("div",{className:"chat"},s.a.createElement("div",{className:"cahts"},s.a.createElement("button",{className:"peace-chat"},"Peace Chat"),s.a.createElement("button",{className:"mafia-chat"},"Mafia Chat")),s.a.createElement("div",{className:"message-area"}),s.a.createElement("div",{className:"message"},s.a.createElement("input",{type:"text",className:"text-area"}),s.a.createElement("button",null,"Send")),s.a.createElement("div",{className:"role"},m))),s.a.createElement("div",{className:"room-box-players"},s.a.createElement("div",{className:"room-id"},"Game id: ",t),s.a.createElement("div",{className:"players-box"},s.a.createElement("div",{className:"players"},s.a.createElement(y,{takePlace:n,userId:c,places:r,place:"player1",changeName:l,changeStatusOnReady:o,handleClick:e,checkPlayersReadiness:i}),s.a.createElement(y,{takePlace:n,userId:c,places:r,place:"player2",changeName:l,changeStatusOnReady:o,handleClick:e,checkPlayersReadiness:i}),s.a.createElement(y,{takePlace:n,userId:c,places:r,place:"player3",changeName:l,changeStatusOnReady:o,handleClick:e,checkPlayersReadiness:i}),s.a.createElement(y,{takePlace:n,userId:c,places:r,place:"player4",changeName:l,changeStatusOnReady:o,handleClick:e,checkPlayersReadiness:i})))))}}]),t}(n.Component),f={gameId:void 0,status:void 0,role:void 0,readinessPlayersToStart:!1,userId:void 0,places:void 0},N=function(e){Object(h.a)(t,e);var a=Object(p.a)(t);function t(){var e;return Object(u.a)(this,t),(e=a.call(this)).startGame=Object(m.a)(i.a.mark((function a(){var t,n,s,c,r,l;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,fetch("/api/game",{method:"POST"});case 2:return t=a.sent,a.next=5,t.json();case 5:n=a.sent,s=n.gameId,c=n.game,r=c._status,l=c._places,e.setState({gameId:s,status:r,places:l});case 11:case"end":return a.stop()}}),a)}))),e.connectToGame=Object(m.a)(i.a.mark((function a(){var t,n,s,c,r,l,o;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return t=document.querySelector(".text-gameId").value,a.next=3,fetch("/api/game/".concat(t),{method:"GET"});case 3:return n=a.sent,a.next=6,n.json();case 6:s=a.sent,c=s.game,r=s.gameId,l=c._status,o=c._places,e.setState({status:l,gameId:r,places:o});case 12:case"end":return a.stop()}}),a)}))),e.takePlace=function(){var a=Object(m.a)(i.a.mark((function a(t){var n,s,c,r,l;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,fetch("/api/game/".concat(e.state.gameId,"/place"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});case 2:return n=a.sent,a.next=5,n.json();case 5:s=a.sent,c=s.userId,r=s.game,l=r._places,e.setState({userId:c,places:l});case 10:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}(),e.changeName=function(){var a=Object(m.a)(i.a.mark((function a(t){var n,s,c,r,l;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n={newName:document.querySelector(".text-name-area").value,userId:e.state.userId,place:t.place},a.next=3,fetch("/api/game/".concat(e.state.gameId,"/userName"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});case 3:return s=a.sent,a.next=6,s.json();case 6:c=a.sent,r=c.game,l=r._places,e.setState({places:l});case 10:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}(),e.changeStatusOnReady=function(){var a=Object(m.a)(i.a.mark((function a(t){var n,s,c,r;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,fetch("/api/game/".concat(e.state.gameId,"/status"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:e.state.userId,status:!0,place:t.place})});case 2:return n=a.sent,a.next=5,n.json();case 5:s=a.sent,c=s.game,r=c._places,e.setState({places:r});case 9:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}(),e.checkPlayersReadiness=Object(m.a)(i.a.mark((function a(){var t,n,s,c,r;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,fetch("/api/game/".concat(e.state.gameId,"/check"),{method:"GET"});case 2:if(t=a.sent,console.log(t.status),200!==t.status){a.next=15;break}return a.next=7,fetch("/api/game/".concat(e.state.gameId,"/roles"),{method:"PUT"});case 7:return n=a.sent,a.next=10,n.json();case 10:s=a.sent,c=s.game,r=c._places,!0,e.setState({places:r,readinessPlayersToStart:!0});case 15:case"end":return a.stop()}}),a)}))),e.showRole=Object(m.a)(i.a.mark((function a(){var t,n,s;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,fetch("/api/game/".concat(e.state.gameId,"/roles"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:e.state.userId})});case 2:return t=a.sent,a.next=5,t.json();case 5:n=a.sent,s=n.role,e.setState({role:s});case 8:case"end":return a.stop()}}),a)}))),e.switchForShowRole=!1,e.state=Object(l.a)({},f),e}return Object(d.a)(t,[{key:"callShowRole",value:function(e,a,t){!e&&a&&(t(),e=!0)}},{key:"render",value:function(){var e=this.state,a=e.gameId,t=e.userId,c=e.places,r=e.role,l=e.readinessPlayersToStart,o=this.switchForShowRole,i=this.startGame,m=this.connectToGame,u=this.takePlace,d=this.changeName,p=this.changeStatusOnReady,h=this.checkPlayersReadiness,y=this.callShowRole,f=this.showRole;return s.a.createElement(n.Fragment,null,s.a.createElement("div",{className:"Wrraper"},s.a.createElement("div",{className:"content"},a?s.a.createElement(v,{takePlace:u,gameId:a,userId:t,places:c,changeName:d,changeStatusOnReady:p,checkPlayersReadiness:h,role:r}):g(i,m)),y(o,l,f),console.log(this.state)))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(N,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[10,1,2]]]);
//# sourceMappingURL=main.342b5214.chunk.js.map