//Height
export interface Height{
    feet: number,
    inches: number,
}

export interface DishProps{
    name: string
    instruction: string
    ingredient: string
    calories: number
    image_url: string
}

export interface HealthProps{
    height: Height,
    weight: number,
    age: number
}