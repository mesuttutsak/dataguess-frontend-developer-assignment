import React from 'react';
import { createStore } from 'redux';

type AppState = {
  isOpenModal: boolean;
  modalContent: React.ReactNode;
  modalTitle: string;
};

const initialState: AppState = {
  isOpenModal: false,
  modalContent: null,
  modalTitle: ''
};

enum ActionTypes {
  TOGGLE_MODAL = 'TOGGLE_MODAL',
  SET_MODAL_CONTENT = 'SET_MODAL_CONTENT',
  SET_MODAL_TITLE = 'SET_MODAL_TITLE',
}

export const toggleModalAction = () => ({
  type: ActionTypes.TOGGLE_MODAL,
});

export const setModalContentAction = (content: React.ReactNode) => ({
  type: ActionTypes.SET_MODAL_CONTENT,
  payload: content,
});

export const setModalTitle = (title: React.ReactNode) => ({
  type: ActionTypes.SET_MODAL_TITLE,
  payload: title,
});

const rootReducer = (state: AppState = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_MODAL:
      return {
        ...state,
        isOpenModal: !state.isOpenModal,
      };
    case ActionTypes.SET_MODAL_CONTENT:
      return {
        ...state,
        modalContent: action.payload,
      };
    case ActionTypes.SET_MODAL_TITLE:
      return {
        ...state,
        modalTitle: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;