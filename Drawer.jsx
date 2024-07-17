import { createDrawerNavigator } from '@react-navigation/drawer';
import Payment from './GetStarted/Payment';
import EnterLocation from './GetStarted/EnterLocation';
import HomeScreen from './GetStarted/HomeScreen';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="EnterLocation" component={EnterLocation} />
    </Drawer.Navigator>
  );
}