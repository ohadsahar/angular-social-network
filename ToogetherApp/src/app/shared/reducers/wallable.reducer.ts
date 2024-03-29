import {SHOW_WALL, HIDE_WALL, UIActions} from '../actions/ui.actions';
export interface State {
  wallAble: boolean;
  profileAble: boolean;
}

const initialState: State = {
  wallAble: false,
  profileAble: true
};

export function wallAbleReducer(state = initialState, action: UIActions) {

  switch (action.type) {
    case SHOW_WALL:
      return {
        wallAble: true,
        profileAble: false
      };
    case HIDE_WALL:
      return {
        wallAble: false,
        profileAble: true
      };
    default: {
      return state;
    }
  }
}
export const getWallAble = (state: State) => state.wallAble;
export const getProfileAble = (state: State) => state.profileAble;
