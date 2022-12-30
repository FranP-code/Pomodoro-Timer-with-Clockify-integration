FROM alpine:latest as build

# ENV REACT_APP_FIREBASE_API_KEY = ${REACT_APP_FIREBASE_API_KEY}
# ENV REACT_APP_FIREBASE_APP_ID = ${REACT_APP_FIREBASE_APP_ID}
# ENV REACT_APP_ENVIRONMENT = ${REACT_APP_ENVIRONMENT}
# ENV DEPLOY_SERVICE = ${DEPLOY_SERVICE}

ARG REACT_APP_FIREBASE_API_KEY
ENV REACT_APP_FIREBASE_API_KEY $REACT_APP_FIREBASE_API_KEY

ARG REACT_APP_FIREBASE_APP_ID
ENV REACT_APP_FIREBASE_APP_ID $REACT_APP_FIREBASE_APP_ID

ARG REACT_APP_ENVIRONMENT
ENV REACT_APP_ENVIRONMENT $REACT_APP_ENVIRONMENT

ARG DEPLOY_SERVICE
ENV DEPLOY_SERVICE $DEPLOY_SERVICE

RUN apk add --update nodejs npm
RUN npm install --global yarn

COPY [".", "/usr/src"]
WORKDIR /usr/src

RUN yarn
RUN yarn build
RUN if [[ DEPLOY_SERVICE !== caprover ]]; then echo '/* https://clockify-pomodoro-timer.franp.site 200' | cat >build/_redirects; fi

FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
