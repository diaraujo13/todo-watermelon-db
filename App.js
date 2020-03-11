import React, { useState, useEffect } from 'react';
import { Body, Button, Container, Content, Header, Text, Textarea, Title } from 'native-base';
import { View, StatusBar, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import {db} from './db';
import TodoList from './components/todolist';

const App: () => React$Node = () => {

  // Store Textarea content. This represents todo description.
  // Saved to 'todo' column on 'todo' table 
  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);

  // Entry point to manipulate 'todos' table
  // Either to save or to read, it begin through this constant
  const todoCollection = db.collections.get("todos");

  // called on submit a new 'todo'
  const save = async () => {
    if (!text)
      alert("Preencha o campo antes de salvá-lo");
    
    // an action is a function that can modify the database
    await db.action(
      async () => {

        const newTodo = await todoCollection
        .create( todo => {
          todo.todo = text;
          todo.completed = false;
          todo.create_at = new Date().getTime();
        });

        //clear textarea content
        setText("");

    });


  }

  if (loading)
    return (<View style={{flex: 1,alignItems:'center', justifyContent:'center'}}>
      <ActivityIndicator />
      </View>)
  else
    return (
    <>
      <StatusBar barStyle="light-content" />
        <Container>
          <Header>
            <Body>
              <Title>TODO WD</Title>
            </Body>
          </Header>
          <Content>
            <Text>Utilização do Watermelon DB para salvar dados</Text>
            <View style={{margin: 20}}>
            <Textarea value={text} placeholder="insert your TO DO here" bordered onChangeText={ text => setText(text) }></Textarea>
            
            <Button onPress={() => save()} style={{marginTop: 10}} primary><Text>ADICIONAR</Text></Button>
            </View>

            <TodoList database={todoCollection}/>
          </Content>

        </Container>
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
