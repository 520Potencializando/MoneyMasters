var utmkeeper={};(function(context){var config={forceOriginUTM:!0,fillForms:!0,utmObject:{},postLoad:null,};context.extractUrlParams=function(url='',prefix=''){var queryString='';if(url){var urlSplit=url.split('?');if(urlSplit.length>1){queryString=url.split('?')[1]}else{queryString=url.split('?')[0]}}else{queryString=window.location.search.slice(1)}
var obj={};if(queryString){queryString=queryString.split('#')[0];var arr=queryString.split('&');for(var i=0;i<arr.length;i++){var a=arr[i].split('=');var paramNum=undefined;var paramName=a[0].replace(/\[\d*\]/,function(v){paramNum=v.slice(1,-1);return''});var paramValue=typeof a[1]==='undefined'?!0:a[1];if(typeof paramName==='string'){paramName=paramName.toLowerCase()}
if(typeof paramValue==='string'){paramValue=unescape(paramValue).toLowerCase()}
if(paramName.startsWith(prefix)&&paramValue){if(obj[paramName]){if(typeof obj[paramName]==='string'){obj[paramName]=[obj[paramName]]}
if(typeof paramNum==='undefined'){obj[paramName].push(paramValue)}else{obj[paramName][paramNum]=paramValue}}else{obj[paramName]=paramValue}}}}
return obj}
context.toUrlSearch=function(obj){var searchUrl='';for(var key in obj){if(searchUrl!=''){searchUrl+='&'}
if(typeof obj[key]==='string'){searchUrl+=key+'='+encodeURIComponent(obj[key])}else{for(var i=0;i<obj[key].length;i++){if(i>0){searchUrl+='&'}
searchUrl+=key+'['+i.toString()+']='+encodeURIComponent(obj[key][i])}}}
return searchUrl}
context.load=function(customConfig){if(typeof customConfig==='object'){config=Object.assign(config,customConfig)}
var originSearchObj=Object.assign(config.utmObject,context.extractUrlParams(null,'utm_'));for(var link of document.querySelectorAll('a')){var base='';var search='';var hash='';var href='';var linkSearchObj=context.extractUrlParams(link.getAttribute('href'));var hrefSplit=link.getAttribute('href').split('#');if(hrefSplit.length>1){hash=hrefSplit[1]}
hrefSplit=hrefSplit[0].split('?');if(hrefSplit.length>1){search=hrefSplit[1]}
base=hrefSplit[0];if(base){href=base;var mergedSearchObj=null;if(config.forceOriginUTM){mergedSearchObj=Object.assign(linkSearchObj,originSearchObj)}else{mergedSearchObj=Object.assign(originSearchObj,linkSearchObj)}
search=context.toUrlSearch(mergedSearchObj);if(search){href+='?'+search}
if(hash){href+='#'+hash}
link.setAttribute('href',href)}}
if(config.fillForms){for(var form of document.querySelectorAll('form')){for(var key in originSearchObj){var input=form.querySelector('input[name="'+key+'"]');if(input){if(config.forceOriginUTM||!input.value){input.value=originSearchObj[key]}}else{input=document.createElement('input');input.type='hidden';input.name=key;input.value=originSearchObj[key];form.appendChild(input)}}}}
if(typeof config.postLoad==='function'){config.postLoad(originSearchObj)}}})(utmkeeper)