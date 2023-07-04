import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Chip, HelperText, List, Paragraph, Text } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ClienteStackParamList } from '../../navigation/Root';
import { FormValues } from '../../interfaces/cliente';
import { validateCliente } from '../../schema/formSchema';
import { MyTextInput, MyChip, ChipData } from '../../components';
import { useLocation } from '../../hooks/useLocation';
import { LoadingScreen } from '../LoadingScreen';
import { url } from '../../hooks/useGeolocation';
import { ResponseAddress } from '../../interfaces/app';

const chips: ChipData[] = [
  { id: 'lune', label: 'Lunes' },
  { id: 'martes', label: 'Martes' },
  { id: 'miercoles', label: 'Miercoles' },
  { id: 'jueves', label: 'Jueves' },
  { id: 'viernes', label: 'Viernes' },
  { id: 'sabado', label: 'Sabado' },
  { id: 'domingo', label: 'Domingo' },
];

interface Props extends StackScreenProps<ClienteStackParamList, 'ClienteModal'> {}

export const ClienteModal = ({ navigation, route }: Props) => {
  const { hasLocation, initialPosition } = useLocation();

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver<FormValues>(validateCliente),
  });

  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const saveOrUpdate = (date: any) => console.log(date);

  const handleChipPress = (chipId: string) => {
    if (selectedChips.includes(chipId)) {
      setSelectedChips(selectedChips.filter(selectedChip => selectedChip !== chipId));
    } else {
      setSelectedChips([...selectedChips, chipId]);
    }
  };

  const onGeolocation = async () => {
    try {
      const response = await fetch(
        `${url}&lat=${initialPosition?.latitude}&lon=${initialPosition?.longitude}&format=json`
      );
      const data: ResponseAddress = await response.json();
      setValue('zona', `${data?.address.county}, ${data?.address.state}`);
      setValue('direccion', `${data?.address.road}, ${data?.address.neighbourhood}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    onGeolocation();
  }, [initialPosition]);

  useEffect(() => {
    navigation.setOptions({
      title: 'Nuevo',
    });
  }, []);

  if (!hasLocation) {
    return <LoadingScreen />;
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ marginHorizontal: 18 }}>
        <Paragraph>Datos General</Paragraph>
        <View style={{ marginBottom: 10 }}>
          <MyTextInput
            mode="outlined"
            label="Nombre"
            control={control}
            name="nombre"
            autoCapitalize="words"
            rules={{
              required: true,
            }}
          />
          {errors.nombre && <HelperText type="error">{errors.nombre.message}</HelperText>}
        </View>
        <View style={{ marginBottom: 10 }}>
          <MyTextInput
            mode="outlined"
            label="Codigo"
            control={control}
            name="codigo"
            autoCapitalize="characters"
            rules={{
              required: true,
            }}
          />
          {errors.codigo && <HelperText type="error">{errors.codigo.message}</HelperText>}
        </View>
        <View style={{ marginBottom: 10 }}>
          <MyTextInput
            mode="outlined"
            label="Tipo Negocio"
            control={control}
            name="tipoNegocio"
            autoCapitalize="words"
            rules={{
              required: true,
            }}
          />
          {errors.tipoNegocio && (
            <HelperText type="error">{errors.tipoNegocio.message}</HelperText>
          )}
        </View>
        <Paragraph>Datos Contactos</Paragraph>
        <View style={{ marginBottom: 10 }}>
          <MyTextInput
            mode="outlined"
            label="Celular"
            control={control}
            name="celular"
            keyboardType="number-pad"
            rules={{
              required: true,
            }}
          />
          {errors.celular && (
            <HelperText type="error">{errors.celular.message}</HelperText>
          )}
        </View>
        <View style={{ marginBottom: 10 }}>
          <MyTextInput
            mode="outlined"
            label="Telefono"
            control={control}
            name="telefono"
            keyboardType="number-pad"
            rules={{
              required: true,
            }}
          />
          {errors.telefono && (
            <HelperText type="error">{errors.telefono.message}</HelperText>
          )}
        </View>
        <Paragraph>Datos Facturacion</Paragraph>
        <View style={{ marginBottom: 10 }}>
          <MyTextInput
            mode="outlined"
            label="Razon Social"
            control={control}
            name="razonSocial"
            autoCapitalize="words"
            rules={{
              required: true,
            }}
          />
          {errors.razonSocial && (
            <HelperText type="error">{errors.razonSocial.message}</HelperText>
          )}
        </View>
        <View style={{ marginBottom: 10 }}>
          <MyTextInput
            mode="outlined"
            label="NIT/CI."
            control={control}
            name="nit"
            keyboardType="number-pad"
            rules={{
              required: true,
            }}
          />
          {errors.nit && <HelperText type="error">{errors.nit.message}</HelperText>}
        </View>
        <Paragraph>Datos Distribucion</Paragraph>
        <MyChip
          label="Ruta"
          chips={chips}
          selectedChips={selectedChips}
          onChipPress={handleChipPress}
        />
        <View style={{ marginBottom: 10 }}>
          <MyTextInput
            mode="outlined"
            label="Zona"
            control={control}
            name="zona"
            autoCapitalize="words"
            rules={{
              required: true,
            }}
          />
          {errors.zona && <HelperText type="error">{errors.zona.message}</HelperText>}
        </View>
        <View style={{ marginBottom: 10 }}>
          <MyTextInput
            mode="outlined"
            label="Direccion"
            control={control}
            name="direccion"
            multiline
            numberOfLines={4}
            autoCapitalize="words"
            rules={{
              required: true,
            }}
          />
          {errors.direccion && (
            <HelperText type="error">{errors.direccion.message}</HelperText>
          )}
        </View>
        <Button
          mode="contained"
          style={{ margin: 5 }}
          onPress={handleSubmit(saveOrUpdate)}
        >
          Guardar
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerScroll: {
    flex: 1,
    padding: 16,
  },
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
    height: '30%',
    alignSelf: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 8,
  },
});
