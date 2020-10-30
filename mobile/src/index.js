import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import api from "./services/api";

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then((response) => {
      console.log(response.data);
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject(){
    const response = await api.post('projects', {
      title : `X-Project ${Date.now()}`,
      owner: 'mr. Wolf'
    })

    const addedProject = response.data;
    setProjects([...projects, addedProject])
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#7159c1"
        translucent
      />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id }
          renderItem={({ item })=>(
            <Text style={styles.title}>{item.title}</Text>
          )}
          />
        <TouchableOpacity
          onPress={handleAddProject}
          activeOpacity={.8}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Adicionar projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7159c1",
    flex: 1,
  },
  title: {
    color: "yellow",
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  button:{
    backgroundColor: "#fff",
    margin: 20,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText:{
    fontWeight: "bold",
    fontSize: 16,
  },
});
