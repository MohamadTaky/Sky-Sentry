import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./index.css";
import LoadingOverlay from "features/loader/loadingOverlay.component";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={client}>
			<BrowserRouter>
				<LoadingOverlay>
					<App />
				</LoadingOverlay>
				<ReactQueryDevtools position="bottom-right" />
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>
);

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
window.addEventListener("resize", () => {
	vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);
});
