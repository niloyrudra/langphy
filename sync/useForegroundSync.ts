import { AppState } from "react-native";

export const useForegroundSync = async ( syncFn: () => void ) => {
    AppState.addEventListener( "change", (state) => {
        if( state === "active" ) {
            syncFn();
        }
    });
}