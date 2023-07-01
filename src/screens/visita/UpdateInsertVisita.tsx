import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import { Button, HelperText, RadioButton, TextInput } from 'react-native-paper';
import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
// Compoente
import { useLocation } from '../../hooks/useLocation';
import { LoadingScreen } from '../LoadingScreen';
import { useForm, Controller } from 'react-hook-form';
import { VisitaContext } from '../../context/VisitaContext';
import { FormValues } from '../../interfaces/visita';
import { validateVisita } from '../../schema/formSchema';
import { VisitaStackParams } from '../../navigation/VisitaNavigator';

interface Props extends StackScreenProps<VisitaStackParams, 'UpdateInsertVisita'> {}

export const UpdateInsertVisita = ({ navigation, route }: Props) => {
  const { id = '' } = route.params;
  const [tipo, setTipo] = useState('tiempo_no_visita');
  const { insertVisita, updateVisita, loadById } = useContext(VisitaContext);
  const { hasLocation, initialPosition } = useLocation();
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      nombre: '',
      direccion: '',
      tipo: '',
      observacion: '',
      latitude: 0,
      longitude: 0,
    },
    resolver: yupResolver<FormValues>(validateVisita),
  });

  useEffect(() => {
    navigation.setOptions({
      title: id ? 'Actualizar' : 'Nuevo',
    });
  }, [id]);

  useEffect(() => {
    loadVista();
  }, []);

  const loadVista = async () => {
    if (id.length === 0) return;
    const { nombre, direccion, tipo, observacion, latitude, longitude } = await loadById(id);
    setValue('nombre', nombre);
    setValue('direccion', direccion);
    setValue('observacion', observacion);
    setValue('latitude', latitude);
    setValue('longitude', longitude);
    setTipo(tipo);
  };

  const saveOrUpdate = async (data: any) => {
    if (id.length > 0) {
      await updateVisita({ ...data, tipo: tipo }, id);
    } else {
      await insertVisita({
        ...data,
        tipo: tipo,
        latitude: initialPosition.latitude,
        longitude: initialPosition.longitude,
      });
      navigation.goBack();
    }
  };

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ marginHorizontal: 20 }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  mode="outlined"
                  label="Nombre"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <HelperText type="error" visible={errors.nombre ? true : false}>
                  {errors.nombre?.message}
                </HelperText>
              </>
            )}
            name="nombre"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  mode="outlined"
                  label="Dirección"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <HelperText type="error" visible={errors.direccion ? true : false}>
                  {errors.direccion?.message}
                </HelperText>
              </>
            )}
            name="direccion"
          />
          <RadioButton.Group onValueChange={value => setTipo(value)} value={tipo}>
            <RadioButton.Item label="Tiempo (No Visita)" value="tiempo_no_visita" />
            <RadioButton.Item label="Transporte (No Visita)" value="transporte_no_visita" />
            <RadioButton.Item label="Cerrado" value="cerrado" />
            <RadioButton.Item label="Stock" value="stock" />
            <RadioButton.Item label="Ausente" value="ausente" />
            <RadioButton.Item label="Motivo Efectivo" value="motivo_efectivo" />
            <RadioButton.Item label="Otros" value="otros" />
          </RadioButton.Group>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  multiline
                  numberOfLines={4}
                  mode="outlined"
                  label="Observaciones"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <HelperText type="error" visible={errors.observacion ? true : false}>
                  {errors.observacion?.message}
                </HelperText>
              </>
            )}
            name="observacion"
          />
          <Button
            icon="plus"
            mode="contained"
            style={{ margin: 5 }}
            onPress={handleSubmit(saveOrUpdate)}
          >
            Guardar
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  marginInput: {
    marginTop: 5,
    marginBottom: 15,
  },
});
