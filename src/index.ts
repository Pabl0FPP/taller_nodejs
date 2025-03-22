import { db, app } from "./app";

const port: number = process.env.PORT as any || 3000;

db.then( () =>
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    } )
);