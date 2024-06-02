export default async (validation_schema, data) => {
    try {
        await validation_schema.validate(data, {
            strict: true,
            abortEarly: true
        });
    } catch (err) {
        throw new Error(err);
    }
}