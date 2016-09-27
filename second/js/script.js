function human() {
  this.name = 'John';
  this.age = 32;
  this.sex = 'man';
  this.height = 180;
  this.weight = 75;
};

function worker() {
  this.workPlace = 'plant';
  this.salary = 4000;
  this.work = function () {
    console.log('I`m working');
  }
};

function student() {
  this.studyPlace = 'collage';
  this.stipend = 1600;
  this.watchFilm = function () {
    console.log('I`m watching film');
  }
};

worker.prototype = new human();
student.prototype = new human();


var workerFirst = new worker();
var studentFirst = new student();
console.log('workerFirst = ', workerFirst);
console.log('studentFirst = ', studentFirst);
console.log('workerFirst.age = ', workerFirst.age);


var workerSecond = new worker();
var studentSecond = new student();
console.log('workerSecond = ', workerSecond);
console.log('studentSecond = ', studentSecond);
console.log('studentSecond.name = ', studentSecond.name);
