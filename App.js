import React from 'react';
import Navigation from './src/navigation/StackNavigation';

app.listen(3000, function(){
  console.log("info",'Server is running at port : ' + 3000);
});

export default class App extends React.Component {
  render() {
    return (
      <Navigation />
      
    );
  }
}
