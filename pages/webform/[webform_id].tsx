import * as React from 'react';
import { resolveWebformContent, Webform } from 'nextjs-drupal-webform';
import { drupal } from '../../lib/drupal';
import { GetStaticPathsContext } from 'next/types';
import { GetStaticPathsResult } from 'next';
import { Layout } from '../../components/layout';
import { getMenus } from '../../lib/get-menus';
import { PageHeader } from '../../components/page-header';

export default function WebformSlug({ menus, webform, id }) {
  return (
    <Layout title={webform.title} menus={menus}>
      <PageHeader heading={webform.title} />
      <div className="container px-6 pb-10 mx-auto">
        <Webform id={id} data={webform} />
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
    revalidate: 60,
  };
}