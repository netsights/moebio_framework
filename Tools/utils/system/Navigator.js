function Navigator(){};
var userAgent;
var userAgentVersion;
Navigator.IE="IE";
Navigator.NS="NS";
Navigator.IOS="IOS";

detectUserAgent=function(){
  if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){ //test for MSIE x.x;
    userAgent=Navigator.IE;
    userAgentVersion=new Number(RegExp.$1) // capture x.x portion and store as a number
  }
  if(navigator.userAgent.match(/iPad/i) != null){
    userAgent=Navigator.IOS;
  }
  if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){ //test for Firefox/x.x or Firefox x.x (ignoring remaining digits);
    userAgent=Navigator.NS;
    userAgentVersion=new Number(RegExp.$1) // capture x.x portion and store as a number
   }
}
Navigator.getUserAgent=function(){
  return userAgent;
}
Navigator.getUserAgentVersion=function(){
  return userAgentVersion;
}