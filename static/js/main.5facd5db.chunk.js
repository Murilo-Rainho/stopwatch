(this.webpackJsonpstopwatch=this.webpackJsonpstopwatch||[]).push([[0],{14:function(t,e,n){},15:function(t,e,n){},17:function(t,e,n){"use strict";n.r(e);var a=n(1),s=n.n(a),c=n(8),i=n.n(c),r=(n(14),n(15),n(9)),u=n(3),o=n(4),m=n(6),l=n(5),b=n.p+"static/media/wabalabadubdub.5266e9d0.mp3",h=n(2),j=n.p+"static/media/mr_meeseeks.7e25a6d4.mp3",p=n(0),d=function(t){Object(m.a)(n,t);var e=Object(l.a)(n);function n(t){var a;return Object(u.a)(this,n),(a=e.call(this,t)).playPause=function(){a.state.musicSituation?(a.mr_meeseeks.pause(),a.setState((function(){return{musicSituation:!1}}))):(a.mr_meeseeks.play(),a.setState((function(){return{musicSituation:!0}})))},a.muteOnOff=function(){},a.turnOn=function(){a.playPause(),a.setState((function(){return{disappear:"none"}}));var t=setInterval((function(){var t=a.state,e=t.sec,n=t.min,s=t.hr;0===e&&0===n&&0===s?a.stopTimerSet():(a.setState((function(t){return{sec:t.sec-1}})),0===e&&n>=0&&a.setState((function(t){return{min:t.min-1,sec:59}})),0===n&&s>=0&&0===e&&a.setState((function(t){return{hr:t.hr-1,min:59}})))}),100);a.setState((function(){return{timerSet:t}}))},a.stopTimerSet=function(){a.setState((function(){return{disappear:"flex"}}));var t=a.state.timerSet;a.setState((function(){return{sec:0}})),clearInterval(t)},a.handleChange=function(t){var e=t.target,n=a.state,s=(n.sec,n.min,n.hr,e.name),c=e.value;c?"hr"===s&&c>23?(a.setState((function(){return Object(h.a)({},s,23)})),e.value=23):c>59?(a.setState((function(){return Object(h.a)({},s,59)})),e.value=59):a.setState((function(){return Object(h.a)({},s,parseInt(c))})):a.setState((function(){return Object(h.a)({},s,0)}))},a.inputsNumbers=function(){var t=a.state.disappear;return Object(p.jsxs)("section",{style:{display:"".concat(t)},className:"timer-inputs",children:[Object(p.jsx)("input",{onChange:a.handleChange,max:"59",placeholder:"HR",className:"input-number",type:"number",name:"hr",id:"hr"}),Object(p.jsx)("p",{className:"two-points",children:":"}),Object(p.jsx)("input",{onChange:a.handleChange,max:"59",placeholder:"MIN",className:"input-number",type:"number",name:"min",id:"min"}),Object(p.jsx)("p",{className:"two-points",children:":"}),Object(p.jsx)("input",{onChange:a.handleChange,max:"59",placeholder:"SEC",className:"input-number",type:"number",name:"sec",id:"sec"})]})},a.state={sec:0,min:0,hr:0,disappear:"flex",buttonDisable:!1,musicSituation:!1},a.mr_meeseeks=new Audio(j),a}return Object(o.a)(n,[{key:"render",value:function(){var t=this.state,e=t.sec,n=t.min,a=t.hr,s=t.buttonDisable,c=t.musicSituation;return Object(p.jsxs)("section",{className:"stopwatch",children:[Object(p.jsx)("section",{className:"timer",children:Object(p.jsxs)("h1",{children:[a," : ",n," : ",e]})}),Object(p.jsxs)("section",{className:"timer-buttons_container",children:[this.inputsNumbers(),Object(p.jsxs)("section",{className:"timer-buttons",children:[Object(p.jsx)("button",{disabled:s,className:"button",onClick:this.turnOn,children:"Start"}),Object(p.jsx)("button",{onClick:this.playPause,className:"button",children:c?"Pause":"Play"})]})]})]})}}]),n}(a.Component),f=function(t){Object(m.a)(n,t);var e=Object(l.a)(n);function n(t){var a;return Object(u.a)(this,n),(a=e.call(this,t)).state={},a.wabalaba=new Audio(b),a}return Object(o.a)(n,[{key:"render",value:function(){return Object(r.a)(this.state),Object(p.jsxs)("div",{className:"main",children:[Object(p.jsx)(d,{}),Object(p.jsx)("section",{})]})}}]),n}(a.Component);var O=function(){return Object(p.jsx)("div",{className:"App",children:Object(p.jsx)(f,{})})},S=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(e){var n=e.getCLS,a=e.getFID,s=e.getFCP,c=e.getLCP,i=e.getTTFB;n(t),a(t),s(t),c(t),i(t)}))};i.a.render(Object(p.jsx)(s.a.StrictMode,{children:Object(p.jsx)(O,{})}),document.getElementById("root")),S()}},[[17,1,2]]]);
//# sourceMappingURL=main.5facd5db.chunk.js.map