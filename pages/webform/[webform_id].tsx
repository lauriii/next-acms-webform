import * as React from 'react';
import {
  components,
  resolveWebformContent,
  Webform
} from 'nextjs-drupal-webform';
import { drupal } from '../../lib/drupal';
import { GetStaticPathsContext } from 'next/types';
import { GetStaticPathsResult } from 'next';
import { Layout } from '../../components/layout';
import { getMenus } from '../../lib/get-menus';
import { PageHeader } from '../../components/page-header';
import withCustomStyles from "../../components/webform/withCustomStyles";
import classNames from "classnames";
import WebformTable from "../../components/webform/WebformTable";

const labelProps = {
  className: classNames(['block', 'text-gray-700', 'text-sm', 'font-bold', 'mb-2']),
}
const fieldProps = {
  className: classNames(['form-input', 'shadow', 'appearance-none', 'border', 'rounded', 'w-full', 'py-2', 'px-3', 'text-gray-700', 'leading-tight', 'focus:outline-none', 'focus:shadow-outline']),
};
const wrapperProps = {
  className: classNames(['space-y-3']),
};
export default function WebformSlug({ menus, webform, id }) {
  return (
    <Layout title={webform.title} menus={menus}>
      <PageHeader heading={webform.title} />
      <div className="container px-6 pb-10 mx-auto">
        <Webform id={id} data={webform} customComponents={{
          autocomplete: withCustomStyles(components.autocomplete, fieldProps, labelProps, wrapperProps),
          textfield: withCustomStyles(components.textfield, fieldProps, labelProps, wrapperProps),
          select: withCustomStyles(components.select, fieldProps, labelProps, wrapperProps),
          webform_multiple: withCustomStyles(components.webform_multiple, {}, { className: classNames(['block', 'text-gray-700', 'text-sm', 'font-bold'])}, wrapperProps),
          checkbox: withCustomStyles(components.checkbox, {}, { className: classNames(['mx-2', 'mt-0.5']) }, { className: classNames(['my-2'])}),
          webform_autocomplete: withCustomStyles(components.webform_autocomplete, fieldProps, labelProps, wrapperProps),
          textarea: withCustomStyles(components.textarea, fieldProps, labelProps, wrapperProps),
          webform_actions: withCustomStyles(components.webform_actions, { className: classNames('bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4')}),
          button: withCustomStyles(components.button, {className: classNames('mt-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow')}),
          webform_table: withCustomStyles(WebformTable, { className: classNames('w-full', 'text-sm', 'text-left', 'text-gray-500', 'dark:text-gray-400') }, labelProps, wrapperProps),
          email: withCustomStyles(components.email, fieldProps, labelProps, wrapperProps),
        }} />
      </div>
    </Layout>
  );
}

export async function getStaticPaths(
  context: GetStaticPathsContext,
): Promise<GetStaticPathsResult> {
  const entities = await drupal.getResourceCollectionFromContext('webform--webform', context);
  const paths = entities.map((entity) => {
    return { params: { webform_id: entity.drupal_internal__id }}
  });
  return {
    paths: [...paths],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const webform = await resolveWebformContent(
    context.params.webform_id,
    drupal,
  );

  return {
    props: {
      webform,
      id: context.params.webform_id,
      menus: await getMenus(),
    },
    revalidate: 1,
  };
}