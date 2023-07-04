import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, List } from 'react-native-paper';

export interface ChipData {
  id: string;
  label: string;
}

interface ChipsProps {
  label: string;
  chips: ChipData[];
  selectedChips: string[];
  onChipPress: (chipId: string) => void;
}

export const MyChip: React.FC<ChipsProps> = ({
  label,
  chips,
  selectedChips,
  onChipPress,
}) => {
  return (
    <List.Section title={label}>
      <View style={styles.container}>
        {chips.map(chip => (
          <Chip
            key={chip.id}
            selected={selectedChips.includes(chip.id)}
            onPress={() => onChipPress(chip.id)}
            mode={selectedChips.includes(chip.id) ? 'outlined' : 'flat'}
            textStyle={{ color: selectedChips.includes(chip.id) ? 'blue' : 'black' }}
            style={styles.chip}
          >
            {chip.label}
          </Chip>
        ))}
      </View>
    </List.Section>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 4,
  },
});
