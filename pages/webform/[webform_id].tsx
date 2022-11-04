import * as React from 'react';
import {
  components,
  resolveWebformContent,
  Webform,
  defaultUiStrings
} from 'nextjs-drupal-webform';
import {drupal} from '../../lib/drupal';
import {GetStaticPathsContext} from 'next/types';
import {GetStaticPathsResult} from 'next';
import {Layout} from '../../components/layout';
import {getMenus} from '../../lib/get-menus';
import {PageHeader} from '../../components/page-header';
import withCustomStyles from "../../components/webform/withCustomStyles";
import classNames from "classnames";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation, Trans} from 'next-i18next'
import {useRouter} from "next/router";
import Link from 'next/link'

const labelProps = {
  className: classNames(['block', 'text-gray-700', 'text-sm', 'font-bold', 'mb-2']),
}
const fieldProps = {
  className: classNames(['form-input', 'shadow', 'appearance-none', 'border', 'rounded', 'w-full', 'py-2', 'px-3', 'text-gray-700', 'leading-tight', 'focus:outline-none', 'focus:shadow-outline']),
};
const wrapperProps = {
  className: classNames(['space-y-3']),
};
export default function WebformSlug({menus, webform, id}) {
  const router = useRouter();
  const {t} = useTranslation('common');
  const changeTo = router.locale === 'en' ? 'de' : 'en'

  return (
    <Layout title={webform.title} menus={menus}>
      {/*<PageHeader heading={webform.title}/>*/}
      <PageHeader heading={t('title')}/>
      <Link
        href='/webform/default_test_form'
        locale={changeTo}
      >
        <button>
          {t('change-locale', {changeTo})}
        </button>
      </Link>
      <div className="container px-6 pb-10 mx-auto">
        <Webform id={id} data={webform} customComponents={{
          textfield: withCustomStyles(components.textfield, fieldProps, labelProps, wrapperProps),
          select: withCustomStyles(components.select, fieldProps, labelProps, wrapperProps),
          webform_autocomplete: withCustomStyles(components.webform_autocomplete, fieldProps, labelProps, wrapperProps),
          textarea: withCustomStyles(components.textarea, fieldProps, labelProps, wrapperProps),
          webform_actions: withCustomStyles(components.webform_actions, {className: classNames('bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded')})
        }}
                 uiStrings={{
                   ...defaultUiStrings,
                   foo: (() => {
                     return 'Hello from France {0} {1}' + Math.random();
                   })(),
                 }}
                 translate={t}
        />
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
  console.log(context);
  const webform = await resolveWebformContent(
    context.params.webform_id,
    drupal,
  );

  return {
    props: {
      webform,
      id: context.params.webform_id,
      menus: await getMenus(),
      ...(await serverSideTranslations('locale', ['common', 'footer'], null, ['en', 'de'])),
    },
    revalidate: 1,
  };
}