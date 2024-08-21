import React, { useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LogoutHome from './components/LogOut/LogoutHome';
import MainNavBar from './components/NavigationBars/MainNavBar';
import NotFound from './components/LogOut/NotFound';
import EmailForm from './components/EmailForm';
import UserRegistration from './components/LogOut/UserRegistration';
//import LoginHome from './components/Login/LoginHome';
import Login from './components/LogOut/LoginPage';
import ProtectedRoute from './components/Authentication/ProtectedRoute';
import ToastManager from './components/LogOut/ToastManager';
import AddContact from './components/Login/Profile/AddContact';
import Contacts from './components/Login/Profile/Contacts';
import InvestmentEditPage from './components/Login/CatInvestment/InvestmentEditPage';
import InvestmentPage from './components/Login/CatInvestment/InvestmentPage';
import IncomePage from './components/Login/CatIncome/IncomePage';
import IncomeEditPage from './components/Login/CatIncome/IncomeEditPage';
import ExpensePage from './components/Login/CatExpenditure/ExpensePage';
import ExpenditureEditPage from './components/Login/CatExpenditure/ExpenditureEditPage';
import ProfileEdit from './components/Login/Profile/ProfileEdit';
import SecondaryBar from './components/NavigationBars/SecondaryBar';
import FeedbackForm from './components/Login/feedbackform';
import ContactUs from './components/LogOut/ContactUs';
import Faq from './components/LogOut/Faq';


function App() {
  const toastRef =useRef(); //reference to pass to toastManager
  return (
    <div>
      <MainNavBar toastRef={toastRef}/>
      <Routes>
        <Route path='/home' element={<LogoutHome/>}/>

        <Route path='/profile' element={<ProtectedRoute element={ProfileEdit} />} />

        <Route path="/loginHome" element={<ProtectedRoute element={SecondaryBar} />} />

        <Route path="/register" element={<UserRegistration />} />

        <Route path="/email" element={<EmailForm/>} />

        <Route path="/login" element={<Login toastRef={toastRef}/>} />
        <Route path="/contactUs" element={<ContactUs/>} />
        <Route path="/faq" element={<Faq/>} />

        
        <Route path="/feedback" element={<ProtectedRoute element={FeedbackForm} />} />

        <Route path="/contacts" element={<ProtectedRoute element={Contacts} />} />
        <Route path="/Contacts/add" element={<ProtectedRoute element={AddContact} />} />

        <Route path="/incomes" element={<ProtectedRoute element={IncomePage} />} />
        <Route path="/incomes/edit/:incomeId" element={<ProtectedRoute element={IncomeEditPage} />} />

        <Route path="/Investment/add" element={<ProtectedRoute element={InvestmentPage} />} />
        <Route path="/investment/edit/:investmentId" element={<ProtectedRoute element={InvestmentEditPage} />} />

        <Route path="/expense/add" element={<ProtectedRoute element={ExpensePage} />} />
        <Route path="/expense/edit/:incomeId" element={<ProtectedRoute element={ExpenditureEditPage} />} />

        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<NotFound/>} /> {/* Default route */}
      </Routes>

      <ToastManager ref={toastRef} />
      
    </div>
   
  );
}
export default App;