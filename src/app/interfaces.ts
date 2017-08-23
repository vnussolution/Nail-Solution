export interface IEmployee {
    id: string,
    firstName: string,
    lastName: string,
    level: string,
    age: string
}

export interface IRecord {
    id: string,
    date: string,
    employeeId: string,
    amount: string,
    tip?: string,
    discount?: string

}