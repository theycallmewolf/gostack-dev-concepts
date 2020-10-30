import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar } from "react-native";
import api from "./services/api";

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then((response) => {
      console.log(response.data);
      setProjects(response.data);
    });
  }, []);

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
});
