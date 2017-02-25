# AdoBot-IO
[AdoBot](https://github.com/adonespitogo/AdoBot) NodeJS Server with socket.io


# Server Setup

## Create app on Heroku
 - Sign up to [Heroku](http://heroku.com) 
 - Create a new app (Click the `New` button in the top right of the dashboard)
 - Name your app to whatever you want. Let's name it `your-app` for example purposes
 
## Setup Mysql Server
 - Go to "Resources" tab
 - In the "Addons" section, type "ClearDB" and select the first suggestion
 - Click `Provision` when prompted
 
## Configure the app
 - Go to the settings tab of your new app
 - Click `Reveal Config Vars` button
 - Copy the VALUE of `CLEARDB_DATABASE_URL` KEY
 - Create a new KEY named `DATABASE_URL` and the paste into the `VALUE` field the copied value of `CLEARDB_DATABASE_URL`. Click `ADD` to save.
 - Create a new KEY named `ADMIN_USERNAME` and the VALUE will be your desired username used to login into the panel later. Then click `ADD` button
 - Create a new KEY named `ADMIN_PASSWORD` and the VALUE will be your desired password used to login into the panel later. Then click `ADD` button

## Upload the source to Heroku
 - Download and install Heroku CLI as outlined [here](https://devcenter.heroku.com/articles/heroku-command-line)
 - If you don't have git command line tool, you might as well [install](https://git-scm.com/downloads) it
 - After installation of Heroku CLI, open command line and type:
   ```
   $ heroku login
   ```
   Enter your login email and password
 - Go to "Settings" tab
 - Find the "Info" section and copy the `Heroku Git URL` field. It looks like `https://git.heroku.com/your-app.git`
 - Download this repository and extract the contents of the zip file
 - Then `cd` into the the extracted directory. ex `cd ~/Downloads/AdoBot`
 - Then enter the commands below (Remember to change `your-app` to the name of your app)
```
$ git init
$ git remote add heroku https://git.heroku.com/your-app.git
$ git add .
$ git commit -am "initial commit"
$ git push heroku master
$ heroku open
```
  - That's it, your  done! Now set up the [AdoBot](https://github.com/adonespitogo/AdoBot) android client if you haven't done it yet.

# Development
## System Requirements
- NodeJS
- MySql
## Setup

Create `adobot` mysql schema/database.

Edit `./config/config.json` to your preferences.

Install dependencies:
```
$ sudo npm install -g sequelize-cli gulp gulp-cli
$ npm install
```
Run local server
```
$ node index.js
```
Browse to http://127.0.0.1:3000

# License

Released under [MIT License](./MIT-License.txt)

