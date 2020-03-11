import React, { useState, useEffect } from 'react';
import { Body, Button, Container, Content, Header, Text, Textarea, Title } from 'native-base';
import { View, StatusBar, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import {db} from './db';
import TodoList from './components/todolist';

const App: () => React$Node = () => {

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const todoCollection = db.collections.get("todos");

  const save = () => {
    if (!text)
      alert("Preencha o campo antes de salvá-lo");
    
    (
      async () => {
        await db.action(
          async () => {
            const newTodo = await todoCollection.create( todo => {
              todo.todo = text;
              todo.completed = false;
              todo.create_at = new Date().getTime();
            });

            setText("");

          }
        )
      }
    )(); //FFO  
  }

  // useEffect( ()=> {
  //   (
  //     async () => {
  //       let allTodo = await todoCollection.query().observe();
  //       setData(allTodo);
  //       console.log(allTodo);
  //       setLoading(false);
  //     }
  //   )();
  // }, []);

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
