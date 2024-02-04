#!/usr/bin/env zx

const { createObjectCsvWriter } = require('csv-writer');

const TOKEN = 'TODO';
const API_BASE_URL = 'https://api.elis.rossum.ai/v1';

const datapointsOfInterest = [
  'production_title_manual',
  'episode_title_manual',
  'season_number_manual',
  'episode_number_manual',
  'first_release_date',
  'version_manual',
];

const workspaces = [
  //
  `${API_BASE_URL}/workspaces/111`,
  `${API_BASE_URL}/workspaces/222`,
  `${API_BASE_URL}/workspaces/333`,
];

const schemaIds = datapointsOfInterest.join(',');

const allCollectedRows = [];
const csvWriter = createObjectCsvWriter({
  path: path.join(__dirname, 'output.csv'),
  header: [
    { id: 'production_title_manual', title: 'Production Title' },
    { id: 'episode_title_manual', title: 'Episode Title' },
    { id: 'season_number_manual', title: 'Season' },
    { id: 'episode_number_manual', title: 'Episode Number' },
    { id: 'first_release_date', title: 'Air Date' },
    { id: 'version_manual', title: 'Version' },
    { id: 'package_date', title: 'Package Date' },
    { id: 'original_file_name', title: '' },
    { id: 'annotation_ui_url', title: '' },
  ],
});

async function iterateDatapointsOnPage(
  url = `${API_BASE_URL}/annotations/search?sideload=content,documents&content.schema_id=${schemaIds}`,
) {
  const page = await (
    await fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` },
      body: JSON.stringify({
        query: {
          $and: [
            { status: { $in: ['exported'] } },
            { workspace: { $in: workspaces } },
            { exported_at: { $gte: '2024-02-03T00:00:00' } }, // YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]
            { 'field.package_date_manual.date': { $emptyOrMissing: true } },
          ],
        },
      }),
    })
  ).json();

  // Iterate over all available annotations on the page
  for (const annotation of page.results) {
    const collectedRow = {};

    // For each annotation, iterate over datapoints of interest
    for (const datapointID of datapointsOfInterest) {
      const datapoint = page.content.find((content) => {
        return content.schema_id === datapointID && content.url.startsWith(annotation.content);
      });

      collectedRow[datapointID] = datapoint.content.value ?? '';
    }

    const document = page.documents.find((document) => {
      return document.url.startsWith(annotation.document);
    });

    collectedRow.package_date = '2024-02-10';
    collectedRow.original_file_name = document.original_file_name;
    collectedRow.annotation_ui_url = `https://us.app.rossum.ai/document/${annotation.id}`;

    allCollectedRows.push(collectedRow);
  }

  if (page.pagination.next != null) {
    await iterateDatapointsOnPage(page.pagination.next);
  }
}

// eslint-ignore-next-line
await iterateDatapointsOnPage();

// TODO
await csvWriter.writeRecords(allCollectedRows);
