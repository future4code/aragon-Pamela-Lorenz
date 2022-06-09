import { GlobalState } from "./global/GlobalState";
import Router from "./routes/Router";

export default function App() {
    return (
        <GlobalState>
            <Router />
        </GlobalState>
    )
}