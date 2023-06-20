FROM node:14.21.3-bullseye As build
RUN git clone https://github.com/tteog-ip/app-front
WORKDIR /app-front
RUN npm install
RUN chmod +x node_modules/.bin/react-scripts
RUN npm run build
FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/index.html
COPY --from=build /app-front/build/* /usr/share/nginx/html
RUN rm -rf /etc/nginx/sites-available/default
COPY /app-front/default /etc/nginx/sites-available/default
CMD nginx -g "daemon off;"