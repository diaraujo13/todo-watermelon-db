import { Model } from "@nozbe/watermelondb";
import {field, date, text} from '@nozbe/watermelondb/decorators';

export default class Todo extends Model {
    static table = 'todos';

    @text('todo') todo;
    @field('completed') completed;
    @date('created_at') created_at;
}