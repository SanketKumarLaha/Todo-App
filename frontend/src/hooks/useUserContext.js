const { useContext } = require("react");
const { UserContext } = require("../context/UserContextProvider");

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw Error("useUserContext is oustide the scope ");
  }
  return context;
};
