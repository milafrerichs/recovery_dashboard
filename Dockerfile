FROM ruby:2.2.0
RUN apt-get update && apt-get install -y nodejs npm git git-core
RUN npm install -g bower
RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN mkdir /recovery_dashboard
WORKDIR /recovery_dashboard
ADD Gemfile /recovery_dashboard/Gemfile
ADD Gemfile.lock /recovery_dashboard/Gemfile.lock
RUN bundle install
ADD bower.json /recovery_dashboard/bower.json
RUN bower install --allow-root
ADD . /recovery_dashboard

EXPOSE 4567
ENTRYPOINT [ "bundle", "exec" ]
CMD ["middleman", "server"]

