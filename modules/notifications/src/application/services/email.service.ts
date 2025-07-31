
import { render } from '@react-email/render';
import { Resend } from 'resend';

import { ConfigEnvSymbol } from '@modules/shared/config/env';
import type { ConfigEnv } from '@modules/shared/config/env';
import Templates from './templates';
import { injectable, inject } from 'tsyringe';


type Templates = Record< keyof typeof MailEvents, { subject: (props:{[key:string]:string})=>string;
    // eslint-disable-next-line
    bodyFn: (...args: any[]) => JSX.Element;
  }
>;

const templates: Templates = {
  welcome: {
    subject: (props)=>`Seja bem-vindo(a) a ! ${props.brand}`,
    bodyFn: Templates.Welcome,
  },
  forgotPassword: {
    subject: (props)=>'Link de alteração de senha',
    bodyFn: Templates.ForgotPassword,
  },
};


type SendMailProps = { to: string } & (
  | { template: 'welcome'; variables: Parameters<typeof Templates.Welcome> ;props:{[key:string]:string}}
  | { template: 'forgotPassword'; variables: Parameters<typeof Templates.ForgotPassword> ;props:{[key:string]:string}}
);

enum MailEvents {
  forgotPassword,
  welcome,
}

@injectable()
export class EmailService {
  private Resend: Resend;

  constructor(
    @inject(ConfigEnvSymbol)
    private env: ConfigEnv,
  ) {
    this.Resend = new Resend(this.env.resend.url)
  }

  async send(props: SendMailProps) {
      const template = templates[props.template];

      const { error } = await this.Resend.emails.send({
        from: `${this.env.resend} <${this.env.resend.email}@${this.env.resend.domain}>`,
        to: [props.to],
        subject: template.subject(props.props),
        html: await render(template.bodyFn(props.variables), { pretty: true }),
        text: await render(template.bodyFn(props.variables), { plainText: true }),
      });
  }
}
