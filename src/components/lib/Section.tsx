import React, { ReactNode } from "react";

interface NewSectionProps {
	children?: ReactNode | undefined;
}

type SectionProps = NewSectionProps &
	Omit<React.ComponentPropsWithRef<"section">, keyof NewSectionProps>;

function Section({ children, ...props }: SectionProps) {
	return <section {...props}>{children}</section>;
}

type SectionWithLoaderAndErrorBoundaryProps = {
	header?: ReactNode;
	loader?: ReactNode;
} & SectionProps;
// Uses Suspense to show loaders in body part of it
// Also has an error boundary to catch errors occuring in its body
// TODO: Work on adding error boundary also leader here
export function SectionWithLoaderAndErrorBoundary({
	header,
	loader,
	children,
	...props
}: SectionWithLoaderAndErrorBoundaryProps) {
	return (
		<Section {...props}>
			{header}
			<React.Suspense fallback={"Loading..."}>{children}</React.Suspense>
		</Section>
	);
}
export default Section;
