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
        return {
          ...state,
          actionsLoading: [...state.actionsLoading, action.loadingType],
        };
      } else {
        return {
          ...state,
          actionsLoading: state.actionsLoading.filter(
            (eachAction) => eachAction !== action.loadingType
          ),
        };
      }
    case "LOADED_ACTION":
      return {
        ...state,
        loadedActions: [...state.loadedActions, action.loadedType],
      };

    case "ERROR":
      if (action.hasError) {
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
        return {
          ...state,
          actionsError: state.actionsError.filter(
            (eachError) => eachError.errorType !== action.errorType
          ),
        };
      }

    case "SUCCESS":
      if (action.hasSuccess) {
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
