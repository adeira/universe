// @flow

import * as React from 'react';
// eslint-disable-next-line no-unused-vars
import * as sx from '@adeira/sx';

import Layout from '../components/Layout';
import H2 from '../components/H2';
import P from '../components/P';
import Link from '../components/Link';
import LoginForm from './forms/LoginForm';
import InlineForm from './forms/InlineForm';
import FormGrid from './forms/FormGrid';
import UnderlineForm from './forms/UnderlineForm';
import CustomSelect from './forms/CustomSelect';

export default function Cards(): React.Node {
  return (
    <Layout title="Forms">
      <P>
        Examples of building forms with Tailwind CSS. Compare with{' '}
        <Link href="https://tailwindcss.com/components/forms">originals on Tailwind CSS</Link>.
      </P>

      <H2>Login Form</H2>
      <LoginForm />

      <H2>Inline Form</H2>
      <InlineForm />

      <H2>Form Grid</H2>
      <FormGrid />

      <H2>Underline Form</H2>
      <UnderlineForm />

      <H2>Custom Select</H2>
      <CustomSelect />
    </Layout>
  );
}
