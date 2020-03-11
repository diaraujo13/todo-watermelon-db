import React, { useState } from 'react';
import { Body, Button, Container, Content, Header, Text, Textarea, Title } from 'native-base';
import { View, StatusBar, StyleSheet, FlatList } from 'react-native';
import {db} from './db';

const App: () => React$Node = () => {

  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  const save = () => {
    const todoCollection = db.collections.get("todos");

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

            alert("TODO adicionado com sucesso");
          }
        )
      }
    )(); //FFO  
  }

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
            <Textarea placeholder="insert your TO DO here" bordered onChangeText={ text => setText(text) }></Textarea>
            
            <Button onPress={() => save()} style={{marginTop: 10}} primary><Text>ADICIONAR</Text></Button>
            </View>

            <FlatList 
              style={{ padding: 20 }}
              ListHeaderComponent={ ()=> <Text style={{fontWeight:'bold', color: '#242424'}}>TODOS</Text>}
            />
          </Content>

        </Container>
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
