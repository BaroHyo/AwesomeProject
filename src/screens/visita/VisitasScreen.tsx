import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, FlatList, RefreshControl } from 'react-native';
import { Divider, IconButton, List, Paragraph, useTheme } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { format } from 'date-fns';

//componetes
import { VisitaContext } from '../../context/VisitaContext';
import { VisitaStackParamList } from '../../navigation/Root';

interface Props extends StackScreenProps<VisitaStackParamList, 'VisitasScreen'> {}

export const VisitasScreen = ({ navigation }: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { visita, loadVisita } = useContext(VisitaContext);

  const theme = useTheme();

  useEffect(() => {
    navigation.setOptions({
      title: 'VISITA',
      headerRight: () => (
        <IconButton
          icon="plus-circle"
          style={{ marginRight: 10 }}
          iconColor={theme.colors.primary}
          size={30}
          onPress={() => navigation.navigate('UpdateSave', {})}
        />
      ),
    });
  }, []);

  const loadVisitaFromBackend = async () => {
    setIsRefreshing(true);
    await loadVisita();
    setIsRefreshing(false);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <FlatList
        data={visita}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.nombre}
            description={item.direccion}
            right={() => <Paragraph>{format(item.fecha, 'MM/dd/yyyy')}</Paragraph>}
            onPress={() =>
              navigation.navigate('VisitaScreen', {
                id: item.id,
                nombre: item.nombre,
                direccion: item.direccion,
                tipo: item.tipo,
                observacion: item.observacion,
                latitude: item.latitude,
                longitude: item.longitude,
                fecha: format(item.fecha, 'MM/dd/yyyy'),
                estado: item.estado,
              })
            }
          />
        )}
        ItemSeparatorComponent={() => <Divider style={{ backgroundColor: theme.colors.primary }} bold />}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={loadVisitaFromBackend} />}
      />
    </SafeAreaView>
  );
};
