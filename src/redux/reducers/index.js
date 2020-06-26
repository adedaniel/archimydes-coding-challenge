// Reducer

export default function (state, action) {
  switch (action.type) {
    case "EMPTY_USER_DATA":
      return {
        ...state,
        allUserStories: [],
        loadedActions: [],
      };
    case "USER_DETAILS":
      return {
        ...state,
        userDetails: action.payload,
      };
    case "READ_USER_STORIES":
      return {
        ...state,
        allUserStories: action.payload,
      };
    case "CREATE_NEW_STORY":
      return {
        ...state,
        allUserStories: [...state.allUserStories, action.payload],
      };
    case "UPDATE_USER_STORY":
      return {
        ...state,
        allUserStories: state.allUserStories.map((story) =>
          story.id === action.payload.id ? action.payload : story
        ),
      };
    case "DELETE_USER_STORY":
      return {
        ...state,
        allUserStories: state.allUserStories.filter(
          (story) => story.id !== action.payload
        ),
      };
    case "LOADING":
      if (action.isLoading) {
        // if isLoading === true, add loading type to the array
        return {
          ...state,
          actionsLoading: [...state.actionsLoading, action.loadingType],
        };
      } else {
        // if isLoading === false, remove loading type from the array
        return {
          ...state,
          actionsLoading: state.actionsLoading.filter(
            (eachAction) => eachAction !== action.loadingType
          ),
        };
      }
    case "LOADED_ACTION":
      return {
        // add the loadedAction to the array of loadedActions
        ...state,
        loadedActions: [...state.loadedActions, action.loadedType],
      };

    case "ERROR":
      if (action.hasError) {
        // if hasError === true, add error type to the array of errors
        return {
          ...state,
          actionsError: [
            ...state.actionsError,
            {
              errorType: action.errorType,
              errorMessage: action.errorMessage,
            },
          ],
        };
      } else {
        // if hasError === false, remove error type from the array of errors
        return {
          ...state,
          actionsError: state.actionsError.filter(
            (eachError) => eachError.errorType !== action.errorType
          ),
        };
      }

    case "SUCCESS":
      if (action.hasSuccess) {
        // if hasSuccess === true, add successful action to the array of actionsSuccess
        return {
          ...state,
          actionsSuccess: [
            ...state.actionsSuccess,
            {
              successType: action.successType,
              successMessage: action.successMessage,
            },
          ],
        };
      } else {
        // if hasSuccess === false, remove successful action from the array of actionsSuccess
        return {
          ...state,
          actionsSuccess: state.actionsSuccess.filter(
            (eachSuccess) => eachSuccess.successType !== action.successType
          ),
        };
      }
    default:
      return state;
  }
}
