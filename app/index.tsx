import { Redirect } from "expo-router";

const App = () => {
  const isLoggedIn = true; // Replace with actual auth state

  if (!isLoggedIn) {
    return <Redirect href="/auth/login" />;
  }

  return <Redirect href="/lessons" />;
}
export default App;