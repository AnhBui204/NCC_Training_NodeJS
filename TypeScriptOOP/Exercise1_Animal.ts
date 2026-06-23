abstract class Animal {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    getInfo(): void {
        console.log(`Animal: ${this.name}, age: ${this.age}`);
    }

    abstract makeSound(): void;
}

class Dog extends Animal {
    constructor(name: string, age: number) {
        super(name, age)
    }
    makeSound(): void {
        console.log("Woof Woof")
    }
}

class Cat extends Animal {
    constructor(name: string, age: number) {
        super(name, age)
    }
    makeSound(): void {
        console.log("Meow Meow")
    }
}

class Bird extends Animal {
    canFly: boolean;
    constructor(name: string, age: number, canFly: boolean) {
        super(name, age);
        this.canFly = canFly
    }
    makeSound(): void {
        console.log("Tweet Tweet")
    }
}

const animals: Animal[] =
    [
        new Dog("Max", 3),
        new Cat("Luna", 2),
        new Bird("Tweety", 1, true)
    ]
for (let animal of animals) {
    animal.getInfo()
    animal.makeSound()
}


