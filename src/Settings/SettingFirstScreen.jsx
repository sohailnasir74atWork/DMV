import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import { useGlobalState } from '../GlobelStates/States';
import CustomText from '../Helper/MyText';

const SettingFirstScreen = () => {
  const [isHapticsEnabled, setIsHapticsEnabled] = useState(true);
  const [isReminderEnabled, setIsReminderEnabled] = useState(true);
  const [selectedTime, setSelectedTime] = useState('6:59 PM');
  const [theme, setTheme] = useState('System');
  const [licenseType, setLicenseType] = useState('car');
  const { themeColor, setThemeColor, colorOptions, whiteBgColor , textColor, scondaryBgColor} = useGlobalState();

  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(themeColor);
  const [openLicensePicker, setOpenLicensePicker] = useState(false);

  const colorItems = Object.entries(colorOptions).map(([colorName, colorValue]) => ({
    label: colorName.charAt(0).toUpperCase() + colorName.slice(1),
    value: colorValue,
    icon: () => (
      <View style={[styles.colorCircle, { backgroundColor: colorValue }]} />
    ),
  }));

  const licenseItems = [
    {
      label: '',
      value: 'car',
      icon: () => <Ionicons name="car" size={28} color={themeColor} />,
    },
    {
      label: '',
      value: '',
      icon: () => <Ionicons name="bicycle" size={28} color={themeColor} />,
    },
  ];

  const toggleHaptics = () => setIsHapticsEnabled((previousState) => !previousState);
  const toggleReminder = () => setIsReminderEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      {/* App Settings Section */}
      <CustomText style={styles.sectionHeader}>APP SETTINGS</CustomText>
      <View style={[styles.sectionContainer, {backgroundColor: whiteBgColor}]}>
        {/* Theme Selector */}
        <View style={[styles.themeSelector, {backgroundColor:scondaryBgColor}]}>
          <TouchableOpacity
            onPress={() => setTheme('Dark')}
            style={[styles.themeOption, theme === 'Dark' && [styles.activeThemeOption]]}
          >
            <CustomText style={[styles.themeOptionText, theme === 'Dark' && styles.activeThemeOptionText]}>Dark</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTheme('Light')}
            style={[styles.themeOption, theme === 'Light' && styles.activeThemeOption]}
          >
            <CustomText style={[styles.themeOptionText, theme === 'Light' && styles.activeThemeOptionText]}>Light</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTheme('System')}
            style={[styles.themeOption, theme === 'System' && styles.activeThemeOption]}
          >
            <CustomText style={[styles.themeOptionText, theme === 'System' && styles.activeThemeOptionText]}>System</CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        {/* Haptics Switch */}
        <View style={styles.settingRow}>
          <CustomText style={styles.settingText}>Haptics</CustomText>
          <Switch value={isHapticsEnabled} onValueChange={toggleHaptics} />
        </View>
        <View style={styles.separator} />

        {/* License Type Picker */}
        <View style={styles.settingRow}>
          <CustomText style={styles.settingText}>License Type</CustomText>
          <DropDownPicker
            open={openLicensePicker}
            value={licenseType}
            items={licenseItems}
            setOpen={setOpenLicensePicker}
            setValue={setLicenseType}
            style={[styles.pickerStyle, { borderColor: 'transparent', backgroundColor: 'transparent' }]}
            containerStyle={[styles.pickerContainer1, { borderWidth: 0 }]}
            labelStyle={[styles.pickerLabel]}
            dropDownContainerStyle={{ borderColor: 'transparent', backgroundColor: whiteBgColor }}
            ArrowUpIconComponent={() => <Ionicons name="chevron-up" size={20} color={!whiteBgColor} />}
            ArrowDownIconComponent={() => <Ionicons name="chevron-down" size={20} color={!whiteBgColor} />}
            textStyle={{ color: !whiteBgColor }} // This controls the dropdown items text color
            TickIconComponent={() => <Ionicons name="checkmark" size={10} color={!whiteBgColor} />} // Customi
          />
        </View>
      </View>

      {/* Notifications Section */}
      <CustomText style={styles.sectionHeader}>NOTIFICATIONS</CustomText>
      <View style={[styles.sectionContainer, {backgroundColor: whiteBgColor}]}>
        {/* Reminder Switch */}
        <View style={styles.settingRow}>
          <CustomText style={styles.settingText}>Reminder</CustomText>
          <Switch value={isReminderEnabled} onValueChange={toggleReminder} />
        </View>
        <View style={styles.separator} />

        {/* Select Time */}
        <View style={styles.settingRow}>
          <View>
            <CustomText style={styles.settingText}>Select Time</CustomText>
            <CustomText style={styles.subText}>You will be notified at {selectedTime} daily</CustomText>
          </View>
          <TouchableOpacity style={styles.timeButton}>
            <CustomText style={styles.timeText}>{selectedTime}</CustomText>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.separator} />

      {/* Customize Section */}
      <CustomText style={styles.sectionHeader}>CUSTOMIZE</CustomText>
      <View style={[styles.sectionContainer, {backgroundColor: whiteBgColor}]}>
        {/* App Icon */}
        <TouchableOpacity style={styles.settingRow}>
          <CustomText style={styles.settingText}>App Icon</CustomText>
          <Ionicons name="chevron-forward" size={20} color={!whiteBgColor} />
        </TouchableOpacity>
        <View style={styles.separator} />

        {/* Accent Color Picker */}
        <View style={styles.settingRow}>
          <CustomText style={styles.settingText}>Accent Color</CustomText>
          <DropDownPicker
            open={openColorPicker}
            value={selectedColor}
            items={colorItems}
            setOpen={setOpenColorPicker}
            setValue={setSelectedColor}
            onChangeValue={(value) => setThemeColor(value)}
            style={[styles.pickerStyle, { borderColor: 'transparent', backgroundColor: whiteBgColor }]}
            containerStyle={[styles.pickerContainer, { borderWidth: 0 }]}
            labelStyle={[styles.pickerLabel,{color:textColor}]}
            dropDownContainerStyle={{ borderColor: 'transparent', backgroundColor: whiteBgColor }}
            ArrowUpIconComponent={() => <Ionicons name="chevron-up" size={20} color={!whiteBgColor} />}
            ArrowDownIconComponent={() => <Ionicons name="chevron-down" size={20} color={!whiteBgColor} />}
            textStyle={{ color: !whiteBgColor }} // This controls the dropdown items text color
            TickIconComponent={() => <Ionicons name="checkmark" size={20} color={!whiteBgColor} />} // Customize check arrow color

          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  sectionContainer: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  themeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: 10,
    marginBottom: 16,
    borderRadius:10
  },
  themeOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  activeThemeOption: {
    backgroundColor: 'grey',
  },
  themeOptionText: {
    fontSize: 16,
  },
  activeThemeOptionText: {
    fontWeight: 'bold',
    color:'white'
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingText: {
    fontSize: 16,
  },
  subText: {
    fontSize: 12,
  },
  timeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  timeText: {
    fontSize: 16,
  },
  pickerStyle: {
    // backgroundColor: 'transparent',
    // borderColor: 'transparent',
  },
  pickerContainer1: {
    width: 80,
    zIndex: 1000,
    borderWidth: 0,
  },
  pickerContainer: {
    width: 132,
    zIndex: 1000,
    borderWidth: 0,
  },
  pickerLabel: {
    fontSize: 16,
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  separator:{
    height: .5,
    backgroundColor: 'grey',
    opacity:.3
  }
});

export default SettingFirstScreen;
