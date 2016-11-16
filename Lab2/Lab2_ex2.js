// Daniel Ermer
// CS336 9/14/16
// Lab2_ex2.js: Creation of a person object

function Person(name, birthday, friends){
   this.Name = name;
   this.Birthday = birthday;
   this.Friends = friends;
}

function Student(name, birthday, friends, major){
   Person.call(this, name, birthday, friends);
   this.Major = major;
}
Person.prototype = Object.create(Student.prototype);

Person.prototype.getName = function(){
 return this.Name;
}

Person.prototype.getBirthday = function(){
  return this.Birthday;
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

Person.prototype.changeName = function(newName){
  this.Name = newName;
}

function greetMe(person){
   console.log(person.Name + " is a person");
}

function greetMeStudent(student){
   console.log(student.Name + " is a student");
}

Person.prototype.addFriend = function(newFriend){
  this.Friends.push(newFriend);
}

//Creating People
var person1 = new Person("Dan", "1995/06/08", ["Bob", "Joel"]);
var person2 = new Person("Mark", "1996/05/02", []);
var student1 = new Student("Kyle", "1994/06/09", [], "Computer Science");

//Test adding friends
person1.addFriend("Ethan");
person1.addFriend("Russel");
console.log("Friends are added");

//Testing Greeting
greetMe(person1);
greetMe(person2);
greetMeStudent(student1);

//Testing subject of study
console.log("This student studies: " + student1.Major);

//Finding ages
console.log('age: ' + getAge(person1.Birthday));
console.log('age: ' + getAge(person2.Birthday));

//Comparing ages
if (getAge(person1.Birthday) != getAge(person2.Birthday)){
   console.log("The ages are different!");
}

//Testing Inheritance
if (student1 !instanceof Person){
   console.log("A student is an instance of a person");
}

