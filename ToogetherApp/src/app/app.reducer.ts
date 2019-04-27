import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLoadingReducer from './shared/reducers/loading.reducer';
import * as fromWallAbleReducer from './shared/reducers/wallable.reducer';
import * as fromEditProfileAbleReducer from './shared/reducers/profleedit.reducer';
import * as fromWindowSizeReducer from './shared/reducers/window-size.reducer';

export interface State {

    uiReducerLoading: fromLoadingReducer.State;
    uiReducerWall: fromWallAbleReducer.State;
    UIReducerEdit: fromEditProfileAbleReducer.State;
    UIReducerMobile: fromWindowSizeReducer.State;

}

export const Reducers: ActionReducerMap<State> = {
  uiReducerLoading: fromLoadingReducer.LoadingReducer,
  uiReducerWall: fromWallAbleReducer.WallAbleReducer,
  UIReducerEdit: fromEditProfileAbleReducer.EditProfileAbleReducer,
  UIReducerMobile: fromWindowSizeReducer.WindowSizeReducer
};

export const GetReducuerLoading = createFeatureSelector<fromLoadingReducer.State>('uiReducerLoading');
export const getIsLoading = createSelector(GetReducuerLoading, fromLoadingReducer.getIsLoading);

export const GetReducerWall = createFeatureSelector<fromWallAbleReducer.State>('uiReducerWall');
export const getIsWallAble = createSelector(GetReducerWall, fromWallAbleReducer.GetWallAble);


export const GetReducerEdit = createFeatureSelector<fromEditProfileAbleReducer.State>('UIReducerEdit');
export const getIsEditAble = createSelector(GetReducerEdit, fromEditProfileAbleReducer.getIsEditAble);
export const getIsProfileAble = createSelector(GetReducerWall, fromWallAbleReducer.GetProfileAble);

export const  getWindowSize = createFeatureSelector<fromWindowSizeReducer.State>('UIReducerMobile');
export const  getMobileOrDesktop = createSelector(getWindowSize, fromWindowSizeReducer.GetMobileOrDesktop);

