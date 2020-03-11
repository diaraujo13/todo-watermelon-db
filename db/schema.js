import {appSchema, tableSchema } from '@nozbe/watermelondb';

const publicSchema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'todos',
            columns:[
                { name: 'todo', type: 'string'},
                { name: 'completed', type: 'boolean'},
                { name: 'created_at', type:'number'}
            ]
        })
    ]
});

export default publicSchema;