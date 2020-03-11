import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import Todo from "./todo.model";
import publicSchema from './schema';

const adapter = new SQLiteAdapter({
    schema: publicSchema
});

export const db = new Database({
    adapter,
    modelClasses: [Todo],
    actionsEnabled: true,

});