import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Divider, FAB, List, Portal, Text } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { VisitaStackParams } from '../../navigation/VisitaNavigator';
import { VisitaContext } from '../../context/VisitaContext';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MyMessageBox } from '../../components';

interface Props extends StackScreenProps<VisitaStackParams, 'VisitaScreen'> {}

export const VisitaScreen = ({ navigation, route }: Props) => {
  const {
    id = '',
    nombre = '',
    direccion = '',
    tipo = '',
    observacion = '',
    latitude = 0,
    longitude = 0,
    fecha = '',
    estado = '',
  } = route.params;

  const { daleteVisita } = useContext(VisitaContext);
  const { top } = useSafeAreaInsets();
  const [state, setState] = useState({ open: false });
  const [message, setMessage] = useState<boolean>(false);

  const onStateChange = ({ open }: any) => setState({ open });
  const { open } = state;

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [id]);

  const onEliminar = async () => {
    await daleteVisita(id);
    setMessage(!message);
    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          zIndex: 999,
          alignItems: 'flex-start',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.pop()}
          activeOpacity={0.8}
          style={{
            ...styles.backButton,
            top: top + 5,
          }}
        >
          <Icon name="arrow-back-outline" color="black" size={25} />
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: isNaN(latitude) ? 37.78825 : latitude,
          longitude: isNaN(longitude) ? -122.4324 : longitude,
          latitudeDelta: 1 / 600,
          longitudeDelta: 2 / 600,
        }}
      >
        <Marker
          coordinate={{
            latitude: isNaN(latitude) ? 37.78825 : latitude,
            longitude: isNaN(longitude) ? -122.4324 : longitude,
          }}
        />
      </MapView>
      <View style={{ marginHorizontal: 2 }}>
        <Text style={{ textAlign: 'center' }} variant="headlineSmall">
          {nombre}
        </Text>
        <List.Item
          title="Dirección"
          descriptionStyle={{ color: '#61688B' }}
          description={direccion}
        />
        <Divider bold />
        <List.Item
          title="Tipo Visita"
          descriptionStyle={{ color: '#61688B' }}
          description={tipo}
        />
        <Divider bold />
        <List.Item
          title="Observación"
          descriptionStyle={{ color: '#61688B' }}
          description={observacion}
        />
        <Divider bold />
        <List.Item
          title="Fecha"
          descriptionStyle={{ color: '#61688B' }}
          description={fecha.toString()}
        />
        <Divider bold />
        <List.Item
          title="Estado"
          descriptionStyle={{ color: '#61688B' }}
          description={estado}
        />
      </View>
      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? 'minus' : 'plus'}
          actions={[
            {
              icon: 'delete',
              label: 'Eliminar',
              onPress: () => setMessage(!message),
            },
            {
              icon: 'pencil',
              label: 'Editar',
              onPress: () => navigation.navigate('UpdateInsertVisita', { id }),
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
      <MyMessageBox
        visible={message}
        icon="alert"
        title="Esta seguro de Eliminar el registro?"
        onSubmit={onEliminar}
        onClose={(): void => setMessage(!message)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  map: {
    width: Dimensions.get('window').width,
    height: '35%',
    alignSelf: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 8,
  },
});
