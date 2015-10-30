# scp.click
Send everything to everywhere within 3 steps!


## Run the server

## Q&A

Q: The website seems not using websocket, instead it's http pooling.
A: Ensure below `site-enabled/default` configured headers correctly:

```
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
```

Complete configuration:

```
server {
  server_name scp.click
  listen 80 default_server;
  proxy_cache cache_zone;

  location / {
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://localhost:5000;
  }
}
```
