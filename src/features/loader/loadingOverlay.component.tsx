import { ReactNode, Suspense } from "react";
import Loader from "./loader.compoennt";

interface IProps {
	children: ReactNode;
}

export default function LoadingOverlay({ children }: IProps) {
	return (
		<Suspense
			fallback={
				<div className="h-screen grid place-items-center">
					<Loader />
				</div>
			}>
			{children}
		</Suspense>
	);
}
