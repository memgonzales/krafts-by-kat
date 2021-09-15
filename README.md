# Krafts by Kat

## Project Structure

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

## Testing
The software development team used <a href = "https://code.visualstudio.com/">Visual Studio Code</a> as its integrated development environment. It was also employed by the developers for the purposes of checking syntax errors, refactoring code, and stepping it through a debugger prior to checking in the code. 

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
   
## Built Using

## Dependencies

## Software Development Team

- <b>Julianne Felice G. Cruz</b>, Quality Assurance
- <b>Sabrina Mykel C. Dela Cruz</b>, Product Owner <br/>
- <b>Mark Edward M. Gonzales</b>, Developer <br/>
- <b>Hylene Jules G. Lee</b>, Developer <br/>
- <b>Francesca Yzabel A. Mendoza</b>, Quality Assurance <br/>
- <b>Francheska A. Roque</b>, Scrum Master <br/>
- <b>Ralph Matthew H. Sanson</b>, Designer
