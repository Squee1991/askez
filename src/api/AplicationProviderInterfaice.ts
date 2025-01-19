import type {Habit} from "../model/Habit";

export interface AplicationProviderInterfaice {
    addHabit(args: AddHabitParams): Promise<Habit>;
}

export type AddHabitParams = {
    habitNames: string,
    habitDescription: string,
    habitStartDate: number,
    habitEndDate: number,
}