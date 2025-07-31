import { Button, Section, Text } from '@react-email/components';


import Layout from './_components/Layout';

export interface ForgotPasswordMailProps {
	code: string;
  url:string 
}

export default function ForgotPasswordMail(props: ForgotPasswordMailProps) {
	return (
		<Layout title="Esqueci minha senha">
			<Section>
				<Text className="text-base">
					Olá, foi solicitado uma alteração de senha do seu e-mail, clique no botão
					abaixo para poder alterar.
				</Text>
			</Section>
			<Section className="mb-3 flex">
				<Button
					className="rounded bg-[#a4ff64] px-[40px] py-[12px] text-center text-sm font-bold text-black"
					href={props.url}
				>
					Alterar minha senha
				</Button>
			</Section>
		</Layout>
	);
}
