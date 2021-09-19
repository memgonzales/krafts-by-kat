# Krafts by Kat
![badge][badge-html5]
![badge][badge-bootstrap]
![badge][badge-js]
![badge][badge-jquery]
![badge][badge-mongodb]
![badge][badge-express]
![badge][badge-nodejs]
![badge][badge-mocha]

This project is a software solution (web application) for **Krafts by Kat**, an online retail business founded in 2017 that provides customized corporate giveaways to clients. It is the major course output in an introduction to software engineering class. 

The deployed website can be accessed through this link: http://krafts-by-kat.herokuapp.com.

A detailed walkthrough of the features is provided in this [video](https://drive.google.com/file/d/1n9dvAOM72-JefUJLENNKtDjlLNEqZUGH/view?usp=sharing).

## Project Structure
The project consists of the following folders:
| Folder | Description |
| --- | --- |
| [<code>.vscode</code>](https://github.com/memgonzales/krafts-by-kat/tree/master/.vscode) | Contains the configuration files used by Visual Studio Code's built-in debugger
| [<code>controllers</code>](https://github.com/memgonzales/krafts-by-kat/tree/master/controllers) | Contains the JavaScript files that define callback functions for client-side requests |
| [<code>helpers</code>](https://github.com/memgonzales/krafts-by-kat/tree/master/helpers) | Contains the JavaScript files that define helper functions for front-end display and server-side validation | 
| [<code>misc</code>](https://github.com/memgonzales/krafts-by-kat/tree/master/misc) | Contains the JavaScript files for initial database population |
| [<code>models</code>](https://github.com/memgonzales/krafts-by-kat/tree/master/models) | Contains the JavaScript files for database modeling (schemas) and access | 
| [<code>public</code>](https://github.com/memgonzales/krafts-by-kat/tree/master/public) | Contains the static CSS and JavaScript files, as well as the project assets (image files), for front-end display |
| [<code>routes</code>](https://github.com/memgonzales/krafts-by-kat/tree/master/routes) | Contains the JavaScript file that defines the server response to each HTTP method request |
| [<code>test</code>](https://github.com/memgonzales/krafts-by-kat/tree/master/routes) | Contains the JavaScript files that define the utility functions and scenarios for the automated unit tests |
| [<code>views</code>](https://github.com/memgonzales/krafts-by-kat/tree/master/views) | Contains the Handlebars template files to be rendered and displayed upon request |

It also includes the following files:

| File | Description |
| --- | --- |
| [<code>package-lock.json</code>](https://github.com/memgonzales/krafts-by-kat/blob/master/package-lock.json) and [<code>package.json</code>](https://github.com/memgonzales/krafts-by-kat/blob/master/package.json) | Store information on the project dependencies |
| [<code>index.js</code>](https://github.com/memgonzales/krafts-by-kat/blob/master/index.js) | Entry point of the web application |
| [<code>Procfile</code>](https://github.com/memgonzales/krafts-by-kat/blob/master/Procfile) | Specifies the commands that are run by the app on startup (Heroku)

## Entity Relationship Diagram

The entity relationship diagram to illustrate the schemas can be viewed [here](https://drive.google.com/file/d/1dkrmvvhiB5CKofxZo6iT1PgoxlP6JL0j/view?usp=sharing).

## Running the Application

### Running on the Web

Open the following website: http://krafts-by-kat.herokuapp.com.

### Running Locally

1. Before running the application locally, the following software have to be installed:

   | Software | Description | Download Link | License |
   | --- | --- | --- | --- |
   | Node.js | JavaScript runtime built on Chrome's V8 JavaScript engine | https://nodejs.org/en/download/ | MIT License |
   | git *(optional)* | Distributed version control system | https://git-scm.com/downloads | GNU General Public License v2.0 |

2. Create a copy of this repository:
   - If git is installed, type the following command on the terminal:
   
     ```
     git clone https://github.com/memgonzales/krafts-by-kat
     ```
      
   - If git is not installed, click the green `Code` button near the top right of the repository and choose `Download ZIP`. Once the zipped folder has been downloaded, extract its contents.

3. On the main project directory, run the following command to **install the dependencies**: 

   ```
   npm install
   ```

   If the command is executed successfully, the dependencies will be installed into the folder <code>node_modules</code> following the dependency tree found in [<code>package-lock.json</code>](https://github.com/memgonzales/krafts-by-kat/blob/master/package-lock.json).

###
   ***The project uses a pre-populated remote database. DO STEPS 4 AND 6 ONLY AFTER A DATABASE RESET OR MIGRATION TO A LOCAL DATABASE.***

4. Run the following commands to populate the database with the necessary collections:

   ```
   node misc/populate_display.js
   node misc/populate_client.js
   node misc/populate_business_owner.js
   ```
   
5. Run the following command to **run the server**: 
   ```
   node index.js
   ```
   
6. Upload the [logo](https://github.com/memgonzales/krafts-by-kat/blob/master/public/img/kbk-logo.png) of Krafts by Kat through the file input field found on the following page:
   ```
   http://localhost:3000/uploadsTest
   ```

7. Open the web application by accessing the following link on a browser:
   ```
   http://localhost:3000
   ```
   
   <img src="https://github.com/memgonzales/krafts-by-kat/blob/master/public/img/screenshot.PNG?raw=True" alt="Homepage" width = 750> 


### Credentials (For Testing Only)
To log in as an administrator, enter the following credentials:
- **Username:** `kraftsbykatadmin`
- **Email Address:** `krafts.by.kat.webmaster@gmail.com`
- **Password:** `ASDFGHJKL123;`

To log in as a customer, enter the following credentials:
- **Username:** `shibaichi` (or `akitani`)
- **Email Address:** `kentaroshiba@gmail.com` (or `wolfdog@gmail.com`)
- **Password:** `ASDFGHJKL123;` (same password for both test accounts)

## Testing the Application
The software development team uses <a href = "https://code.visualstudio.com/">Visual Studio Code</a> as its integrated development environment. It is also employed by the developers for the purposes of addressing syntax errors, refactoring code, and stepping it through a debugger prior to checking into the repository. 

### Automated Testing
Aside from manual integration testing, automated unit tests were also performed in light of the test-driven development methodology. The steps for running the automated unit tests are as follows:

1. Ensure that the necessary development dependencies *(enumerated in the next section)* have been installed. Otherwise, run the following command to install them:
   ```
   npm install --only=dev
   ```

2. Before running the automated tests, terminate the server, alongside any running instance of the app.

4. Run the following command in the terminal to begin the automated testing:

   ```
   npm run test
   ```

## Dependencies
This project uses the following production dependencies:

| Package | Version | Description | License |
| --- | --- | --- | --- |
| [<code>bcrypt</code>](https://www.npmjs.com/package/bcrypt) | 5.0.1 | Package for hashing passwords | Apache License 2.0 |
| [<code>body-parser</code>](https://www.npmjs.com/package/body-parser) | 1.19.0 | Package for parsing incoming requests in a middleware before the handlers | MIT License |
| [<code>connect-mongo</code>](https://www.npmjs.com/package/connect-mongo) | 3.2.0 | MongoDB session store for Connect and Express | MIT License |
| [<code>dotenv</code>](https://www.npmjs.com/package/dotenv) | 10.0.0 | Package for loading environment variables from an <code>.env</code> file | BSD 2-Clause "Simplified" License |
| [<code>express</code>](https://www.npmjs.com/package/express) | 4.17.1 | Unopinionated and minimalist framework for Node.js | MIT License | 
| [<code>express-handlebars</code>](https://www.npmjs.com/package/express-handlebars) | 5.3.2 | Handlebars view engine for Express | BSD 3-Clause "New" or "Revised" License
| [<code>express-session</code>](https://www.npmjs.com/package/express-session) | 1.17.1 | Session middleware for Express | MIT License |
| [<code>express-validator</code>](https://www.npmjs.com/package/express-validator) | 6.10.1 | Express middleware for validator, a library of string validators and sanitizers | MIT License |
| [<code>gridfs-stream</code>](https://www.npmjs.com/package/gridfs-stream) | 1.1.1 | Package for streaming files to and from MongoDB GridFS | MIT License |
| [<code>hbs</code>](https://www.npmjs.com/package/hbs) | 4.1.2 | Express view engine for Handlebars | MIT License |
| [<code>jquery</code>](https://www.npmjs.com/package/jquery) | 3.6.0 | Fast, small, and feature-rich JavaScript library | MIT License
| [<code>mongodb</code>](https://www.npmjs.com/package/mongodb) | 3.7.1 | Official MongoDB driver for Node.js | Apache License 2.0 |
| [<code>mongoose</code>](https://www.npmjs.com/package/mongoose) | 5.13.9 | MongoDB object modeling tool designed to work in an asynchronous environment | MIT License |
| [<code>multer</code>](https://www.npmjs.com/package/multer) | 1.4.2 | Middleware for handling <code>multipart/form-data</code>, primarily used for file uploads | MIT License |
| [<code>multer-gridfs-storage</code>](https://www.npmjs.com/package/multer-gridfs-storage) | 4.2.0 | GridFS storage engine for Multer to store uploaded files directly to MongoDB | MIT License |
| [<code>no-cache</code>](https://www.npmjs.com/package/nocache) | 3.0.1 | Middleware for setting some HTTP response headers to try to disable client-side caching | MIT License
| [<code>nodemailer</code>](https://www.npmjs.com/package/nodemailer) | 6.6.0 | Package for sending emails with Node.js | MIT License | 

The following table lists the development dependencies:

| Package | Version | Description | License |
| --- | --- | --- | --- |
| [<code>@types/jsdom</code>](https://www.npmjs.com/package/@types/jsdom) | 16.2.13 | Contains type definitions for JSDom | MIT License |
| [<code>chai</code>](https://www.npmjs.com/package/chai) | 4.3.4 | Behavior- and test-driven development assertion library for Node.js | MIT License |
| [<code>chai-http</code>](https://www.npmjs.com/package/chai-http) | 4.3.0 | HTTP integration testing with Chai assertions | MIT License |
| [<code>chai-jquery</code>](https://www.npmjs.com/package/chai-jquery) | 2.1.0 | Extension to the chai assertion library that provides a set of jQuery-specific assertions | MIT License |
| [<code>jsdom</code>](https://www.npmjs.com/package/jsdom) | 17.0.0 | Pure-JavaScript implementation of many web standards, notably the WHATWG DOM and HTML Standards, for use with Node.js |  MIT License |
| [<code>mocha</code>](https://www.npmjs.com/package/mocha) | 9.1.1 | Simple and flexible JavaScript test framework for Node.js and the browser | MIT License  |
| [<code>mocha-jsdom</code>](https://www.npmjs.com/package/mocha-jsdom) | 2.0.0 | Test frontend libraries in the console using Node.js, Mocha and JSDom. | MIT License  |
| [<code>mockgoose</code>](https://www.npmjs.com/package/mockgoose) | 8.0.4 | Provides test database by spinning up `mongod` on the back when `mongoose.connect` call is made | MIT License |
| [<code>nyc</code>](https://www.npmjs.com/package/nyc) | 15.1.0 | Istanbul's state of the art command line interface with support for applications that spawn subprocesses | ISC License |

This project also imports the following design-related toolkits:

| Toolkit | Version | Description | License |
| --- | --- | --- | --- |
| [Bootstrap](https://getbootstrap.com/) | 5.0.2 | Front-end toolkit featuring Sass variables and mixins, responsive grid system, prebuilt components, and JavaScript plugins | MIT License |
| [Font Awesome](https://fontawesome.com/) | 5.15 | Front-end toolkit featuring vector icons and social logos | CC BY 4.0 License (Icons) <br> SIL OFL 1.1 License (Fonts) <br> MIT License (Code)

## Built Using
This project follows the Model-View-Controller (MVC) architectural pattern. In light of separation of concerns, the key technologies used are:
- **Database**: <a href = "https://www.mongodb.com/">MongoDB</a> as the database program and <a href = "https://mongoosejs.com/">Mongoose</a> as the object data modeling tool
- **Back-end**: <a href = "https://nodejs.org/en/">Node.js</a> as the server environment and <a href = "https://expressjs.com/">Express.js</a> as the back-end framework
- **Front-end**: <a href = "https://handlebarsjs.com/">Handlebars</a> as the template engine

Server-side validation is performed via [Express Validator](https://www.npmjs.com/package/express-validator) and [Multer](https://www.npmjs.com/package/multer) (for files).

This web application is deployed on the cloud platform <a href = "https://dashboard.heroku.com/">Heroku</a>. Since Heroku has an ephemeral filesystem, <a href = "https://docs.mongodb.com/manual/core/gridfs/">GridFS</a> is used for the persistent storage of image and audio files.
   
## Contributing
Kindly refer to this [page](https://github.com/memgonzales/krafts-by-kat/blob/master/CONTRIBUTING.md) for the documents and the guidelines on contributing to this repository. These include the [Coding Standards](https://drive.google.com/file/d/1qY0xDRB7LBT7OQdyI0mgObhROHyMf7Hh/view?usp=sharing), [Repository Guidelines](https://drive.google.com/file/d/1A2j9fJXZhsOGueIhA-M15-NI1kC95bYn/view?usp=sharing), and [Integration Procedure](https://drive.google.com/file/d/1ZbcjjiV-8-rQRPRsG1Rd2LlAnfbLDjAD/view?usp=sharing).

## Software Development Team

- <b>Julianne Felice G. Cruz</b>, Quality Assurance
- <b>Sabrina Mykel C. Dela Cruz</b>, Product Owner <br/>
- <b>Mark Edward M. Gonzales</b>, Developer <br/>
- <b>Hylene Jules G. Lee</b>, Developer <br/>
- <b>Francesca Yzabel A. Mendoza</b>, Quality Assurance <br/>
- <b>Francheska A. Roque</b>, Scrum Master <br/>
- <b>Ralph Matthew H. Sanson</b>, Designer <br/>

[badge-html5]: https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white
[badge-bootstrap]: https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=flat&logo=bootstrap&logoColor=white
[badge-js]: https://img.shields.io/badge/javascript-%23323330.svg?style=flate&logo=javascript&logoColor=%23F7DF1E
[badge-jquery]: https://img.shields.io/badge/jquery-%230769AD.svg?style=flat&logo=jquery&logoColor=white
[badge-mongodb]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white
[badge-express]: https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB
[badge-nodejs]: https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white
[badge-mocha]: https://img.shields.io/badge/-mocha-%238D6748?style=flat&logo=mocha&logoColor=white
