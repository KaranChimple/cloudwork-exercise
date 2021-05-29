import React from 'react';
import { Dispatch } from 'redux';
import moment from 'moment';
import { connect } from 'react-redux';
import { submit, created, createInterval } from '../../state/workloads/actions';


interface WorkloadFormDispatchProps {
  submitWorkload: (complexity: number, id: number) => void
}

interface WorkloadFormProps extends
  WorkloadFormDispatchProps {}

interface WorkloadFormState {
  complexity: number;
  id: number;
}

class WorkloadForm extends React.PureComponent<WorkloadFormProps, WorkloadFormState> {
  defaultState = {
    complexity: 5,
    id: 0,
  }

  state = this.defaultState;

  handleSubmit = (e: React.MouseEvent) => {
    this.setState({
      complexity: this.state.complexity,
      id: this.state.id + 1,
    }, () => {
      this.props.submitWorkload(this.state.complexity, this.state.id);
    });
    e.preventDefault();
  }

  render() {
    return (
      <form>
        <h2>Create workload</h2>

        <div>
          <label>
            Complexity: {this.state.complexity}
            <br />
            <input
              value={this.state.complexity}
              onChange={(e) => this.setState({ complexity: Number(e.target.value) })}
              type="range"
              min="1"
              max="10"
            />
          </label>
        </div>

        <div>
          <button className="btn-create-workload" onClick={this.handleSubmit} type="submit">Start work</button>
        </div>
      </form>
    );
  }
}


const mapDispatchToProps = (dispatch: Dispatch): WorkloadFormDispatchProps => ({
  submitWorkload: (complexity: number, id: number) => {
    dispatch(submit({ complexity }));
    dispatch(created({ id: id, complexity: complexity, completeDate: moment().add(10, 'second').toDate(), status: 'WORKING' }));
    createInterval(id);
  },
});

const WorkloadFormContainer = connect(null, mapDispatchToProps)(WorkloadForm);


export {
  WorkloadForm,
  WorkloadFormContainer,
}

export default WorkloadForm;