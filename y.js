fetch('/api/reports',{method:'POST',headers:{'Content-Type':'application/json'},body:'{"title":"XSS","content":"FIRED"}'}).catch(()=>{});
