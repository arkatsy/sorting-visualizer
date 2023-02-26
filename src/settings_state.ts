enum SettingsActionType {
  CHANGE_STATUS = "CHANGE_STATUS",
  CHANGE_ALGORITHM = "CHANGE_ALGORITHM",
  CHANGE_SIZE = "CHANGE_SIZE",
}

enum AlgorithmType {
  BUBBLE_SORT = "BUBBLE_SORT",
  SELECTION_SORT = "SELECTION_SORT",
  INSERTION_SORT = "INSERTION_SORT",
  MERGE_SORT = "MERGE_SORT",
}

export const ALGORITHMS: Array<AlgorithmType> = [
  AlgorithmType.BUBBLE_SORT,
  AlgorithmType.SELECTION_SORT,
  AlgorithmType.INSERTION_SORT,
  AlgorithmType.MERGE_SORT,
];

export const INITIAL_STATE: SettingsState = {
  status: "IDLE",
  algorithm: AlgorithmType.BUBBLE_SORT,
  size: 10,
};

type SettingsState = {
  status: "IDLE" | "ACTIVE" | "STOPPED";
  algorithm: AlgorithmType;
  size: number;
};

type SettingsActions =
  | {
      type: SettingsActionType.CHANGE_STATUS;
      payload: SettingsState["status"];
    }
  | {
      type: SettingsActionType.CHANGE_ALGORITHM;
      payload: SettingsState["algorithm"];
    }
  | {
      type: SettingsActionType.CHANGE_SIZE;
      payload: SettingsState["size"];
    };

export const settingsReducer: React.Reducer<SettingsState, SettingsActions> = (
  state,
  action
) => {
  switch (action.type) {
    case SettingsActionType.CHANGE_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case SettingsActionType.CHANGE_ALGORITHM:
      return {
        ...state,
        algorithm: action.payload,
      };
    case SettingsActionType.CHANGE_SIZE:
      return {
        ...state,
        size: action.payload,
      };
    default:
      return state;
  }
};