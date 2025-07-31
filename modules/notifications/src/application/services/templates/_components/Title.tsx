import type { ReactNode } from 'react';
import { Heading, Section } from '@react-email/components';

type TitleProps = { className?: string; children: ReactNode };
const Title = (props: TitleProps) => (
	<Section className={`flex ${props.className}`}>
		<Heading className="mx-0 mb-0 p-0 text-[18px] font-bold">
			{props.children}
		</Heading>
	</Section>
);

export default Title;
