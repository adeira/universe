#!/usr/bin/env zx

const TOKEN = 'TODO';
const API_BASE_URL = 'https://api.elis.rossum.ai/v1';

const copyPasteConfig = [
  // {
  //   // The script should handle missing fields gracefully:
  //   source_field: 'DOES_NOT_EXIST_1',
  //   target_field: 'DOES_NOT_EXIST_2',
  // },

  { source_field: 'production_title_manual', target_field: 'episode_export_production_title' },
  { source_field: 'episode_title_manual', target_field: 'episode_export_episode_title' },
  { source_field: 'season_number_manual', target_field: 'episode_export_season' },
  { source_field: 'episode_number_manual', target_field: 'episode_export_episode_number' },
  { source_field: 'episode_suffix', target_field: 'episode_export_suffix' },
  { source_field: 'first_release_date', target_field: 'episode_export_air_date' },
  { source_field: 'package_date_manual', target_field: 'episode_export_package_date' },
  { source_field: 'studio_production_code', target_field: 'episode_export_studio_production_code' },
  { source_field: 'isan', target_field: 'episode_export_isan' },
];

const queues = [
  //
  `${API_BASE_URL}/queues/111`,
  `${API_BASE_URL}/queues/222`,
  `${API_BASE_URL}/queues/333`,
];

const sourceFields = copyPasteConfig.map((c) => c.source_field);
const targetFields = copyPasteConfig.map((c) => c.target_field);

const schemaIds = `${sourceFields.join(',')},${targetFields.join(',')}`;

async function fetchAndUpdateDatapointsOnPage(
  url = `${API_BASE_URL}/annotations/search?sideload=content&content.schema_id=${schemaIds}`,
) {
  const page = await (
    await fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` },
      body: JSON.stringify({
        query: {
          $and: [
            //
            { status: { $in: ['exported'] } },
            { queue: { $in: queues } },
          ],
        },
      }),
    })
  ).json();

  const pagePromises = [];

  // Iterate over all available annotations on the page
  for (const annotation of page.results) {
    const operations = [];

    // For each annotation, iterate over source/target fields
    for (const config of copyPasteConfig) {
      // For each target field, prepare replace operation taking the source into account (note: both datapoints might not exist!)
      const source = page.content.find((content) => {
        return (
          content.schema_id === config.source_field && content.url.startsWith(annotation.content)
        );
      });

      const target = page.content.find((content) => {
        return (
          content.schema_id === config.target_field && content.url.startsWith(annotation.content)
        );
      });

      if (source != null && target != null) {
        operations.push({
          op: 'replace',
          id: target.id,
          value: {
            content: {
              value: source.content.value,
              // value: null, // uncomment to reset values
            },
          },
        });
      }
    }

    // Call operations API endpoint to apply the replaces
    pagePromises.push(
      fetch(`${API_BASE_URL}/annotations/${annotation.id}/content/operations`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` },
        body: JSON.stringify({ operations }),
      }),
    );
  }

  const pagePromisesResults = await Promise.allSettled(pagePromises);
  // pagePromisesResults.forEach((result) => echo(JSON.stringify(result)));

  if (page.pagination.next != null) {
    await fetchAndUpdateDatapointsOnPage(page.pagination.next);
  }
}

// eslint-ignore-next-line
await fetchAndUpdateDatapointsOnPage();
