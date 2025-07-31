import type { ReactNode } from 'react';
import { Container as BaseContainer, Section } from '@react-email/components';

type ContainerProps = { className?: string; children: ReactNode };
const Container = (props: ContainerProps) => (
	<BaseContainer className={`mx-auto w-[350px] py-[20px] ${props.className}`}>
		<Section className="mb-[22px] flex flex-col gap-y-[25px] p-[10px]">
			{props.children}
		</Section>
	</BaseContainer>
);

export default Container;
