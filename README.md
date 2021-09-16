# Krafts by Kat
![badge][badge-html5]
![badge][badge-bootstrap]
![badge][badge-js]
![badge][badge-jquery]
![badge][badge-mongodb]
![badge][badge-express]
![badge][badge-nodejs]
![badge][badge-mocha]

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

The **entity relationship diagram** to illustrate the schemas can be viewed [here]().

## Running the Application

### Running on the Web

### Running Locally

### Credentials (For Testing Only)
To log in as an administrator, enter the following credentials:
- Username: `kraftsbykatadmin`
- Email Address: `krafts.by.kat.webmaster@gmail.com`
- Password: `ASDFGHJKL123;`

To log in as a customer, enter the following credentials:
- Username: `shibaichi` (or `akitani`)
- Email Address: `kentaroshiba@gmail.com` (or `wolfdog@gmail.com`)
- Password: `ASDFGHJKL123;` (same password for both test accounts)

## Testing the Application
The software development team used <a href = "https://code.visualstudio.com/">Visual Studio Code</a> as its integrated development environment. It was also employed by the developers for the purposes of checking syntax errors, refactoring code, and stepping it through a debugger prior to checking in to the repository. 

### Automated Testing
Aside from manual integration testing, automated unit tests were also performed in light of the test-driven development methodology. The steps for running the automated unit tests are as follows:

1. Ensure that the necessary development dependencies (enumerated in the **Dependencies** section) have been installed. Otherwise, run the following command to install them:
   ```
   npm install --dev
   ```

2. Before running the automated tests, terminate the server, alongside any running instance of the app.

4. Run the following command in the terminal to begin the automated testing:

   ```
   npm run test
   ```
   
## Contributing to the Repository
Before submitting a pull request, kindly refer to the following documents and comply with the guidelines stated therein:
- [Coding Standard](https://drive.google.com/file/d/1qY0xDRB7LBT7OQdyI0mgObhROHyMf7Hh/view?usp=sharing) - Discusses the coding conventions and practices of the team, as well as the allowed language features
- [Repository Guidelines](https://drive.google.com/file/d/1A2j9fJXZhsOGueIhA-M15-NI1kC95bYn/view?usp=sharing) - Contains an overview of the repository, including rules and actions related to code security
- [Integration Procedure](https://drive.google.com/file/d/1ZbcjjiV-8-rQRPRsG1Rd2LlAnfbLDjAD/view?usp=sharing) - Covers the usage of multiple branches and the procedure for the submission of pull requests

The minimum criteria for a pull request to be accepted and merged are as follows:
- The code changes should be inspected by a developer.
- It should not result in merge conflicts (per the test run by Github).
- It should not involve the disclosure of sensitive information (per the test run by <a href = "https://www.gitguardian.com/">GitGuardian</a>). 
- It should pass all the automated unit tests set in place by the developers.

***In the event of a pull request failing the third criterion, the steps to be taken are outlined in Part 4 of the [Repository Guidelines</a>](https://drive.google.com/file/d/1A2j9fJXZhsOGueIhA-M15-NI1kC95bYn/view?usp=sharing).***

## Dependencies
This project uses the following production dependencies, which can be installed via the <code>npm install</code> command:

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
| [<code>mongodb</code>](https://www.npmjs.com/package/mongodb) | 3.6.6 | Official MongoDB driver for Node.js | Apache License 2.0 |
| [<code>mongoose</code>](https://www.npmjs.com/package/mongoose) | 5.6.13 | MongoDB object modeling tool designed to work in an asynchronous environment | MIT License |
| [<code>multer</code>](https://www.npmjs.com/package/multer) | 1.4.2 | Middleware for handling <code>multipart/form-data</code>, primarily used for file uploads | MIT License |
| [<code>multer-gridfs-storage</code>](https://www.npmjs.com/package/multer-gridfs-storage) | 4.2.0 | GridFS storage engine for Multer to store uploaded files directly to MongoDB | MIT License |
| [<code>no-cache</code>](https://www.npmjs.com/package/nocache) | 3.0.1 | Middleware for setting some HTTP response headers to try to disable client-side caching | MIT License
| [<code>nodemailer</code>](https://www.npmjs.com/package/nodemailer) | 6.6.0 | Package for sending emails with Node.js | MIT License | 

## Built Using

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
