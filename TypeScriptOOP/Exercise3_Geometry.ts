interface Shape {
    getArea(): number
    getPerimeter(): number
}

abstract class ColoredShape implements Shape {
    protected color: string

    constructor(color: string) {
        this.color = color
    }

    abstract getArea(): number;
    abstract getPerimeter(): number;

    getColor(): string {
        return this.color
    }

    getDescription(): string {
        return `Shape color: ${this.color}`
    }
}

class Circle extends ColoredShape {
    private radius: number

    constructor(color: string, radius: number) {
        super(color)
        this.radius = radius
    }

    getArea(): number {
        return Math.PI * (this.radius ** 2)
    }

    getPerimeter(): number {
        return 2 * Math.PI * this.radius
    }

    getDescription(): string {
        return `Circle, ${super.getDescription()}, Radius: ${this.radius}`
    }
}

class Rectangle extends ColoredShape {
    private width: number
    private height: number

    constructor(color: string, width: number, height: number) {
        super(color)
        this.width = width
        this.height = height
    }

    getArea(): number {
        return this.width * this.height
    }

    getDescription(): string {
        return `Rectangle, ${super.getDescription()}`
    }

    getPerimeter(): number {
        return 2 * (this.width + this.height)
    }
}

const shapes: Shape[] =
    [
        new Circle("Red", 5),
        new Rectangle("Blue", 4, 6)
    ]

let sumArea = 0

shapes.forEach((shape, index) => {
    console.log(`Shape ${index + 1}:`);
    sumArea += shape.getArea()
    if (shape instanceof ColoredShape) {
        console.log(`Description: ${shape.getDescription()}`)
    }
    console.log(`Area: ${shape.getArea()}`)
    console.log(`Perimeter: ${shape.getPerimeter()}`)
})
    


console.log(`==================== \nTotal Area: ${sumArea}`)