import React, { PureComponent } from 'react';

import { WorkloadListContainer } from '../WorkloadList';
import { WorkloadFormContainer } from '../WorkloadForm';
import './App.css';


class App extends PureComponent {
  render() {
    return (
      <div className="parent-container">
        <h1 className="heading">CloudWork</h1>
        <hr className="horizontal-rule" />

        <div className="workload-details">

          <div className="sub-row-right-col">
            <WorkloadFormContainer />
          </div>

          <div className="sub-row-left-col">
            <h2>Workloads</h2>
            <WorkloadListContainer />
          </div>

        </div>
      </div>
    );
  }
}

export default App;
