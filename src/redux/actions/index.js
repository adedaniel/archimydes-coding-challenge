import Axios from "axios";
import { URL } from "../../utils/url";

export const createNewStory = (newStory) => (dispatch) => {
  dispatch({
    // Firstly, remove all residual error instances of this action,
    type: "ERROR",
    hasError: false,
    errorType: "CREATE_NEW_STORY",
  });
  dispatch({
    // Next, add this action to the list of loading actions,
    type: "LOADING",
    isLoading: true,
    loadingType: "CREATE_NEW_STORY",
  });
  Axios.post(URL + "/api/v1/stories", newStory, {
    // Then, make the api request
    headers: {
      Authorization: `${localStorage.getItem("archimydes_access_token")}`,
    },
  })
    .then((result) => {
      dispatch({ type: "CREATE_NEW_STORY", payload: result.data }); // If successful, Add the new user story
      dispatch({
        // Now we can set the loading state of this action to false
        type: "LOADING",
        isLoading: false,
        loadingType: "CREATE_NEW_STORY",
      });
      dispatch({
        // In case we want to display a success message, we add this to the list of successful Actions
        type: "SUCCESS",
        hasSuccess: true,
        successType: "CREATE_NEW_STORY",
      });
      setTimeout(() => {
        dispatch({
          // We also remove from the list after 700 seconds so it doesn't affect the next request
          type: "SUCCESS",
          hasSuccess: false,
          successType: "CREATE_NEW_STORY",
        });
      }, 700);
    })
    .catch((error) => {
      // However, if this request failed,
      dispatch({
        // We still set the loading state to false...
        type: "LOADING",
        isLoading: false,
        loadingType: "CREATE_NEW_STORY",
      });
      dispatch({
        // Then, we add this to our array of error-ed Actions, incase we need to display an error message
        type: "ERROR",
        hasError: true,
        errorType: "CREATE_NEW_STORY",
      });
      setTimeout(() => {
        // After 700 secs, we remove it from the errorActions array so it doesn't remain during our next request
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
    // First, Add this action to the list of loading actions,
    type: "LOADING",
    isLoading: true,
    loadingType: "READ_USER_STORIES",
  });

  Axios.get(URL + "/api/v1/stories", {
    // Then, make the request to fetch the user stories
    headers: {
      Authorization: `${localStorage.getItem("archimydes_access_token")}`,
    },
  })
    .then((result) => {
      dispatch({ type: "READ_USER_STORIES", payload: result.data }); // If successful, Set the User stories
      dispatch({ type: "LOADED_ACTION", loadedType: "READ_USER_STORIES" }); // And now we add this to our list of successfully loaded Actions

      dispatch({
        // Then we can set the loading state of this action to false
        type: "LOADING",
        isLoading: false,
        loadingType: "READ_USER_STORIES",
      });
    })
    .catch((error) => {
      //If not,
      console.log(error.response);
    });
};
export const updateUserStory = (updatedStory) => (dispatch) => {
  dispatch({ type: "UPDATE_USER_STORY", payload: updatedStory }); // To Update the story status
};
export const emptyStore = () => (dispatch) => {
  dispatch({ type: "EMPTY_USER_DATA" }); //Empty the data in the store
};
