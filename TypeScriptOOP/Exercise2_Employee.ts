interface Employee {
    calculateSalary(): number
    getDetails(): string
}

class Manager implements Employee {
    private name: string
    private salary: number
    private bonus: number

    constructor(name: string, salary: number, bonus: number) {
        this.name = name
        this.salary = salary
        this.bonus = bonus
    }

    getName(): string {
        return this.name
    }

    getSalary(): number {
        return this.salary
    }

    setSalary(amount: number): void {
        if (amount > 0) {
            this.salary = amount
        }
    }

    getBonus(): number {
        return this.bonus
    }

    setBonus(amount: number): void {
        if (amount > 0) {
            this.bonus = amount
        }
    }

    calculateSalary(): number {
        return this.salary + this.bonus
    }

    getDetails(): string {
        return `Manager: ${this.name}, Salary: ${this.calculateSalary()}`
    }
}

class Developer implements Employee {
    private name: string
    private hourlyRate: number
    private hoursWorked: number

    constructor(name: string, hourlyRate: number, hoursWorked: number) {
        this.name = name
        this.hourlyRate = hourlyRate
        this.hoursWorked = hoursWorked
    }

    getName(): string {
        return this.name
    }

    getHourlyRate(): number {
        return this.hourlyRate
    }

    calculateSalary(): number {
        return this.hourlyRate * this.hoursWorked
    }

    getDetails(): string {
        return `Developer: ${this.name}, Salary: ${this.calculateSalary()}`
    }
}

const employees: Employee[] =
    [
        new Manager("John", 3000, 500),
        new Developer("Alice", 50, 160)
    ]
let totalSalary = 0
for(let employee of employees){
    console.log(employee.getDetails())
    totalSalary += employee.calculateSalary()
}
console.log(`Total Salary: ${totalSalary}`)