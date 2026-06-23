const person = {
    name: "Alice",
    age: 30,
    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

// person.greet();
// console.log(person.name);   
// console.log(person.age);

class Person {
    name: string;
    surname: string;    
    age: number;        
    
    constructor(name: string, surname: string, age: number) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }

    getFullName(){
        return `${this.name} ${this.surname}`;
    }
}   


const maria = new Person("Maria", "Smith", 25);

console.log(maria.getFullName()); 