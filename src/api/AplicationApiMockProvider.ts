import type {AddHabitParams, AplicationProviderInterfaice} from "api/AplicationProviderInterfaice";
import type {Habit} from "../model/Habit";

export class AplicationApiMockProvider implements AplicationProviderInterfaice {
    async addHabit(args: AddHabitParams): Promise<Habit> {
        return {
            ...args,
            habitId: 'test habit id'
        }
    }
}

