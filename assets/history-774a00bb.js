import{_ as m,r as c,o as w,a,c as r,b as o,F as u,i as k,w as F,g as S,u as p,t as _,n as x,h as I,p as A,j as D,k as $}from"./bootstrap.min-045aca3c.js";import{a as l}from"./axios-47b9d439.js";const B=n=>(A("data-v-36a673a2"),n=n(),D(),n),C=B(()=>o("div",{class:"title"},[o("h1",{class:"display-4"},"下载任务")],-1)),L={class:"centered-div"},N={class:"progress"},V={class:"progress-div"},j=["href"],z={key:1,class:"btn btn-secondary",disabled:""},E=["onClick"],H={class:"alert alert-success"},M={__name:"App",setup(n){const i=c([]);let d=c(!1),y=c(""),h=c("");document.title="番茄小说下载器 | 下载任务";const v=async(e,s)=>{d.value=!1;try{const t=await l.get(`/api/down/del/${e}/`);d.value=!0,location.reload()}catch(t){console.error("Failed to fetch history data:",t)}},f=async()=>{try{const e=await l.get("/api/history/");i.value=e.data,console.log(e.data),console.log(typeof e.data),g()}catch(e){console.error("Failed to fetch history data:",e)}},g=()=>{setInterval(async()=>{for(const e of i.value.history)if(e.percent!==100)try{const s=await l.get(`/api/history/${e.obid}/`);e.percent=s.data.percent,console.log(e.percent)}catch(s){console.error("Failed to fetch progress:",s),location.reload()}},800)},b=async()=>{try{const e=await l.get("/api/get_config/");console.log(e.data),h.value=e.data.download_url,version.value=e.data.version}catch(e){console.error("Failed to fetch history data:",e)}};return w(()=>{b(),f()}),(e,s)=>(a(),r(u,null,[C,o("div",L,[(a(!0),r(u,null,k(i.value.history,t=>(a(),r("div",{key:t.obid,class:"history-item"},[o("h2",null,_(t.file_name),1),o("div",N,[o("div",{class:"progress-bar",style:x({width:`${t.percent}%`})},null,4)]),o("div",V,[I(_(t.percent)+"% ",1),t.percent===100?(a(),r("a",{key:0,href:p(h)+t.file_name,class:"btn btn-primary"}," 下载 ",8,j)):(a(),r("button",z," 下载 ")),o("button",{class:"btn btn-danger mt-3",onClick:T=>v(t.obid,t.file_name)},"删除",8,E)])]))),128)),F(o("div",H,[o("strong",null,_(p(y))+" 删除成功!",1)],512),[[S,p(d)]])])],64))}},P=m(M,[["__scopeId","data-v-36a673a2"]]);$(P).mount("#app");
