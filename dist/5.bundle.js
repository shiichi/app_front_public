webpackJsonp([5],{285:function(e,t){"use strict";function n(e,t){sessionStorage.setItem(e,JSON.stringify(t))}function a(e){return JSON.parse(sessionStorage.getItem(e))}function l(e,t){localStorage.setItem(e,JSON.stringify(t))}function r(e){return JSON.parse(localStorage.getItem(e))}function o(e){return localStorage.removeItem(e)}t.__esModule=!0,t.setSession=n,t.getSession=a,t.setLocal=l,t.getLocal=r,t.delLocal=o},326:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function l(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(){return{type:y.MODAL_ON}}function o(){return{type:y.MODAL_OFF}}function s(e){return{type:y.ADD_MESSAGE,msg:e}}function u(e){return{type:y.DELETE_MESSAGE,id:e}}function c(e){return{type:y.UPDATE_USERINFO_RESERVATION,num:e}}function i(e){return{type:y.SET_RESERVATION,rsvs:e}}function f(e){return function(t){return g["default"](h.domainName+"/api/getTestToken",{method:"post",headers:{Accept:"application/json","Content-Type":"application/json","X-CSRF-Token":h.CSRFToken},credentials:"same-origin",body:JSON.stringify(e)}).then(function(e){return e.json()}).then(function(e){"error"===e.msg.type&&t(s(e.msg)),"success"===e.msg.type&&(b.setLocal("testConnection",e.jwt),t(r()))})["catch"](function(e){return console.log(e)})}}function d(e){return function(t){return g["default"](h.domainName+"/api/reserve",{method:"post",headers:{Accept:"application/json","Content-Type":"application/json","X-CSRF-Token":h.CSRFToken},credentials:"same-origin",body:JSON.stringify(e)}).then(function(e){return e.json()}).then(function(e){if("error"===e.msg.type&&t(s(e.msg)),"success"===e.msg.type){b.delLocal("testConnectionResult");var n="flight"+e.jwt.id;b.setLocal(n,e.jwt.token),t(s(e.msg)),t(c(e.reservations))}})["catch"](function(e){return console.log(e)})}}function p(){return function(e){return g["default"](h.domainName+"/api/rsvList",{method:"post",headers:{Accept:"application/json","Content-Type":"application/json","X-CSRF-Token":h.CSRFToken},credentials:"same-origin"}).then(function(e){return e.json()}).then(function(t){return e(i(t))})["catch"](function(e){return console.log(e)})}}function m(e){return function(t){return g["default"](h.domainName+"/api/cancel",{method:"post",headers:{Accept:"application/json","Content-Type":"application/json","X-CSRF-Token":h.CSRFToken},credentials:"same-origin",body:JSON.stringify(e)}).then(function(e){return e.json()}).then(function(n){if("error"===n.msg.type&&t(s(n.msg)),"success"===n.msg.type){var a="flight"+e.id;b.delLocal(a),localStorage.removeItem(a),t(s(n.msg)),t(p()),t(c(n.reservations))}})["catch"](function(e){return console.log(e)})}}t.__esModule=!0,t.modalOn=r,t.modalOff=o,t.addMessage=s,t.deleteMessage=u,t.setReservation=i,t.validateReservation=f,t.reserve=d,t.getDefaultRsv=p,t.cancel=m;var E=n(67),y=l(E),h=n(139),v=n(181),g=a(v),b=n(285)},327:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var o=n(1),s=a(o),u=function(e){function t(){l(this,t),e.apply(this,arguments)}return r(t,e),t.prototype.handleClick=function(e){var t=Number(e.target.title);this.props.deleteMessage(t)},t.prototype.render=function(){var e=this.props.message,t=[];if(e)for(var n=e,a=Array.isArray(n),l=0,n=a?n:n[Symbol.iterator]();;){var r;if(a){if(l>=n.length)break;r=n[l++]}else{if(l=n.next(),l.done)break;r=l.value}var o=r;"success"===o.type?t.push(s["default"].createElement("div",{className:"custom-alert alert-success",key:o.id},s["default"].createElement("p",{className:"alert-title"},o.msg),s["default"].createElement("p",{className:"alert-detail"},o.id),s["default"].createElement("span",{className:"btn-close",title:o.id,onClick:this.handleClick.bind(this)},"×"))):"error"===o.type&&t.push(s["default"].createElement("div",{className:"custom-alert alert-danger",key:o.id},s["default"].createElement("p",{className:"alert-title"},o.msg),s["default"].createElement("p",{className:"alert-detail"},o.id),s["default"].createElement("span",{className:"btn-close",title:o.id,onClick:this.handleClick.bind(this)},"×")))}return s["default"].createElement("div",{className:"alert-wrap"},t)},t}(o.Component);u.propTypes={message:o.PropTypes.object,deleteMessage:o.PropTypes.func.isRequired},t["default"]=u,e.exports=t["default"]},490:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var o=n(1),s=a(o),u=function(e){function t(){l(this,t),e.apply(this,arguments)}return r(t,e),t.prototype.render=function(){return s["default"].createElement("div",{className:"content-head"},s["default"].createElement("h3",null,"予約リスト"),s["default"].createElement("p",null,"予約の確認・キャンセル・操作画面の起動が行えます"))},t}(o.Component);t["default"]=u,e.exports=t["default"]},491:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var o=n(1),s=a(o),u=n(492),c=a(u),i=function(e){function t(){l(this,t),e.apply(this,arguments)}return r(t,e),t.prototype.render=function(){var e=this.props,t=e.reservation,n=e.cancel;console.log(t);var a=t.map(function(e){return s["default"].createElement(c["default"],{status:e,cancel:n})});return s["default"].createElement("div",null,a)},t}(o.Component);t["default"]=i,e.exports=t["default"]},492:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var o=n(1),s=a(o),u=function(e){function t(){l(this,t),e.apply(this,arguments)}return r(t,e),t.prototype.handleClick=function(e){var t={id:e.target.title};this.props.cancel(t)},t.prototype.render=function(){var e=this.props.status;return s["default"].createElement("div",{className:"panel panel-default reservation"},s["default"].createElement("div",{className:"panel-heading"},s["default"].createElement("h5",{className:"panel-title"},e.flight_at),s["default"].createElement("button",{type:"button",className:"btn btn-info btn-sm"},s["default"].createElement("a",{href:"/mypage/flight"},"フライト画面へ"))),s["default"].createElement("div",{className:"panel-body"},s["default"].createElement("div",{className:"row main-status"},s["default"].createElement("div",{className:"col-sm-4"},s["default"].createElement("img",{alt:"",src:"/img/demo.jpg"})),s["default"].createElement("div",{className:"col-sm-8"},s["default"].createElement("div",{className:"status-body"},s["default"].createElement("table",{className:"table"},s["default"].createElement("tbody",null,s["default"].createElement("tr",null,s["default"].createElement("td",null,s["default"].createElement("span",{className:""},"タイプ")),s["default"].createElement("td",null,e.type)),s["default"].createElement("tr",null,s["default"].createElement("td",null,s["default"].createElement("span",{className:""},"飛行場所")),s["default"].createElement("td",null,e.place)),s["default"].createElement("tr",null,s["default"].createElement("td",null,s["default"].createElement("span",{className:""},"利用時間")),s["default"].createElement("td",null,"15分")),s["default"].createElement("tr",null,s["default"].createElement("td",null,s["default"].createElement("span",{className:""},"機体情報")),s["default"].createElement("td",null,"試作機 No.3"))))))),s["default"].createElement("div",{className:"row connection-status"},s["default"].createElement("h4",null,"接続テスト結果",s["default"].createElement("span",{className:"help"},"※必ず接続テストを行った場所でご利用ください")),s["default"].createElement("div",{className:"col-sm-6"},s["default"].createElement("div",{className:"status-body"},s["default"].createElement("table",{className:"table"},s["default"].createElement("tbody",null,s["default"].createElement("tr",null,s["default"].createElement("td",null,s["default"].createElement("span",{className:""},"IPアドレス")),s["default"].createElement("td",null,e.env.ip_address)),s["default"].createElement("tr",null,s["default"].createElement("td",null,s["default"].createElement("span",{className:""},"ダウンロード速度")),s["default"].createElement("td",null,e.env.down_load,"Kbps")),s["default"].createElement("tr",null,s["default"].createElement("td",null,s["default"].createElement("span",{className:""},"アップロード通信速度")),s["default"].createElement("td",null,e.env.up_load,"kbps")))))),s["default"].createElement("div",{className:"col-sm-6"},s["default"].createElement("div",{className:"status-body"},s["default"].createElement("table",{className:"table"},s["default"].createElement("tbody",null,s["default"].createElement("tr",null,s["default"].createElement("td",null,s["default"].createElement("span",{className:""},"ブラウザ")),s["default"].createElement("td",null,e.env.browser)),s["default"].createElement("tr",null,s["default"].createElement("td",null,s["default"].createElement("span",{className:""},"接続方式")),s["default"].createElement("td",null,e.env.connection_method)),s["default"].createElement("tr",null,s["default"].createElement("td",null,s["default"].createElement("span",{className:""},"遅延時間")),s["default"].createElement("td",null,"なし"))))))),s["default"].createElement("div",{className:"row cancel"},s["default"].createElement("p",{title:e.pivot.id,onClick:this.handleClick.bind(this)},"キャンセル"))))},t}(o.Component);t["default"]=u,e.exports=t["default"]},493:function(e,t,n){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function l(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){var t=e.message,n=e.reservation;return{message:t,reservation:n}}function u(e){return{rsvActions:f.bindActionCreators(m,e)}}t.__esModule=!0;var c=n(1),i=l(c),f=n(70),d=n(136),p=n(326),m=a(p),E=n(327),y=l(E),h=n(490),v=l(h),g=n(491),b=l(g),_=function(e){function t(){r(this,t),e.apply(this,arguments)}return o(t,e),t.prototype.componentDidMount=function(){var e=this.props.rsvActions.getDefaultRsv;e()},t.prototype.render=function(){var e=this.props,t=e.message,n=e.reservation,a=e.rsvActions;return i["default"].createElement("div",null,i["default"].createElement(y["default"],{message:t,deleteMessage:this.props.rsvActions.deleteMessage}),i["default"].createElement(v["default"],null),i["default"].createElement(b["default"],{reservation:n,cancel:a.cancel}))},t}(c.Component);_.propTypes={message:c.PropTypes.object.isRequired,reservation:c.PropTypes.bool.isRequired,rsvActions:c.PropTypes.object.isRequired},t["default"]=d.connect(s,u)(_),e.exports=t["default"]}});
//# sourceMappingURL=5.bundle.js.map