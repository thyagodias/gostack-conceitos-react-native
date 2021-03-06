import React, { useState, useEffect } from 'react'
import api from './services/api'
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

export default function App () {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleLikeRepository (id) {
    const response = await api.post(`/repositories/${id}/like`)

    let repositoriesUpdate = repositories.map(repository => {
      if (repository.id === id) {
        return response.data
      } else {
        return repository
      }
    })
    setRepositories(repositoriesUpdate)
  }

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#0b0a0d' />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({ item: repository }) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repository.title}</Text>

              <View style={styles.techsContainer}>
                {repository.techs.map((tech, index) => (
                  <Text key={index} style={styles.tech}>
                    {tech}
                  </Text>
                ))}
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes} curtidas
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        ></FlatList>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0a0d'
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: '#202024',
    borderRadius: 4,
    padding: 20
  },
  repository: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff'
  },
  techsContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  tech: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 10,
    backgroundColor: '#04d361',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,

    color: '#fff'
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  likeText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#fff'
  },
  button: {
    marginTop: 10
  },
  buttonText: {
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 4,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#fff',
    backgroundColor: '#7159C1',
    padding: 15
  }
})
