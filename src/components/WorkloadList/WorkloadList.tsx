import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { RootAction, RootState } from '../../state';
import { cancel, updateStatus, createInterval } from '../../state/workloads/actions';
import { WorkloadItem, WorkloadItemStateProps } from '../WorkloadItem';


export interface WorkloadListStateProps {
  workloads: WorkloadItemStateProps[];
}

export interface WorkloadListDispatchProps {
  cancelWorkload: (id: number) => void;
}

export interface WorkloadListProps extends
  WorkloadListStateProps,
  WorkloadListDispatchProps {}


const WorkloadList: React.SFC<WorkloadListProps> = ({ workloads, cancelWorkload }) => {
  return (
  !workloads.length
    ? (
      <span>No workloads to display</span>
    )
  : (
    <ol>
      {workloads.map((workload) => {
        return (
        <li key={workload.id}>
          <WorkloadItem {...workload} onCancel={() => cancelWorkload(workload.id)} />
        </li>
      )})}
    </ol>
  )
)};


const mapStateToProps = (state: RootState): WorkloadListStateProps => ({
  workloads: Object.values(state.workloads),
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): WorkloadListDispatchProps => ({
  cancelWorkload: (id: number) => {
    createInterval(id, moment().add(0, 'second').toDate(), true);
    dispatch(cancel({ id }));
    dispatch(updateStatus({id: id, status: 'CANCELED'}));
  },
})

const WorkloadListContainer = connect(mapStateToProps, mapDispatchToProps)(WorkloadList);


export {
  WorkloadList,
  WorkloadListContainer,
};

export default WorkloadList;
