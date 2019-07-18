import { createStackNavigator, createAppContainer, createDrawerNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Map from '../screens/Map'
import Dashboard from '../screens/Dashboard';
import Form from '../screens/Form';

const StackNavigator = createStackNavigator({
    Dashboard:{
        screen: Dashboard
    },
    Form: {
        screen: Form
    },
})
const Navigation = createAppContainer(StackNavigator)
export default Navigation;