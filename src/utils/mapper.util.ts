export class Mapper {
    public static UpdateToDomain<T>(update: T): Partial<T> {
        Object.keys(update).forEach(key => update[key] === undefined && delete update[key]);

        return update;
    }
}