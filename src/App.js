import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import NavigationContent from './components/home-navigation/NavigationContent';
import Signup from './components/credentials/signup/Signup';
import Signin from './components/credentials/signin/Signin';
import AccountIndex from './components/account/AccountIndex';
import AccountHome from './components/account/home/Home'
import PostProperty from './components/account/post-property/PostProperty'
import PersistLogin from './components/persist/PersistLogin';

import ManageAccount from './components/account/manage/Home'
import Properties from './components/account/manage/properties/Properties';
import MyProperties from './components/account/manage/properties/my-properties/MyProperties';
import AssumedProperties from './components/account/manage/properties/assumed-properties/AssumedProperties'
import ChatRoom from './components/account/manage/chatroom/ChatRoom';
import FeedBack from './components/account/manage/feedbacks/FeedBack';
import DashBoard from './components/account/manage/dashboard/DashBoard';

import ViewIndex from './components/account/inquiry/property/ViewIndex'
import CertainProperty from './components/account/inquiry/certain/CertainProperty';
import About from './components/info/About';
import Contact from './components/info/Contact';
import NotFound404 from './components/404/NotFound404'

import './assets/font-awesome-4.7.0/css/font-awesome.min.css'

function App() {
  return (
    <Routes>
      <Route element={ <PersistLogin />} >
        <Route element = { <Home margin={"0px"} /> }>
          <Route path='/' element = { <NavigationContent /> } />
          <Route path='/signup' element={ <Signup /> } />
          <Route path='/signin' element={ <Signin /> } />
          <Route path='/about' element={ <About /> } />
          <Route path='/contact' element={ <Contact /> } />
        </Route>

        <Route element={ <AccountIndex /> } >
          <Route path='/account/home' element = { <AccountHome /> } />
          <Route path = '/inquiry/view/property/:propertyType' element = { <ViewIndex /> }/>
          <Route path = '/inquiry/view/property/:propertyType/:id' element = { <CertainProperty /> } />
        </Route>

        <Route path='/inquiry/post-property/:property_type' element={ <PostProperty /> } />

        <Route element = { <ManageAccount /> }>
          <Route path='/account/manage' element={ <DashBoard /> } />
          <Route path='/account/manage/properties' element={ <Properties /> } >
            <Route path='/account/manage/properties/my-properties' element={ <MyProperties /> } />
            <Route path='/account/manage/properties/assumed-properties' element={ <AssumedProperties /> } />
          </Route>
          <Route path='/account/manage/chatroom' element={ <ChatRoom /> } />
          <Route path='/account/manage/feedbacks' element= { <FeedBack/> } />
        </Route>
        
      </Route>
      {/* <Route path='*' element = { <NotFound404 /> } /> */}
    </Routes>
  );
}

export default App;