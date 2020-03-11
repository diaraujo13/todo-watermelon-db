import {appSchema, tableSchema } from '@nozbe/watermelondb';

const publicSchema = appSchema({
    //update it on a new modification
    version: 1,
    tables: [
        tableSchema({
            name: 'todos',
            // ColumnType = 'string' | 'number' | 'boolean'
            columns:[
                { name: 'todo', type: 'string'},
                { name: 'completed', type: 'boolean'},
                { name: 'created_at', type:'number'}
            ]
        })
    ]
});

export default publicSchema;