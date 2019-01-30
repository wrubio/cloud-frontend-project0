export class Event {

    constructor (
        public name: string,
        public description: string,
        public startDate: string,
        public endDate: string,
        public _id?: string
    ) {}
}
