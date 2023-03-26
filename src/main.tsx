import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./index.css";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={client}>
			<BrowserRouter>
				<App />
				<ReactQueryDevtools position="bottom-right"/>
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>
);
