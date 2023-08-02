const { createContext, useReducer, useEffect } = require("react");

export const UserContext = createContext();

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        user: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        user: null,
      };
    }
    default: {
      return state;
    }
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, {
    user: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    dispatch({ type: "LOGIN", payload: JSON.parse(user) });
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
