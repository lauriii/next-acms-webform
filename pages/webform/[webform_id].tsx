import * as React from 'react';
import {
  components,
  resolveWebformContent,
  Webform
} from 'nextjs-drupal-webform';
import {drupal} from '../../lib/drupal';
import {GetStaticPathsContext} from 'next/types';
import {GetStaticPathsResult} from 'next';
import {Layout} from '../../components/layout';
import {getMenus} from '../../lib/get-menus';
import {PageHeader} from '../../components/page-header';
import withCustomStyles from "../../components/webform/withCustomStyles";
import classNames from "classnames";
import WebformTable from "../../components/webform/WebformTable";
import WebformButton from "../../components/webform/WebformButton";

const labelProps = {
  className: classNames(['block', 'text-gray-700', 'text-sm', 'font-bold', 'mb-2']),
}
const fieldProps = {
  className: classNames(['form-input', 'shadow', 'appearance-none', 'border', 'rounded', 'w-full', 'py-2', 'px-3', 'text-gray-700', 'leading-tight', 'focus:outline-none', 'focus:shadow-outline']),
};
const wrapperProps = {
  className: classNames(['space-y-3']),
};

const tableProps = {
  className: classNames(['table-auto'])
}
const trProps = {
  className: classNames(['space-y-1'])
}
const tdProps = {
  className: classNames(['pr-6'])
}

const fieldPropsCheckboxes = {className: classNames('w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300')}
const fieldPropsRadios = {className: classNames('w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500')}
const wrapperPropsCheckbox = {className: classNames(['my-2'])}

export default function WebformSlug({menus, webform, id}) {
  return (
    <Layout title={webform.title} menus={menus}>
      <PageHeader heading={webform.title}/>
      <div className="container px-6 pb-10 mx-auto">
        <Webform id={id} data={webform} customComponents={{
          autocomplete: withCustomStyles(components.autocomplete, fieldProps, labelProps, wrapperProps),
          textfield: withCustomStyles(components.textfield, fieldProps, labelProps, wrapperProps),
          select: withCustomStyles(components.select, fieldProps, labelProps, wrapperProps),
          webform_multiple: withCustomStyles(components.webform_multiple, {}, {className: classNames(['block', 'text-gray-700', 'text-sm', 'font-bold'])}, wrapperProps, tableProps, trProps, tdProps),
          checkbox: withCustomStyles(components.checkbox, {}, {className: classNames(['mx-2', 'mt-0.5'])}, {className: classNames(['my-2'])}),
          radio: withCustomStyles(components.checkbox, {}, {className: classNames(['mx-2', 'mt-0.5'])}, {className: classNames(['my-2'])}),
          webform_autocomplete: withCustomStyles(components.webform_autocomplete, fieldProps, labelProps, wrapperProps),
          textarea: withCustomStyles(components.textarea, fieldProps, labelProps, wrapperProps),
          webform_actions: withCustomStyles(components.webform_actions, {}, {}, {className: classNames('my-4', 'space-x-4')}),
          button: withCustomStyles(WebformButton, {className: classNames('mt-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow')}),
          webform_table: withCustomStyles(WebformTable, {className: classNames('w-full', 'text-sm', 'text-left', 'text-gray-500', 'dark:text-gray-400')}, labelProps, wrapperProps),
          email: withCustomStyles(components.email, fieldProps, labelProps, wrapperProps),
          checkboxes: withCustomStyles(components.checkboxes, fieldPropsCheckboxes, labelProps, wrapperPropsCheckbox),
          radios: withCustomStyles(components.radios, fieldPropsRadios, labelProps, wrapperPropsCheckbox),
          webform_radios_other: withCustomStyles(components.radios, fieldPropsRadios, labelProps, wrapperPropsCheckbox),
          webform_checkboxes_other: withCustomStyles(components.checkboxes, fieldPropsCheckboxes, labelProps, wrapperPropsCheckbox),
          search: withCustomStyles(components.search, fieldProps, labelProps, wrapperProps),
          webform_select_other: withCustomStyles(components.webform_select_other, fieldProps, labelProps, wrapperProps),
          value: withCustomStyles(components.value, fieldProps, labelProps, wrapperProps),
          tel: withCustomStyles(components.textfield, fieldProps, labelProps, wrapperProps),
          range: withCustomStyles(components.range, {className: classNames('w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700')}, labelProps, wrapperProps),
          webform_terms_of_service: withCustomStyles(components.webform_terms_of_service, fieldPropsCheckboxes, {className: classNames(['mx-2', 'mt-0.5'])}, {className: classNames(['my-2'])}),
          datelist: withCustomStyles(components.datelist, {className: classNames('block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer')}),
          date: withCustomStyles(components.date, fieldProps, labelProps, wrapperProps),
          webform_time: withCustomStyles(components.webform_time, fieldProps, labelProps, wrapperProps),
          datetime: withCustomStyles(components.datetime, fieldProps, labelProps, wrapperProps),
        }}/>
      </div>
    </Layout>
  );
}

export async function getStaticPaths(
  context: GetStaticPathsContext,
): Promise<GetStaticPathsResult> {
  const entities = await drupal.getResourceCollectionFromContext('webform--webform', context);
  const paths = entities.map((entity) => {
    return {params: {webform_id: entity.drupal_internal__id}}
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