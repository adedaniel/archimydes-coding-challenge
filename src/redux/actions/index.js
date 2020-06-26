import Axios from "axios";
import { URL } from "../../utils/url";

export const createNewStory = (newStory) => (dispatch) => {
  dispatch({
    type: "ERROR",
    hasError: false,
    errorType: "CREATE_NEW_STORY",
  });
  dispatch({
    type: "LOADING",
    isLoading: true,
    loadingType: "CREATE_NEW_STORY",
  });
  Axios.post(URL + "/api/v1/stories", newStory, {
    headers: {
      Authorization: `${localStorage.getItem("archimydes_access_token")}`,
    },
  })
    .then((result) => {
      dispatch({ type: "CREATE_NEW_STORY", payload: result.data });
      dispatch({
        type: "LOADING",
        isLoading: false,
        loadingType: "CREATE_NEW_STORY",
      });
      dispatch({
        type: "SUCCESS",
        hasSuccess: true,
        successType: "CREATE_NEW_STORY",
      });
      setTimeout(() => {
        dispatch({
          type: "SUCCESS",
          hasSuccess: false,
          successType: "CREATE_NEW_STORY",
        });
      }, 700);
    })
    .catch((error) => {
      dispatch({
        type: "LOADING",
        isLoading: false,
        loadingType: "CREATE_NEW_STORY",
      });
      dispatch({
        type: "ERROR",
        hasError: true,
        errorType: "CREATE_NEW_STORY",
      });
      setTimeout(() => {
        dispatch({
          type: "ERROR",
          hasError: false,
          errorType: "CREATE_NEW_STORY",
        });
      }, 700);
    });
};
export const readUserStories = () => (dispatch) => {
  dispatch({
    type: "LOADING",
    isLoading: true,
    loadingType: "READ_USER_STORIES",
  });

  Axios.get(URL + "/api/v1/stories", {
    headers: {
      Authorization: `${localStorage.getItem("archimydes_access_token")}`,
    },
  })
    .then((result) => {
      dispatch({ type: "READ_USER_STORIES", payload: result.data });
      dispatch({ type: "LOADED_ACTION", loadedType: "READ_USER_STORIES" });

      dispatch({
        type: "LOADING",
        isLoading: false,
        loadingType: "READ_USER_STORIES",
      });
    })
    .catch((error) => {
      console.log(error.response);
    });
};
export const updateUserStory = (updatedStory) => (dispatch) => {
  dispatch({ type: "UPDATE_USER_STORY", payload: updatedStory });
};
export const emptyStore = () => (dispatch) => {
  dispatch({ type: "EMPTY_USER_DATA" });
};
