export default function ErrorFallback({ resetErrorBoundary }: { resetErrorBoundary: () => void }) {
	return (
		<div className="h-screen flex items-center justify-center flex-col gap-2 text-center p-8">
			<span className="text-failure-1">
				An error occured, Please check your internet connection and try again
			</span>
			<button className="bg-accent-3 px-2 py-1 rounded-md" onClick={resetErrorBoundary}>
				Try Again
			</button>
		</div>
	);
}
