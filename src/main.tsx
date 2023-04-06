import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./index.css";
import LoadingOverlay from "features/loader/loadingOverlay.component";
import { disableReactDevTools } from "disableReactDevtools";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";
import ErrorFallback from "components/errorFallback";

const client = new QueryClient();

if (import.meta.env.PROD === true) disableReactDevTools();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={client}>
			<BrowserRouter>
				<QueryErrorResetBoundary>
					{({ reset }) => (
						<ErrorBoundary
							onReset={reset}
							fallbackRender={({ resetErrorBoundary }) => (
								<ErrorFallback resetErrorBoundary={resetErrorBoundary} />
							)}>
							<LoadingOverlay>
								<App />
							</LoadingOverlay>
						</ErrorBoundary>
					)}
				</QueryErrorResetBoundary>
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
