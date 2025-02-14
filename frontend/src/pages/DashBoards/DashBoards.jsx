import React from 'react';
import SideBar from '~/components/DashBoardsContent/SideBar/SideBar';
import MainContent from '~/components/DashBoardsContent/MainContent/MainContent';
import Header from '~/components/Header/Header';
import Footer from '~/components/Footer/Footer';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-golf-green-500">
      {/* Sidebar */}
      <SideBar />
      {/* Main Content */}
      <MainContent />
    </div>
  );
};

export default Dashboard;
