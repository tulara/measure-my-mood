# How to run

### Prerequisites
- docker (I used version 18.03.0-ce)
- docker-compose (I used version 1.20.1)
- node (version > 7.6, I used version 8.12.0)

Start mongo:
```
$ cd docker
$ docker-compose up
```
If your container host doesn't run on 192.168.99.100 (the default) please export MONGO_HOST
to the IP address of your docker host.

Start the express server:
```
npm install
npm run start:server
```
This rest API will boot up on port 3001.

Start the react client:
```
npm start
```
Should open your default browser to the homepage but if not navigate to localhost:3000.

# Running Tests
```
npm test
```

# Credit to

Credit to [AomAm](https://thenounproject.com/aomam/collection/koala-emoticons-line/) from the noun project for the koala icons.

# Architecture
The client is a react app bootstrapped using [create-react-app](https://github.com/facebook/create-react-app) and then ejected to integrate sass compilation and allow a little more freedom in configuration.  As such I expect the client is a little bloated (there are a number of webpack configurations and scripts I am not using yet), but it's a really quick way to get started.  

I have grouped component files together (.jsx, scss, and specs).

The server is an express node server using [mongoose](https://mongoosejs.com/) to connect to MongoDB.
I've dockerised mongo with a docker-compose file, intending that the client and server could be thrown in as well (didn't quite get there but figured you'd probably have node installed locally).

# Caveats (aka woudla coulda shoulda)
Test coverage is woeful. The reason for this is, as new as I am to React, I've not worked at all with jest and enzyme and didn't want learning these (so far awesome!) tools to get in the way of producing a working solution.
I used postman scripts to verify server output and Chrome React developer tools to verify component state.

I didn't spend any time on polyfills or browser support. Babel is included with the webpack setup so I used some newer ES features and tested in firefox and chrome. All bets off for IE ;P

I also spent little time on performance tuning - e.g. there are no service workers, I use the default connection pooling for mongoose etc.
