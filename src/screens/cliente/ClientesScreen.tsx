import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { Avatar, Divider, IconButton, List, useTheme } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { ClienteStackParamList } from '../../navigation/Root';
interface Props extends StackScreenProps<ClienteStackParamList, 'ClientesScreen'> {}

export const ClientesScreen = ({ navigation }: Props) => {
  const theme = useTheme();

  useEffect(() => {
    navigation.setOptions({
      title: 'CLIENTE',
      headerRight: () => (
        <IconButton
          icon="plus-circle"
          style={{ marginRight: 10 }}
          size={30}
          onPress={() => navigation.navigate('ClienteModal')}
        />
      ),
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]}
        //keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <List.Item
            title="First Item"
            description="Item description"
            onPress={() => navigation.navigate('ClienteScreen')}
            left={props => <Avatar.Text {...props} size={40} label="X" />}
          />
        )}
        ItemSeparatorComponent={() => <Divider style={{ backgroundColor: theme.colors.primary }} />}
      />
    </SafeAreaView>
  );
};
