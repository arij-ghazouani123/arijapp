import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NewProjectModal from './NewProjectModal';
import ProjectsList from './ProjectsList';
import Repositorie from '../components/RepositoriesSelect';
import ConnectToStore from './ConnectToStore';
import Release from '../pages/Home';
import Statistiques from '../pages/stastique'
import Documentation from './AnalyticDocumentation';

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState('build');

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };
    return (
        <div>
            <div className="container-fluid mb-5">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="#">
                    
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="#" onClick={() => handleTabClick('build')}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-file"
                      aria-hidden="true"
                    >
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                    Build
                  </NavLink>
                </li>
                <li className="nav-item">
                
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="#" onClick={() => handleTabClick('tests')}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-users"
                      aria-hidden="true"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    Tests
                  </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="#" onClick={() => handleTabClick('distribute')}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-bar-chart-2"
                      aria-hidden="true"
                    >
                      <line x1="18" y1="20" x2="18" y2="10"></line>
                      <line x1="12" y1="20" x2="12" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                    Distribute
                  </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to="#" onClick={() => handleTabClick('Statistiques')}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-bar-chart-2"
                      aria-hidden="true"
                    >
                      <line x1="18" y1="20" x2="18" y2="10"></line>
                      <line x1="12" y1="20" x2="12" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                    Report
                  </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to="#" onClick={() => handleTabClick('analytics')}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-layers"
                      aria-hidden="true"
                    >
                      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                      <polyline points="2 17 12 22 22 17"></polyline>
                      <polyline points="2 12 12 17 22 12"></polyline>
                    </svg>
                    Analytics
                  </NavLink>
                </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="#" onClick={() => handleTabClick('stores')}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="feather feather-layers"
                        aria-hidden="true"
                      >
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                      </svg>
                      Connect To Store
                    </NavLink>
                  </li>
              </ul>

              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
           
           
              </h6>
              <ul className="nav flex-column mb-2">
                <li className="nav-item">
              
                </li>
                <li className="nav-item">
              
                </li>
                <li className="nav-item">
            
                </li>
                <li className="nav-item">
            
                </li>
              </ul>
            </div>
          </nav>
          
            <div className="dash content" style={{ width: '80%' }}>
              {currentTab === 'overview' && (
                <h1>Overview</h1>

                // render overview content
              )}
              {currentTab === 'build' && (
                <div className="" style={{ width: '80%' }}>
                  <h1>Build</h1>
                  <Repositorie/>
                </div>

                // render build content
              )}
              {currentTab === 'tests' && (
                <h1>Test</h1>
                // render test content
              )}
              {currentTab === 'distribute' && (
                <div className="" style={{ width: '80%' }}>
                <h1>Distribute</h1>
                <Release/>
                </div>
              )}

                
              {currentTab === 'analytics' && (
                // render analytics content
                <div className="" style={{ width: '100%' , height:'100%' }}>
                  <Documentation/>

                </div>
              )}
            
            {currentTab === 'Statistiques' && (
                <div className="" style={{ width: '80%' }}>
                <h1>Statistiques</h1>
                <Statistiques/>
                </div>
              )}

            
              {currentTab === 'stores' && (
              
                // render settings content
                <div className="" style={{ width: '80%' }}>
                <h1>Stores</h1>
                <ConnectToStore/>
                </div>
              )}
            </div>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="chartjs-size-monitor">
              <div className="chartjs-size-monitor-expand">
                <div className=""></div>
              </div>
              <div className="chartjs-size-monitor-shrink">
                <div className=""></div>
              </div>
            </div>
           
          </main>
        </div>
      </div>
        </div>
    );
}

export default Dashboard;
