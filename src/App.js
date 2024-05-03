import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Navbar from './Components/Navbar';
import News from './Components/News';
import { Component } from "react";
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {
  pageSize=6;
  state={
    progress:0
  }
setProgress=(value)=>{
  this.setState({progress: value})
}
  render(){
  return (
    <Router>
    <div>
      <Navbar/>
      <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
      />
      <Routes>
      <Route exact path='/movies' element={<News setProgress={this.setProgress}   key="movies"  pageSize={this.pageSize} category="movies"/>}/>
     <Route exact path='/' element={<News setProgress={this.setProgress}   key="general"  pageSize={this.pageSize} category="general"/>}/>
     <Route exact path='/business'  element={<News setProgress={this.setProgress}  key="business" pageSize={this.pageSize} category="business"/>}/>
     <Route exact path='/entertainment'  element={<News setProgress={this.setProgress}  key="entertainment" pageSize={this.pageSize} category="entertainment"/>}/>
     <Route exact path='/general' element={<News setProgress={this.setProgress}   key="general"  pageSize={this.pageSize} category="general"/>}/>
     <Route exact path='/health'  element={<News setProgress={this.setProgress}  key="health" pageSize={this.pageSize} category="health"/>}/>
     <Route exact path='/science'  element={<News setProgress={this.setProgress}  key="science" pageSize={this.pageSize} category="science"/>}/>
     <Route exact path='/technology'  element={<News setProgress={this.setProgress}  key="technology" pageSize={this.pageSize} category="technology"/>}/>
     
     </Routes>
    </div>
    </Router>
  )
  }
}


