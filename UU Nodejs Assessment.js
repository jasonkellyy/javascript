var readlineSync = require('readline-sync');
var fs = require('fs');
var line_arr;

courseName = "Business Technology";
maxStudents = 20;
studentArray = [];
let numOfStudents = 0;

var studentData = fs.readFileSync('data.txt', 'utf-8');
var studentDataLines = studentData.split('\n');

var studentArray = studentDataLines.map(record => {
    var columns = record.split(',');
    return {
        name: columns[0],
        dob: columns[1],
        gender: columns[2],
        studyMode: columns[3],
        currentYear: columns[4],
        numOfModules: columns[5],
        tuitionFee: 0
    };
})

studentDataLines.forEach(line => {
    const [name, dob, gender, studyMode, currentYear, numOfModules] = line.split(',');
    const tuitionFee = calculateTuitionFee(studyMode, numOfModules, currentYear);
    const newStudent = new student(name, dob, gender, studyMode, currentYear, numOfModules, tuitionFee);
    studentArray.push(newStudent);
  });
  
console.log(studentArray);



function student(name, dob, gender, studyMode, currentYear, numOfModules, tuitionFee) {
    this.name = name;
    this.dob = dob;
    this.gender = gender;
    this.studyMode = studyMode;
    this.currentYear = currentYear;
    this.numOfModules = numOfModules;
    this.tuitionFee = tuitionFee;
}

//work out the tuition fee for a student

function calculateTuitionFee(studyMode, numOfModules, currentYear) {
    if ((studyMode == 'PT') || (studyMode == 'pt')) {
        tuitionFee = numOfModules * 750;
    }
    else if (((studyMode == 'FT') || (studyMode == 'ft')) && (currentYear == 1) || (currentYear == 2) || (currentYear == 4)) {
            tuitionFee = 5000;
        }
        else {
            tuitionFee = 2500;
        }
        return tuitionFee;
    }


// add a new student to the array
function addStudent() {
    var name = readlineSync.question("Enter the student's name: ");

    // validate the format of dob entered
    function validDOB(dateString) {
        const checkDOB =  /^\d{2}\/\d{2}\/\d{4}$/;
        return checkDOB.test(dateString);
    }

    var dob;
    while (true) {
        dob = readlineSync.question("Enter " + name +"'s date of birth (dd/mm/yyyy): ");
        if (validDOB(dob)) {
            break;
        }
        console.log("Please enter a valid date of birth, in the correct format.");
    }

    var gender;
    while (true) {
        gender = readlineSync.question("Enter the student's gender (M/F): ");
        if (gender == 'M' || gender =='m' || gender == 'F' || gender == 'f') {
            break;
        }
        console.log("Please enter a valid gender (M/F): ");
    }

    var studyMode;
    while (true) {
        var studyMode = readlineSync.question("Enter the student's study format (PT/FT): ");
        if (studyMode == 'PT' || studyMode == 'pt' || studyMode =='FT' || studyMode == 'ft') {
            break;
        }
        console.log("Please enter a valid mode of study (PT/FT): ");
    }

    var currentYear;
    while (true) {
        currentYear = readlineSync.question("Enter their current year of study (1-4): ");
        if (currentYear >= 1 && currentYear <= 4) {
            break;
        }
        console.log("Please enter a valid year of study (between 1 and 4): ")
    }

    var numOfModules;
    while (true) {
        numOfModules = readlineSync.question("How many modules does " + name + " have to study? (1-6): ");
        if (numOfModules >=1 && numOfModules <= 6) {
            break;
        }
        console.log("Please enter a valid number of modules (1-6): ")
    }

    var tuitionFee = calculateTuitionFee(studyMode, numOfModules, currentYear);

    var newStudent = new student(name, dob, gender, studyMode, currentYear, numOfModules, tuitionFee);
    studentArray.push(newStudent);

    console.log(studentArray);
    var studentArrayString = studentArray.map(function(student) {
      return JSON.stringify(student);
    }).join('\r\n');
    fs.writeFile('data.txt', studentArrayString, function (err) {
      if (err) console.log(err);
      else console.log("file updated");
    });
}

function Menu() {
    var flag = true;

    while (flag) {
        console.log("Welcome to the student details database for " +courseName);
        console.log("Enter 1 to add a student");
        console.log("Enter 2 to delete a student");
        console.log("Enter 3 to view a report on the students in the course");
        console.log("Enter 4 to close the program");

        var userChoice = readlineSync.question("Enter your choice: ");

        if (userChoice == '1' && numOfStudents >= 20) {
            console.log("Sorry, the course is currently at max capacity and no more students can be added");
        }

        else {

        switch(userChoice) {
            case '1':
                addStudent();
                break;
            case '2':
                deleteStudent();
                break;
            case '3':
                (viewReport);
                break;
            case '4':
            flag = false;
            break;
            default:
            console.log("Please enter a valid menu choice.");
            break;
        }
        }
    }
}

Menu();
