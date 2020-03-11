import React from 'react';
import {FlatList,View,Text} from 'react-native';
import withObservables from '@nozbe/with-observables';

// Componente que representa cada item 
const Todo = ({todo}) => {
return (
    <View style={{backgroundColor:'#f8f8f8', padding: 14, margin: 5}}>
        <Text style={{fontSize: 26, fontWeight:'bold'}}>{todo.todo}</Text>
        <Text style={{fontSize: 18, color: '#444'}}>{new Date(todo.created_at).toLocaleDateString()}</Text>
    </View>
)}

const EnhancedTodo = withObservables(['todo'], ({ todo }) => ({
    todo: todo.observe()
}))(Todo);

function TodoList({todos}){
    console.log("TodoList()", todos);
    return(
    <FlatList 
        data={todos}
        style={{flex: 1}}
        renderItem={ ({item}) => <EnhancedTodo todo={item} /> }
        style={{ padding: 20 }}
        ListHeaderComponent={ () => <Text style={{fontWeight:'bold', color: '#242424'}}>TODOS</Text>}
    />
    )
}

const EnhancedTodoList = withObservables([], ({database}) => ({
    todos: database.query()
}))(TodoList);

export default EnhancedTodoList;