import { RoleModel, RoleDocument } from "../models";

export const createRoles = async (): Promise<void> => {
    try {
        const count: number = await RoleModel.estimatedDocumentCount();

        if (count > 0) return;

        const values: RoleDocument[] = await Promise.all([
            new RoleModel({ name: "client" }).save(),
            new RoleModel({ name: "admin" }).save()
        ]);

        console.log(values);
    } catch (error) {
        console.error(error);
    }
}