# Recovery Dashboard: Nepal Earthquake
[![Build Status](https://travis-ci.org/GFDRR/recovery_dashboard.svg)](https://travis-ci.org/GFDRR/recovery_dashboard)
[![codecov.io](http://codecov.io/github/milafrerichs/recovery_dashboard/coverage.svg?branch=master)](http://codecov.io/github/milafrerichs/recovery_dashboard?branch=master)
## Stack
This repo uses middleman, a static site generator, to build the site.
Once built middleman (and ruby, etc) is not needed.

The static site uses the following libraries:
- Angular
- OpenLayers 3

It uses them using another library called `angular-openlayers-directive` which can be found [here](https://github.com/tombatossals/angular-openlayers-directive)

Dependencies are installed using [bower](http://bower.io/)

## Development
The repo is a middleman site
### Installation

#### The docker way
Install Docker:
https://docs.docker.com/installation/

```shell
docker-compose up
```
add `-d` if you want it to run as a deamon
open your browser at your docker ip with port `4567`

or use the docker.sh script (which does the same as above

```shell
./docker.sh
```

#### the ruby way
Install ruby and rubygems and node/npm

#### Dependencies
```shell
bundle install
```
```shell
bower install
```
to install javascript dependencies

### Server
Run
```shell
middleman
```
to run the development server and open your browser at: `http://localhost:4567`
