import {UIActions, START_LOADING, STOP_LOADING} from '../actions/ui.actions';

export interface State {

  isLoading: boolean;
}


const initialState: State = {
  isLoading: false
};




export function LoadingReducer(state = initialState, action: UIActions) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    default: {
      return state;
    }
  }
}

export const getIsLoading = (state: State) => state.isLoading;

